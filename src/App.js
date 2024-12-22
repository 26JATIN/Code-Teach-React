import React, { Suspense, lazy, memo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './Frontend/Components/ThemeProvider';
import { isAuthenticated } from './config/config';

// Custom loading component
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"/>
  </div>
));

// Lazy load components
const Home = lazy(() => import('./Frontend/pages/home/homepage'));
const Courses = lazy(() => import('./Frontend/pages/Courses/Courses'));
const LearnJava = lazy(() => import('./Course Modules/Java/LearnJava'));
const LearnCpp = lazy(() => import('./Course Modules/Cpp/LearnCpp'));
const LearningDashboard = lazy(() => import('./Frontend/pages/EnrolledCourse/learningdashboard'));
const Auth = lazy(() => import('./Frontend/pages/Authentication/signup&&login'));

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

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/homepage" element={<Home />} />
            <Route path="/auth" element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            } />

            {/* Protected Routes */}
            <Route path="/courses" element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            } />
            <Route path="/modules/java/*" element={
              <ProtectedRoute>
                <LearnJava />
              </ProtectedRoute>
            } />
            <Route path="/modules/Cpp/*" element={
              <ProtectedRoute>
                <LearnCpp />
              </ProtectedRoute>
            } />
            <Route path="/learning-dashboard" element={
              <ProtectedRoute>
                <LearningDashboard />
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
