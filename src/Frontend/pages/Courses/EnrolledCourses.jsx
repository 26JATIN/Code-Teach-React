import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Book, ArrowRight, Loader2, Code, FileText, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../home/components/Header';
import { ThemeProvider } from '../home/components/ThemeProvider';
import { useGitHubAuth } from '../../Authentication/login&&signup/useGitHubAuth';

function EnrolledCoursesPage() {
  const navigate = useNavigate();
  const { enrolledCourses, fetchEnrolledCourses } = useGitHubAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        await fetchEnrolledCourses();
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
    // Add periodic refresh every 30 seconds
    const intervalId = setInterval(loadCourses, 30000);

    return () => clearInterval(intervalId);
  }, [fetchEnrolledCourses]);

  const handleContinueCourse = (path) => {
    if (path) {
      navigate(path);
    } else {
      console.warn('No path available for this course');
    }
  };

  const getIcon = (courseId) => {
    const icons = {
      1: <Code size={32} className="text-purple-600 dark:text-purple-400" />,
      2: <Book size={32} className="text-blue-600 dark:text-blue-400" />,
      3: <Video size={32} className="text-green-600 dark:text-green-400" />,
      4: <FileText size={32} className="text-red-600 dark:text-red-400" />
    };
    return icons[courseId] || <Book size={32} className="text-gray-600 dark:text-gray-400" />;
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
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
                My Learning Journey
              </h1>
              <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Track your progress and continue your learning adventure
              </p>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : enrolledCourses.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl"
              >
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-6">
                  <Book className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Start Your Learning Journey
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Explore our courses and begin your path to mastery in programming
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/courses')}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full hover:shadow-lg transition-all duration-200"
                >
                  Browse Courses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourses.map((course) => (
                  <motion.div
                    key={course.courseId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {getIcon(course.courseId)}
                        <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <span className="font-medium">Course Progress</span>
                          <span className="font-bold text-purple-600 dark:text-purple-400">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                          <span className="block text-xs text-gray-500 dark:text-gray-400">Level</span>
                          <span className="font-medium text-gray-900 dark:text-white">{course.level}</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                          <span className="block text-xs text-gray-500 dark:text-gray-400">Duration</span>
                          <span className="font-medium text-gray-900 dark:text-white">{course.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t dark:border-gray-700">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleContinueCourse(course.path)}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        Continue Learning
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}

export default EnrolledCoursesPage;
