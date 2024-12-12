import { useState, useEffect, useCallback } from 'react';

// Environment variables
const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REDIRECT_URI = encodeURIComponent(process.env.REACT_APP_GITHUB_REDIRECT_URI);

// Cache constants
const TOKEN_CACHE_KEY = 'githubAccessToken';
const PROGRESS_CACHE_KEY = 'course_progress';

export const useGitHubAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isRepoOperationInProgress, setIsRepoOperationInProgress] = useState(false);

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
  }, []);

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

          // Clean up URL without triggering a refresh
          window.history.replaceState({}, document.title, '/courses');
          window.location.href = '/courses';
          return;
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
  }, []); // Remove BACKEND_URL from dependencies

  // Add Safari-specific check with retry mechanism
  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari && isAuthenticated && accessToken) {
      const validateAuth = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}github/validate-token`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include'
          });
          return response.ok;
        } catch (err) {
          console.error('Safari auth validation failed:', err);
          return false;
        }
      };

      const retryAuth = async (retries = 3) => {
        for (let i = 0; i < retries; i++) {
          try {
            const success = await validateAuth();
            if (success) break;
          } catch (err) {
            console.error(`Safari auth retry ${i + 1} failed:`, err);
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          }
        }
      };
      retryAuth();
    }
  }, [isAuthenticated, accessToken]);

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

  // Update fetchEnrolledCourses
  const fetchEnrolledCourses = useCallback(async () => {
    if (!accessToken) return [];

    try {
      console.log('Fetching enrolled courses...');
      const response = await fetch(`${BACKEND_URL}api/courses/enrolled`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      // Add verbose logging
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('Raw response:', text);

      let courses = [];
      try {
        courses = JSON.parse(text);
      } catch (e) {
        console.error('Parse error:', e);
      }

      if (Array.isArray(courses)) {
        setEnrolledCourses(courses);
        return courses;
      }

      return [];
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }, [accessToken]);

  // Add this function to manage course enrollment
  const enrollCourse = useCallback(async (courseId, courseData) => {
    if (!accessToken || isRepoOperationInProgress) return false;

    setIsRepoOperationInProgress(true);
    try {
      console.log('Enrolling course:', { courseId, courseData });
      const response = await fetch(`${BACKEND_URL}api/courses/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseId, courseData })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Enrollment error response:', errorText);
        throw new Error('Enrollment failed');
      }

      // Clear any cached data
      sessionStorage.removeItem(PROGRESS_CACHE_KEY);
      
      // Add delay before fetching updated courses
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Immediately fetch updated courses
      await fetchEnrolledCourses();
      return true;
    } catch (error) {
      console.error('Enrollment failed:', error);
      return false;
    } finally {
      setIsRepoOperationInProgress(false);
    }
  }, [accessToken, isRepoOperationInProgress, fetchEnrolledCourses]);

  // Add initialization of enrolled courses from cache
  useEffect(() => {
    if (isAuthenticated) {
      const cachedCourses = sessionStorage.getItem(PROGRESS_CACHE_KEY);
      if (cachedCourses) {
        setEnrolledCourses(JSON.parse(cachedCourses));
      }
      fetchEnrolledCourses();
    }
  }, [isAuthenticated, fetchEnrolledCourses]);

  // Add immediate course fetch on auth
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchEnrolledCourses();
    }
  }, [isAuthenticated, accessToken, fetchEnrolledCourses]);

  return {
    isAuthenticated,
    user,
    accessToken,
    error,
    isLoading,
    initiateLogin,
    signOut,
    enrolledCourses,
    enrollCourse,
    fetchEnrolledCourses,
    isRepoOperationInProgress
    
  };
};