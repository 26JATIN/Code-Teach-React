/**
 * API Endpoints Constants
 * Centralized API endpoint definitions for frontend-backend communication
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Authentication Endpoints
 */
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  CURRENT_USER: `${API_BASE_URL}/auth/me`,
  UPDATE_PROFILE: `${API_BASE_URL}/auth/profile`
};

/**
 * Course Endpoints
 */
export const COURSE_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/api/courses`,
  GET_BY_ID: (id) => `${API_BASE_URL}/api/courses/${id}`,
  CREATE: `${API_BASE_URL}/api/courses`,
  UPDATE: (id) => `${API_BASE_URL}/api/courses/${id}`,
  DELETE: (id) => `${API_BASE_URL}/api/courses/${id}`,
  GET_BY_CATEGORY: (category) => `${API_BASE_URL}/api/courses?category=${category}`,
  GET_BY_LANGUAGE: (language) => `${API_BASE_URL}/api/courses?language=${language}`,
  SEARCH: (query) => `${API_BASE_URL}/api/courses/search?q=${query}`
};

/**
 * Module Endpoints
 */
export const MODULE_ENDPOINTS = {
  GET_BY_COURSE: (courseId) => `${API_BASE_URL}/api/modules/${courseId}`,
  CREATE: (courseId) => `${API_BASE_URL}/api/modules/${courseId}`,
  UPDATE: (courseId, moduleId) => `${API_BASE_URL}/api/modules/${courseId}/${moduleId}`,
  DELETE: (courseId, moduleId) => `${API_BASE_URL}/api/modules/${courseId}/${moduleId}`,
  GET_SUBMODULE: (courseId, moduleId, subModuleId) => 
    `${API_BASE_URL}/api/modules/${courseId}/${moduleId}/${subModuleId}`
};

/**
 * Progress Tracking Endpoints
 */
export const PROGRESS_ENDPOINTS = {
  ENROLL: (courseId) => `${API_BASE_URL}/api/progress/enroll/${courseId}`,
  GET_COURSE_PROGRESS: (courseId) => `${API_BASE_URL}/api/progress/${courseId}`,
  UPDATE_SUBMODULE: (courseId, moduleId, subModuleId) => 
    `${API_BASE_URL}/api/progress/${courseId}/module/${moduleId}/submodule/${subModuleId}`,
  GET_ALL_PROGRESS: `${API_BASE_URL}/api/progress/user/all`,
  REPAIR_INDEXING: (courseId) => `${API_BASE_URL}/api/progress/repair/${courseId}`
};

/**
 * Admin Endpoints
 */
export const ADMIN_ENDPOINTS = {
  DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
  GET_ALL_USERS: `${API_BASE_URL}/admin/users`,
  GET_USER: (userId) => `${API_BASE_URL}/admin/users/${userId}`,
  UPDATE_USER: (userId) => `${API_BASE_URL}/admin/users/${userId}`,
  DELETE_USER: (userId) => `${API_BASE_URL}/admin/users/${userId}`,
  GET_ALL_COURSES: `${API_BASE_URL}/admin/courses`,
  GET_ANALYTICS: `${API_BASE_URL}/admin/analytics`,
  VERIFY_SESSION: `${API_BASE_URL}/admin/verify`
};

/**
 * Contact Endpoints
 */
export const CONTACT_ENDPOINTS = {
  SUBMIT: `${API_BASE_URL}/api/contact`
};

/**
 * Helper function to build query string
 */
export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value);
    }
  });
  return query.toString();
};

/**
 * Helper function to get endpoint with query params
 */
export const getEndpointWithQuery = (baseUrl, params) => {
  const queryString = buildQueryString(params);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

/**
 * Common request headers
 */
export const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': token ? `Bearer ${token}` : ''
});

/**
 * API Response Status Codes
 */
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

export default {
  API_BASE_URL,
  AUTH_ENDPOINTS,
  COURSE_ENDPOINTS,
  MODULE_ENDPOINTS,
  PROGRESS_ENDPOINTS,
  ADMIN_ENDPOINTS,
  CONTACT_ENDPOINTS,
  HTTP_METHODS,
  STATUS_CODES,
  buildQueryString,
  getEndpointWithQuery,
  getAuthHeaders
};
