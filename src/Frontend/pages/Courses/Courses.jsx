import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import { ThemeProvider } from '../../Components/ThemeProvider';
import { COURSES } from './Components/AvailableCourses';

// Optimized Button Component with Memoization
const Button = React.memo(({ children, onClick, variant = 'default', className = '' }) => {
  const baseStyles = "px-4 py-2 rounded-md flex items-center justify-center transition-all duration-300 w-full";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600 active:scale-95",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 active:scale-95",
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

// Page component with Performance Optimizations
function CoursesPage() {
  const navigate = useNavigate();

  // Memoized event handlers
  const handleViewCourse = useCallback((course) => {
    navigate(course.path);
  }, [navigate]);

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
        <Button 
          variant="outline" 
          onClick={() => handleViewCourse(course)}
        >
          <Eye className="mr-2" size={16} />
          View Course
        </Button>
      </motion.div>
    )), [handleViewCourse]
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseCards}
            </div>
          </div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}

export default React.memo(CoursesPage);