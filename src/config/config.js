// ============================================
// ENVIRONMENT CONFIGURATION
// ============================================

// Default values
const DEFAULTS = {
  API_URL: 'http://localhost:5000',
  APP_NAME: 'Code Teach'
};

// Get environment variables (works with Create React App)
const ENV = {
  API_URL: process.env.REACT_APP_API_URL || DEFAULTS.API_URL,
  APP_NAME: process.env.REACT_APP_NAME || DEFAULTS.APP_NAME,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

// ============================================
// APPLICATION CONFIGURATION
// ============================================

const config = {
  // API Configuration
  api: {
    baseUrl: ENV.API_URL,
    endpoints: {
      // Authentication
      auth: {
        signin: '/auth/signin',
        signup: '/auth/signup',
        verifyEmail: '/auth/verify-email',
        resendOtp: '/auth/resend-otp',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
        verifyResetOtp: '/auth/verify-reset-otp'
      },
      // Courses
      courses: {
        list: '/api/courses',
        all: '/api/courses/all',
        enroll: (courseId) => `/api/courses/enroll/${courseId}`,
        enrolled: '/api/courses/enrolled',
        progress: (courseId) => `/api/courses/progress/${courseId}`,
        lastAccessed: (courseId) => `/api/courses/lastAccessed/${courseId}`
      },
      // Modules
      modules: {
        byCourse: (courseId) => `/api/modules/course/${courseId}`,
        byCourseAdmin: (courseId) => `/api/modules/course/${courseId}/admin`,
        create: '/api/modules',
        update: (moduleId) => `/api/modules/${moduleId}`,
        delete: (moduleId) => `/api/modules/${moduleId}`
      },
      // Admin
      admin: {
        stats: '/admin/stats',
        courses: '/admin/courses',
        users: '/admin/users'
      },
      // Contact
      contact: {
        send: '/api/contact/send'
      }
    }
  },

  // App Configuration
  app: {
    name: ENV.APP_NAME,
    environment: ENV.NODE_ENV,
    routes: {
      home: '/',
      auth: '/auth',
      courses: '/courses',
      dashboard: '/learning-dashboard',
      admin: '/admin'
    }
  },

  // Local Storage Keys
  storage: {
    keys: {
      token: 'token',
      user: 'user'
    }
  }
};

// ============================================
// STORAGE HELPER FUNCTIONS
// ============================================

/**
 * Get authentication token from localStorage
 */
export const getAuthToken = () => {
  try {
    return localStorage.getItem(config.storage.keys.token);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Set authentication token in localStorage
 */
export const setAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(config.storage.keys.token, token);
    }
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

/**
 * Get user data from localStorage
 */
export const getUser = () => {
  try {
    const userStr = localStorage.getItem(config.storage.keys.user);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

/**
 * Set user data in localStorage
 */
export const setUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(config.storage.keys.user, JSON.stringify(user));
    }
  } catch (error) {
    console.error('Error setting user:', error);
  }
};

/**
 * Clear all authentication data
 */
export const clearAuth = () => {
  try {
    localStorage.removeItem(config.storage.keys.token);
    localStorage.removeItem(config.storage.keys.user);
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  try {
    const token = getAuthToken();
    return Boolean(token);
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// ============================================
// API REQUEST FUNCTION
// ============================================

/**
 * Make authenticated API request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const requestOptions = {
    mode: 'cors',
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  };

  try {
    const url = `${config.api.baseUrl}${endpoint}`;
    const response = await fetch(url, requestOptions);

    // Handle 401 Unauthorized
    if (response.status === 401) {
      clearAuth();
      window.location.href = config.app.routes.auth;
      throw new Error('Session expired. Please login again.');
    }

    // Parse response
    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : null;

    // Handle non-OK responses
    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    // Log error in development
    if (ENV.NODE_ENV === 'development') {
      console.error('API Request Error:', {
        endpoint,
        error: error.message
      });
    }
    throw error;
  }
};

// ============================================
// DEVELOPMENT LOGGING
// ============================================

if (ENV.NODE_ENV === 'development') {
  console.log('🚀 App Configuration Loaded:', {
    apiBaseUrl: config.api.baseUrl,
    appName: config.app.name,
    environment: ENV.NODE_ENV
  });
}

// ============================================
// EXPORTS
// ============================================

export default config;

