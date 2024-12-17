import React, { Suspense, lazy, memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Frontend/Components/ThemeProvider';

// Custom loading component
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"/>
  </div>
));

// Error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

// Lazy load components with proper loading handling
const Home = lazy(() => import('./Frontend/pages/home/homepage'));
const Courses = lazy(() => import('./Frontend/pages/Courses/Courses'));
const LearnJava = lazy(() => import('./Course Modules/Java/LearnJava'));

const App = memo(() => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/homepage" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/modules/java/*" element={<LearnJava />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
});

export default App;
