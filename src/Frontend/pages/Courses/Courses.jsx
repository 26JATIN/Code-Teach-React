import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Code, Video, FileText, Eye, LogIn, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../home/components/Header';
import { ThemeProvider } from '../home/components/ThemeProvider';
import { useGitHubAuth } from '../../Authentication/login&&signup/useGitHubAuth';

// Memoized Courses Data
const COURSES = [
  {
    id: 1,
    title: 'Java Programming',
    description: 'Comprehensive course covering Java fundamentals, object-oriented programming, and advanced concepts.',
    level: 'Beginner to Advanced',
    icon: <Code size={32} className="text-purple-600 dark:text-purple-400" />,
    duration: '8 weeks',
    path: '/modules/java'
  },
  {
    id: 2,
    title: 'C++ Mastery',
    description: 'Deep dive into C++ programming, covering language intricacies, system-level programming, and best practices.',
    level: 'Intermediate to Advanced',
    icon: <Book size={32} className="text-blue-600 dark:text-blue-400" />,
    duration: '10 weeks',
    path: '/modules/cpp'
  },
  {
    id: 3,
    title: 'Data Structures & Algorithms',
    description: 'Comprehensive course on data structures, algorithm design, analysis, and problem-solving techniques.',
    level: 'Advanced',
    icon: <Video size={32} className="text-green-600 dark:text-green-400" />,
    duration: '12 weeks',
    path: '/modules/dsa'
  },
  {
    id: 4,
    title: 'Web Development Bootcamp',
    description: 'Full-stack web development course covering frontend, backend, and modern web technologies.',
    level: 'Comprehensive',
    icon: <FileText size={32} className="text-red-600 dark:text-red-400" />,
    duration: '16 weeks',
    path: '/modules/web-development'
  }
];

// Optimized Button Component with Memoization
const Button = React.memo(({ children, onClick, variant = 'default', className = '' }) => {
  const baseStyles = "px-4 py-2 rounded-md flex items-center justify-center transition-all duration-300 w-full";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600 active:scale-95",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 active:scale-95"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={typeof children === 'string' ? children : 'Button'}
    >
      {children}
    </button>
  );
});

// Optimized Dialog Component with Accessibility
const Dialog = React.memo(({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleOverlayClick}  // Add click handler here
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-[95%] p-6 relative"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close dialog"
          >
            <X size={24} />
          </button>
          <h2 id="dialog-title" className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <p id="dialog-description" className="text-gray-600 dark:text-gray-400 mb-6">
            {description}
          </p>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// Page component with Performance Optimizations
function CoursesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useGitHubAuth(); // Remove initiateLogin since it's no longer used
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Memoized event handlers
  const handleViewCourse = useCallback((course) => {
    navigate(course.path);
  }, [navigate]);

  const handleEnrollCourse = useCallback((course) => {
    if (isAuthenticated) {
      // If authenticated, navigate to the course
      navigate(`${course.path}/enroll`);
    } else {
      // If not authenticated, show sign in dialog
      setSelectedCourse(course);
      setIsSignInDialogOpen(true);
    }
  }, [isAuthenticated, navigate]);

  const handleCloseDialog = useCallback(() => {
    setIsSignInDialogOpen(false);
  }, []);

  // Memoized course rendering
  const courseCards = useMemo(() => 
    COURSES.map((course) => (
      <motion.div
        key={course.id}

        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 flex flex-col"
      >
        <div className="flex items-center mb-4">
          {course.icon}
          <h2 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
            {course.title}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
          {course.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="bg-purple-50 dark:bg-purple-900 px-2 py-1 rounded-full text-purple-600 dark:text-purple-300">
            {course.level}
          </span>
          <span>
            <FileText size={16} className="inline-block mr-2" />
            {course.duration}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleViewCourse(course)}
          >
            <Eye className="mr-2" size={16} />
            View Course
          </Button>
          <Button 
            onClick={() => handleEnrollCourse(course)}
          >
            <LogIn className="mr-2" size={16} />
            Enroll
          </Button>
        </div>
      </motion.div>
    )), [handleViewCourse, handleEnrollCourse]
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Header />
    
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 mb-4">
                Explore Our Courses
              </h1>
              <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Unlock your potential with our expertly crafted learning paths designed to take you from beginner to professional.
              </p>
            </motion.div>

            {/* Courses Grid - Responsive Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseCards}
            </div>

            {/* Sign In Required Dialog */}
            <Dialog 
              isOpen={isSignInDialogOpen}
              onClose={handleCloseDialog}
              title="Sign In Required"
              description={`To enroll in the course "${selectedCourse?.title}", please sign in or create an account first.`}
            >
              <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                Click anywhere outside to close
              </div>
            </Dialog>
          </div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}

export default React.memo(CoursesPage);