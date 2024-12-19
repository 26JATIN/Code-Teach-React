// Define default values
const DEFAULT_API_URL = 'http://localhost:5000';
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
export const getAuthToken = () => {
  try {
    return localStorage.getItem(config.storage.keys.token);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const setAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(config.storage.keys.token, token);
    }
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

export const getUser = () => {
  try {
    const userStr = localStorage.getItem(config.storage.keys.user);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const setUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(config.storage.keys.user, JSON.stringify(user));
    }
  } catch (error) {
    console.error('Error setting user:', error);
  }
};

export const clearAuth = () => {
  try {
    localStorage.removeItem(config.storage.keys.token);
    localStorage.removeItem(config.storage.keys.user);
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
};

export const isAuthenticated = () => {
  try {
    const token = getAuthToken();
    return Boolean(token);
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  };

  try {
    const response = await fetch(
      `${config.api.baseUrl}${endpoint}`,
      { ...defaultOptions, ...options }
    );

    if (response.status === 401) {
      clearAuth();
      window.location.href = config.app.routes.auth;
      throw new Error('Session expired');
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'API request failed');
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

export default config;
