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
  const [isLoading, setIsLoading] = useState(false);

  // Memoize API endpoints
  const endpoints = useMemo(() => ({
    user: `${BACKEND_URL}github/user`,
    oauth: `${BACKEND_URL}github/oauth/callback`,
    health: `${BACKEND_URL}health`
  }), []);

  // Enhanced request retry mechanism
  const fetchWithRetry = useCallback(async (url, options, maxRetries = 3, delayMs = 1000) => {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const finalOptions = {
          ...options,
          credentials: 'include',
          mode: 'cors',
          signal: controller.signal,
          headers: {
            ...options.headers,
            'Accept': 'application/json',
            'Origin': window.location.origin,
          }
        };

        console.log('Fetch attempt', i + 1, 'to', url, 'with options:', finalOptions);
        
        const response = await fetch(url, finalOptions);
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
          console.error('Response error:', errorData);
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        return response;
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error);
        lastError = error;
        if (i === maxRetries - 1) break;
        await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, i)));
      }
    }
    throw lastError;
  }, []);

  // Optimized user info fetching with improved caching
  const fetchUserInfo = useCallback(async (token) => {
    if (!token) {
      console.error('No token provided to fetchUserInfo');
      return null;
    }

    console.log('Fetching user info with token:', token?.substring(0, 10) + '...');
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

      // Try GitHub API directly first
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const userData = await response.json();
      
      sessionStorage.setItem(cacheKey, JSON.stringify({
        data: userData,
        timestamp: Date.now()
      }));

      setUser(userData);
      return userData;
    } catch (err) {
      console.error('User info fetch error:', err);
      setError(`Failed to retrieve user information: ${err.message}`);
      return null;
    }
  }, []);

  // Optimized repository management
  const manageRepository = useCallback(async (token) => {
    if (!token) {
      console.error('No token provided to manageRepository');
      return false;
    }

    try {
      // Verify token is valid first
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!userResponse.ok) {
        throw new Error('Invalid token');
      }

      const userData = await userResponse.json();
      if (!userData.login) {
        throw new Error('Invalid user data');
      }

      setUser(userData);
      // Rest of repository management code
      // ...existing code...

      setIsAuthenticated(true);
      setAccessToken(token);
      setError(null);
      return true;
    } catch (err) {
      console.error('Repository management error:', err);
      setError('Failed to setup repository');
      return false;
    }
  }, []);

  // Enhanced checkAuth implementation
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedToken = localStorage.getItem(TOKEN_CACHE_KEY);
      if (!storedToken) {
        throw new Error('No token found');
      }

      // Validate token directly with GitHub API
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!userResponse.ok) {
        throw new Error('Invalid token');
      }

      const userData = await userResponse.json();
      setUser(userData);
      setAccessToken(storedToken);
      setIsAuthenticated(true);

      // Check repository after successful authentication
      await manageRepository(storedToken);

    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem(TOKEN_CACHE_KEY);
      sessionStorage.clear();
      setIsAuthenticated(false);
      setUser(null);
      setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  }, [manageRepository]);

  // Modified useEffect to run checkAuth immediately and on focus
  useEffect(() => {
    checkAuth();

    // Check auth when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuth();
      }
    };

    // Check auth when window regains focus
    const handleFocus = () => {
      checkAuth();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);
    };
  }, [checkAuth]);

  // Add offline detection
  useEffect(() => {
    const handleOffline = () => {
      setError('You are offline. Please check your internet connection.');
    };
    
    const handleOnline = () => {
      setError(null);
      checkAuth();
    };
    
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [checkAuth]);

  // Initiate GitHub OAuth login
  const initiateLogin = useCallback(() => {
    const state = Math.random().toString(36).substring(2);
    localStorage.setItem('github_oauth_state', state);
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo&state=${state}`;
    window.location.href = githubOAuthUrl;
  }, []); // Removed CLIENT_ID and REDIRECT_URI from dependencies

  // Enhanced sign out with better cleanup
  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem(TOKEN_CACHE_KEY);
      if (token) {
        await fetch(`${BACKEND_URL}github/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include'
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem(TOKEN_CACHE_KEY);
      localStorage.removeItem('github_oauth_state');
      sessionStorage.clear();
      setIsAuthenticated(false);
      setUser(null);
      setAccessToken(null);
      setError(null);
      setIsLoading(false);
    }
  }, []);

  // Modified authentication handling useEffect
  useEffect(() => {
    const handleAuthentication = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const storedState = localStorage.getItem('github_oauth_state');

      if (code && state) {
        setIsLoading(true);
        setError(null);

        // Verify state matches
        if (state !== storedState) {
          setError('Invalid state parameter');
          setIsLoading(false);
          return;
        }

        try {
          const response = await fetch(`${BACKEND_URL}github/oauth/callback`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ code, state }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (!data.access_token) {
            throw new Error('No access token received');
          }

          // Store token and clear state
          localStorage.setItem(TOKEN_CACHE_KEY, data.access_token);
          localStorage.removeItem('github_oauth_state');

          // Verify token immediately
          const success = await manageRepository(data.access_token);
          
          if (success) {
            // Clean up URL without triggering a refresh
            window.history.replaceState({}, document.title, '/courses');
            window.location.href = '/courses';
            return;
          } else {
            throw new Error('Repository setup failed');
          }
        } catch (err) {
          console.error('Authentication error:', err);
          setError('Authentication failed - please try again');
          localStorage.removeItem(TOKEN_CACHE_KEY);
          localStorage.removeItem('github_oauth_state');
          
          // Delay redirect to show error message
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleAuthentication();
  }, [BACKEND_URL, manageRepository]);

  // Add Safari-specific check with retry mechanism
  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      const retryAuth = async (retries = 3) => {
        const token = localStorage.getItem(TOKEN_CACHE_KEY);
        if (token && !isAuthenticated) {
          for (let i = 0; i < retries; i++) {
            try {
              const success = await manageRepository(token);
              if (success) break;
            } catch (err) {
              console.error(`Safari auth retry ${i + 1} failed:`, err);
              await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
          }
        }
      };
      retryAuth();
    }
  }, [isAuthenticated, manageRepository]);

  // Modify periodic token validation
  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    const validateToken = async () => {
      try {
        // Use faster validation for all browsers
        const [githubResponse, backendValidation] = await Promise.all([
          fetch('https://api.github.com/user', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/vnd.github.v3+json'
            },
            // Add timeout for faster error detection
            signal: AbortSignal.timeout(3000)
          }),
          fetch(`${BACKEND_URL}github/validate-token`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include',
            // Add timeout for faster error detection
            signal: AbortSignal.timeout(3000)
          })
        ]);

        // Fast-fail if GitHub request fails
        if (!githubResponse.ok) {
          await signOut();
          window.location.href = '/';
          return;
        }

        const validationData = await backendValidation.json();
        if (!validationData.valid || validationData.revoked) {
          await signOut();
          window.location.href = '/';
          return;
        }
      } catch (err) {
        if (err.name === 'TimeoutError' || err.name === 'AbortError') {
          console.log('Validation timeout, will retry');
          return;
        }
        if (err.message.includes('401') || err.message.includes('403')) {
          await signOut();
          window.location.href = '/';
        }
      }
    };

    // Use same interval for all browsers
    const intervalTime = 5000; // 5 seconds for all browsers
    validateToken();
    const intervalId = setInterval(validateToken, intervalTime);
    
    // Validate on focus for all browsers
    const handleFocus = () => validateToken();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        validateToken();
      }
    });

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isAuthenticated, accessToken, signOut]);

  return {
    isAuthenticated,
    user,
    accessToken,
    error,
    isLoading,
    initiateLogin,
    signOut,
  };
};