import React, { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, XCircle } from 'lucide-react';
import Header from '../../Components/Header';
import { ThemeProvider } from '../../Components/ThemeProvider';
import { COURSES } from '../Courses/Components/AvailableCourses';

function LearningDashboard() {
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('enrolledCourses');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleUnenroll = useCallback((courseId) => {
    setShowConfirmation(courseId);
  }, []);

  const confirmUnenroll = useCallback((courseId) => {
    const newEnrolled = enrolledCourses.filter(id => id !== courseId);
    localStorage.setItem('enrolledCourses', JSON.stringify(newEnrolled));
    setEnrolledCourses(newEnrolled);
    setShowConfirmation(null);
  }, [enrolledCourses]);

  const enrolledCourseDetails = useMemo(() => 
    COURSES.filter(course => enrolledCourses.includes(course.id)),
    [enrolledCourses]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
        <Header />
        
        {showConfirmation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Confirm Unenrollment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Warning: Unenrolling from this course will remove all your progress and saved data. This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmation(null)}
                  className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmUnenroll(showConfirmation)}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Unenroll
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="container mx-auto px-4 py-8">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white"
          >
            My Learning Dashboard
          </motion.h1>
          
          <motion.div
            initial={false}
            animate={isLoading ? "hidden" : "show"}
            variants={containerVariants}
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : enrolledCourseDetails.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-600 dark:text-gray-400 text-xl">
                  You haven't enrolled in any courses yet.
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/courses'}
                  className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Browse Courses
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourseDetails.map(course => (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    layout
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {course.icon}
                        <h2 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                          {course.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => handleUnenroll(course.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Unenroll"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {course.description}
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-purple-500">
                          <Award size={16} className="mr-2" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock size={16} className="mr-2" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="text-purple-500">0%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full w-0"></div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
                      >
                        <BookOpen size={16} className="mr-2" />
                        Continue Learning
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default React.memo(LearningDashboard);
 