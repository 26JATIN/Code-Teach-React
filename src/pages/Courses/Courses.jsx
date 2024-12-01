import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Video, FileText } from 'lucide-react';

// Course data
const COURSES = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Learn the core concepts of React and build modern web applications.',
    level: 'Beginner',
    icon: <Code size={32} className="text-purple-600 dark:text-purple-400" />,
    duration: '4 weeks'
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into advanced JavaScript techniques and best practices.',
    level: 'Intermediate',
    icon: <Book size={32} className="text-blue-600 dark:text-blue-400" />,
    duration: '6 weeks'
  },
  {
    id: 3,
    title: 'Full Stack Development',
    description: 'Comprehensive course covering frontend and backend technologies.',
    level: 'Advanced',
    icon: <Video size={32} className="text-green-600 dark:text-green-400" />,
    duration: '12 weeks'
  }
];

// Page component
function CoursesPage() {
  return (
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
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Unlock your potential with our expertly crafted learning paths designed to take you from beginner to professional.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {COURSES.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                {course.icon}
                <h2 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {course.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {course.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="bg-purple-50 dark:bg-purple-900 px-2 py-1 rounded-full text-purple-600 dark:text-purple-300">
                  {course.level}
                </span>
                <span>
                  <FileText size={16} className="inline-block mr-2" />
                  {course.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
export default CoursesPage;
