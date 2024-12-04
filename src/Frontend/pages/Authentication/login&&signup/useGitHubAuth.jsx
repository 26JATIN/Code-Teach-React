import { useState, useEffect, useCallback, useMemo } from 'react';

// Environment variables
const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REDIRECT_URI = encodeURIComponent(process.env.REACT_APP_GITHUB_REDIRECT_URI);
const REPO_NAME = 'codeteach';

// Cache constants
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes
const TOKEN_CACHE_KEY = 'githubAccessToken';

export const useGitHubAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  // Memoize API endpoints
  const endpoints = useMemo(() => ({
    user: `${BACKEND_URL}/github/user`,
    oauth: `${BACKEND_URL}/github/oauth/callback`,
    health: `${BACKEND_URL}/health`
  }), []);

  // Enhanced request retry mechanism
  const fetchWithRetry = useCallback(async (url, options, maxRetries = 3, delayMs = 1000) => {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response;
      } catch (error) {
        lastError = error;
        if (i === maxRetries - 1) break;
        await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, i)));
      }
    }
    throw lastError;
  }, []);

  // Optimized user info fetching with improved caching
  const fetchUserInfo = useCallback(async (token) => {
    const cacheKey = `user_${token}`;
    try {
      const cachedData = sessionStorage.getItem(cacheKey);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setUser(data);
          return data;
        }
      }

      const response = await fetchWithRetry(endpoints.user, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const userData = await response.json();
      
      sessionStorage.setItem(cacheKey, JSON.stringify({
        data: userData,
        timestamp: Date.now()
      }));

      setUser(userData);
      return userData;
    } catch (err) {
      setError('Failed to retrieve user information');
      return null;
    }
  }, [endpoints.user, fetchWithRetry]);

  // Optimized repository management
  const manageRepository = useCallback(async (token) => {
    try {
      const userData = await fetchUserInfo(token);
      if (!userData) throw new Error('Failed to fetch user data');

      // Use Promise.race for timeout
      const repoCheck = Promise.race([
        fetch(`https://api.github.com/repos/${userData.login}/${REPO_NAME}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Repository check timeout')), 5000)
        )
      ]);

      const repoResponse = await repoCheck;
      
      if (repoResponse.status === 404) {
        await fetchWithRetry('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: REPO_NAME,
            description: 'CodeTeach User Progress Repository',
            private: true,
          }),
        });
      }

      setIsAuthenticated(true);
      setAccessToken(token);
      setError(null);
      return true;
    } catch (err) {
      console.error('GitHub Authentication Error:', err);
      setError('Failed to authenticate or manage repository');
      return false;
    }
  }, [fetchUserInfo, fetchWithRetry]);

  // Fixed checkAuth implementation
  const checkAuth = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_CACHE_KEY);
    if (storedToken) {
      await manageRepository(storedToken);
    } else {
      setIsAuthenticated(false);
    }
  }, [manageRepository]);

  useEffect(() => {
    let mounted = true;
    const debounceTimeout = setTimeout(() => {
      if (mounted) {
        checkAuth();
      }
    }, 100);

    return () => {
      mounted = false;
      clearTimeout(debounceTimeout);
    };
  }, [checkAuth]);

  // Initiate GitHub OAuth login
  const initiateLogin = useCallback(() => {
    const state = Math.random().toString(36).substring(2);
    localStorage.setItem('github_oauth_state', state);
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo&state=${state}`;
    window.location.href = githubOAuthUrl;
  }, []); // Removed CLIENT_ID and REDIRECT_URI from dependencies

  // Sign out functionality
  const signOut = useCallback(() => {
    localStorage.removeItem('githubAccessToken');
    setIsAuthenticated(false);
    setUser(null);
    setAccessToken(null);
    setError(null);
  }, []);

  // Ensure this useEffect is included once
  useEffect(() => {
    const handleAuthentication = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      console.log('Checking auth params:', { 
        code: code?.slice(0, 5), 
        state: state?.slice(0, 5),
        backendUrl: BACKEND_URL 
      });

      if (code && state) {
        try {
          // Test backend connection first
          const healthCheck = await fetch(`${BACKEND_URL}/health`);
          if (!healthCheck.ok) {
            throw new Error('Backend server is not responding');
          }

          const response = await fetch(`${BACKEND_URL}/github/oauth/callback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ code, state }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to exchange code for token');
          }

          const data = await response.json();
          console.log('Token exchange response in frontend:', data);

          if (!response.ok || data.error) {
            throw new Error(data.error || 'Failed to exchange code for token');
          }

          if (data.access_token) {
            localStorage.setItem('githubAccessToken', data.access_token);
            const success = await manageRepository(data.access_token);
            if (success) {
              // Clear URL parameters and redirect
              window.history.replaceState({}, document.title, '/');
              window.location.replace('/homepage');
            } else {
              throw new Error('Failed to manage repository');
            }
          } else {
            throw new Error('No access token received');
          }
        } catch (err) {
          console.error('Auth Error Details:', {
            message: err.message,
            stack: err.stack,
          });
          // setError(`Authentication failed: ${err.message}`);
          // setTimeout(() => window.location.replace('/'), 3000);
        }
      }
    };

    handleAuthentication();
  }, [manageRepository]); // Removed BACKEND_URL from dependencies

  return {
    isAuthenticated,
    user,
    accessToken,
    error,
    initiateLogin,
    signOut,
  };
};