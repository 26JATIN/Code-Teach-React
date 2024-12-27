// Define default values
const DEFAULT_API_URL = 'https://code-teach-backend.onrender.com';
const DEFAULT_APP_NAME = 'Code Teach';

// Basic config object with defaults
const config = {
  api: {
    baseUrl: DEFAULT_API_URL,
    endpoints: {
      auth: {
        signin: '/auth/signin',
        signup: '/auth/signup'
      },
      courses: {
        list: '/api/courses',
        enroll: (courseId) => `/api/courses/enroll/${courseId}`,
        enrolled: '/api/courses/enrolled',
        progress: (courseId) => `/api/courses/progress/${courseId}`
      }
    }
  },
  app: {
    name: DEFAULT_APP_NAME,
    routes: {
      home: '/',
      auth: '/auth',
      courses: '/courses',
      dashboard: '/learning-dashboard'
    }
  },
  storage: {
    keys: {
      token: 'token',
      user: 'user'
    }
  }
};

// Helper functions
const getAuthToken = () => {
  try {
    return localStorage.getItem(config.storage.keys.token);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

const setAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(config.storage.keys.token, token);
    }
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

const getUser = () => {
  try {
    const userStr = localStorage.getItem(config.storage.keys.user);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

const setUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(config.storage.keys.user, JSON.stringify(user));
    }
  } catch (error) {
    console.error('Error setting user:', error);
  }
};

const clearAuth = () => {
  try {
    localStorage.removeItem(config.storage.keys.token);
    localStorage.removeItem(config.storage.keys.user);
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
};

const isAuthenticated = () => {
  try {
    const token = getAuthToken();
    return Boolean(token);
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    mode: 'cors'
  };

  try {
    const response = await fetch(
      `${config.api.baseUrl}${endpoint}`,
      { 
        ...defaultOptions,
        ...options,
        headers: { ...defaultOptions.headers, ...(options.headers || {}) }
      }
    );

    if (!response) {
      throw new Error('No response received from server');
    }

    if (response.status === 401) {
      clearAuth();
      window.location.href = config.app.routes.auth;
      throw new Error('Session expired');
    }

    const responseText = await response.text();
    let data;
    
    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', responseText);
      throw new Error('Invalid JSON response from server');
    }

    if (!response.ok) {
      throw new Error(data?.error || data?.message || `API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request error:', error);
    throw error;
  }
};

// Try to update config with environment variables if they exist
try {
  if (import.meta?.env?.VITE_API_URL) {
    config.api.baseUrl = import.meta.env.VITE_API_URL;
  }
  if (import.meta?.env?.VITE_APP_NAME) {
    config.app.name = import.meta.env.VITE_APP_NAME;
  }
} catch (error) {
  console.warn('Error loading environment variables:', error);
  // Continue using defaults
}

// Export config as default and named
const configExport = config;
export default configExport;
export { 
  getAuthToken, 
  setAuthToken,
  getUser,
  setUser,
  clearAuth,
  isAuthenticated,
  apiRequest 
};
