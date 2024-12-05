import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGitHubAuth } from './Frontend/pages/Authentication/login&&signup/useGitHubAuth';

// Lazy load the components
const Home = lazy(() => import('./Frontend/pages/home/homepage'));
const Courses = lazy(() => import('./Frontend/pages/Courses/Courses'));
const LearnJava = lazy(() => import('./Content/Java/LearnJava'));

// GitHub callback handler component
const GitHubCallback = () => {
  const { error } = useGitHubAuth();
  const [timeoutId, setTimeoutId] = React.useState(null);

  React.useEffect(() => {
    // Set a timeout to redirect if stuck
    const id = setTimeout(() => {
      console.log('Callback timeout - redirecting to home');
      window.location.replace('/');
    }, 10000);
    setTimeoutId(id);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]); // Added timeoutId to dependencies

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">
          {error ? 'Authentication Failed' : 'Completing Sign In...'}
        </h2>
        <p className="text-gray-600">
          {error || 'Please wait while we process your authentication.'}
        </p>
      </div>
    </div>
  );
};

// Define the routes
const routes = [
  { path: '/', component: Home },
  { path: '/homepage', component: Home },
  { path: '/courses', component: Courses },
  { path: '/github/oauth/callback', component: GitHubCallback }, // Updated path
  { path: '/modules/java/*', component: LearnJava },
];

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
