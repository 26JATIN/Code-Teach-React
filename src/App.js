import React, { Suspense, lazy, memo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from './Frontend/Components/ThemeProvider';
import config from './config/config';  // Default import
import { isAuthenticated, apiRequest } from './config/config';  // Named imports
import AdminRoute from './Frontend/Components/AdminRoute';

// Custom loading component
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 dark:border-purple-400"/>
  </div>
));

// Lazy load components
const Home = lazy(() => import('./Frontend/pages/home/homepage'));
const Courses = lazy(() => import('./Frontend/pages/Courses/Courses'));
const DynamicCourseModule = lazy(() => import('./Course Modules/DynamicCourseModule'));
const LearningDashboard = lazy(() => import('./Frontend/pages/EnrolledCourse/learningdashboard'));
const Auth = lazy(() => import('./Frontend/pages/Authentication/signup&&login'));
const About = lazy(() => import('./Frontend/pages/About/About'));
const Contact = lazy(() => import('./Frontend/pages/Contact/Contact'));
const AdminPanel = lazy(() => import('./Frontend/pages/Admin/AdminPanel'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};
// Public Route Component
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/learning-dashboard" replace />;
  }
  return children;
};

// All courses now use dynamic module system
const CourseSelector = () => {
  const { courseId } = useParams();

  return (
    <Routes>
      <Route path="modules/*" element={<DynamicCourseModule />} />
      <Route path="*" element={<Navigate to={`/course/${courseId}/modules`} replace />} />
    </Routes>
  );
};

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } />

            {/* User Routes - Only accessible if not admin */}
            {!isAdmin && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/homepage" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/learning-dashboard" element={
                  <ProtectedRoute>
                    <LearningDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/course/:courseId/*" element={
                  <ProtectedRoute>
                    <CourseSelector />
                  </ProtectedRoute>
                } />
              </>
            )}

            {/* Redirect admin to admin panel, others to home */}
            <Route path="*" element={
              <Navigate to={isAdmin ? "/admin" : "/"} replace />
            } />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
