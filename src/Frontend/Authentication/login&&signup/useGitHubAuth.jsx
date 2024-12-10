import { useState, useEffect, useCallback, useRef } from 'react';  // Remove useMemo since we won't need it

// Environment variables
const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REDIRECT_URI = encodeURIComponent(process.env.REACT_APP_GITHUB_REDIRECT_URI);
const REPO_NAME = 'codeteach';

// Cache constants
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes (shortened from 30 minutes for better performance)
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
  const operationQueue = useRef([]);

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

      // Check if repository exists
      console.log('Checking if repository exists...');
      const repoResponse = await fetch(`https://api.github.com/repos/${userData.login}/${REPO_NAME}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      // If repo doesn't exist, create it
      if (repoResponse.status === 404) {
        console.log('Repository not found, creating new one...');
        const createResponse = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: REPO_NAME,
            description: 'CodeTeach User Progress Repository',
            private: true,
            auto_init: true  // Initialize with README
          })
        });

        if (!createResponse.ok) {
          const error = await createResponse.json();
          console.error('Repository creation failed:', error);
          throw new Error(`Failed to create repository: ${error.message}`);
        }
      } else {
        console.log('Repository found:', `${userData.login}/${REPO_NAME}`);
      }

      setIsAuthenticated(true);
      setAccessToken(token);
      setError(null);
      return true;
    } catch (err) {
      console.error('Repository management error:', err);
      setError(`Failed to setup repository: ${err.message}`);
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
  }, [manageRepository]); // Remove BACKEND_URL from dependencies

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

  // Add this function to fetch enrolled courses
  const fetchEnrolledCourses = useCallback(async () => {
    if (!accessToken || !user) return;

    // Check cache first
    const cachedProgress = sessionStorage.getItem(PROGRESS_CACHE_KEY);
    if (cachedProgress) {
      const { data, timestamp } = JSON.parse(cachedProgress);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setEnrolledCourses(data);
        return;
      }
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${user.login}/${REPO_NAME}/contents/courses`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'If-None-Match': sessionStorage.getItem('progress_etag') || ''
        }
      });

      if (response.status === 304) {
        // Content hasn't changed, use cached version
        return;
      }

      if (response.ok) {
        const etag = response.headers.get('ETag');
        if (etag) sessionStorage.setItem('progress_etag', etag);

        const files = await response.json();
        const progressPromises = files
          .filter(file => file.name.endsWith('.json'))
          .map(file => fetch(file.download_url)
            .then(res => res.json())
            .catch(err => {
              console.error(`Failed to fetch ${file.name}:`, err);
              return null;
            }));

        const courses = (await Promise.all(progressPromises))
          .filter(Boolean)
          .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

        // Update cache
        sessionStorage.setItem(PROGRESS_CACHE_KEY, JSON.stringify({
          data: courses,
          timestamp: Date.now()
        }));

        setEnrolledCourses(courses);
      }
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
      // Use cached data if available
      if (cachedProgress) {
        setEnrolledCourses(JSON.parse(cachedProgress).data);
      }
    }
  }, [accessToken, user]);

  // Add this function to manage course enrollment
  const enrollCourse = useCallback(async (courseId, courseData) => {
    if (!accessToken || !user || isRepoOperationInProgress) return false;

    // Add to operation queue if another operation is in progress
    if (isRepoOperationInProgress) {
      return new Promise((resolve) => {
        operationQueue.current.push({
          operation: () => enrollCourse(courseId, courseData),
          resolve
        });
      });
    }

    setIsRepoOperationInProgress(true);
    
    try {
      const path = `courses/${courseId}.json`;
      const content = {
        courseId,
        enrolledAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        progress: 0,
        ...courseData,
        version: Date.now() // Add version for conflict resolution
      };

      // Check existing enrollment with conditional request
      const url = `https://api.github.com/repos/${user.login}/${REPO_NAME}/contents/${path}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'If-None-Match': '"' + sessionStorage.getItem(`etag_${courseId}`) + '"'
        }
      });

      if (response.status === 304) {
        // Content hasn't changed, use cached version
        return true;
      }

      const contentEncoded = btoa(JSON.stringify(content));

      if (response.ok) {
        const existingFile = await response.json();
        // Store ETag for future requests
        const etag = response.headers.get('ETag');
        if (etag) sessionStorage.setItem(`etag_${courseId}`, etag.replace(/"/g, ''));

        // Compare versions to resolve conflicts
        const existingContent = JSON.parse(atob(existingFile.content));
        if (existingContent.version > content.version) {
          // Remote version is newer, merge changes
          content.progress = Math.max(existingContent.progress, content.progress);
          content.version = existingContent.version + 1;
        }

        await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'If-Match': existingFile.sha // Prevent race conditions
          },
          body: JSON.stringify({
            message: `Update course enrollment: ${courseId}`,
            content: btoa(JSON.stringify(content)),
            sha: existingFile.sha
          })
        });
      } else if (response.status === 404) {
        await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Add course enrollment: ${courseId}`,
            content: contentEncoded
          })
        });
      }

      // Update local cache
      const updatedCourses = [...enrolledCourses];
      const existingIndex = updatedCourses.findIndex(c => c.courseId === courseId);
      if (existingIndex >= 0) {
        updatedCourses[existingIndex] = content;
      } else {
        updatedCourses.push(content);
      }
      setEnrolledCourses(updatedCourses);

      return true;
    } catch (error) {
      console.error('Enrollment failed:', error);
      return false;
    } finally {
      setIsRepoOperationInProgress(false);
      
      // Process next operation in queue
      if (operationQueue.current.length > 0) {
        const nextOperation = operationQueue.current.shift();
        nextOperation.operation().then(nextOperation.resolve);
      }
    }
  }, [accessToken, user, enrolledCourses, isRepoOperationInProgress]);

  // Add to useEffect that runs on authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchEnrolledCourses();
    }
  }, [isAuthenticated, fetchEnrolledCourses]);

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