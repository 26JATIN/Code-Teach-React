import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, XCircle, Code, Book, FileText } from 'lucide-react';
import Header from '../../Components/Header';
import { ThemeProvider } from '../../Components/ThemeProvider';

function LearningDashboard() {
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState(null);

  // Fetch enrolled courses from backend
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('https://key-shrimp-novel.ngrok-free.app/api/courses/enrolled', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error('Failed to parse response:', text);
          throw new Error('Invalid JSON response from server');
        }

        if (!data) {
          throw new Error('Empty response from server');
        }

        if (!Array.isArray(data)) {
          if (typeof data === 'object' && data.courses && Array.isArray(data.courses)) {
            data = data.courses;
          } else {
            console.error('Unexpected data format:', data);
            throw new Error('Server returned unexpected data format');
          }
        }

        setEnrolledCourses(data);
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const handleUnenroll = async (courseId) => {
    setShowConfirmation(courseId);
  };

  const confirmUnenroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`https://key-shrimp-novel.ngrok-free.app/api/courses/enroll/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to unenroll from course');
      }

      // Remove course from state
      setEnrolledCourses(prev => prev.filter(course => course._id !== courseId));
      setShowConfirmation(null);
    } catch (err) {
      console.error('Error unenrolling:', err);
      alert(err.message || 'Failed to unenroll from course');
    }
  };

  // Get icon based on course category
  const getIcon = (category) => {
    switch(category) {
      case 'programming':
        return <Code size={32} className="text-purple-600 dark:text-purple-400" />;
      case 'web':
        return <FileText size={32} className="text-red-600 dark:text-red-400" />;
      default:
        return <Book size={32} className="text-blue-600 dark:text-blue-400" />;
    }
  };

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

  if (isLoading) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </ThemeProvider>
    );
  }

  // Optional: Add error handling in UI if you want to keep the error state
  if (error) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-center">
            <p>Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
        <Header />
        
        {/* Confirmation Modal */}
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
            {enrolledCourses.length === 0 ? (
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
                {enrolledCourses.map(course => (
                  <motion.div
                    key={course._id}
                    variants={itemVariants}
                    layout
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {getIcon(course.category)}
                        <h2 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                          {course.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => handleUnenroll(course._id)}
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
                          <span>{course.difficulty}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock size={16} className="mr-2" />
                          <span>{course.duration} hours</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="text-purple-500">{course.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${course.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
                        onClick={() => window.location.href = course.path}
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