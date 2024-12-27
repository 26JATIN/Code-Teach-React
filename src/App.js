import React, { Suspense, lazy, memo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from './Frontend/Components/ThemeProvider';
import config from './config/config';  // Default import
import { isAuthenticated, apiRequest } from './config/config';  // Named imports

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

const CourseSelector = () => {
  const { courseId } = useParams();
  const [courseType, setCourseType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const coursesData = await apiRequest(config.api.endpoints.courses.list);
        const course = coursesData.find(c => c._id === courseId);
        
        if (course) {
          const title = course.title.toLowerCase();
          if (title.includes('java')) {
            setCourseType('java');
          } else if (title.includes('c++')) {
            setCourseType('cpp');
          }
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const getCourseComponent = () => {
    switch (courseType) {
      case 'java':
        return LearnJava;
      case 'cpp':
        return LearnCpp;
      default:
        return null;
    }
  };

  const CourseComponent = getCourseComponent();
  
  if (!CourseComponent) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <Routes>
      <Route path="modules/*" element={<CourseComponent />} />
      <Route path="*" element={<Navigate to={`/course/${courseId}/modules`} replace />} />
    </Routes>
  );
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
            <Route path="/course/:courseId/*" element={
              <ProtectedRoute>
                <CourseSelector />
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
