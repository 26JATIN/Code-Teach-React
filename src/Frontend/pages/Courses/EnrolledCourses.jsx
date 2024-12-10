import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Book, ArrowRight, Loader2 } from 'lucide-react';
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
  }, [fetchEnrolledCourses]);

  const handleContinueCourse = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              My Enrolled Courses
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your progress and continue learning
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : enrolledCourses.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <Book className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Courses Enrolled
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't enrolled in any courses yet.
              </p>
              <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Browse Courses
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <motion.div
                  key={course.courseId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Level: {course.level}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        Duration: {course.duration}
                      </span>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t dark:border-gray-700">
                    <button
                      onClick={() => handleContinueCourse(course.path)}
                      className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Continue Learning
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default EnrolledCoursesPage;
