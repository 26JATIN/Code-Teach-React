import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';

const CoursesComponent = ({ 
  courses, 
  showAddCourse, 
  setShowAddCourse, 
  editingCourse, 
  setEditingCourse, 
  courseForm, 
  setCourseForm, 
  handleEditCourse, 
  handleAddCourse, 
  handleDeleteCourse 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Courses Management
        </h2>
        <button
          onClick={() => setShowAddCourse(true)}
          className="w-full sm:w-auto px-4 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 touch-manipulation"
        >
          <Plus className="h-5 w-5" />
          <span>Add Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 px-2">
        {courses.map(course => (
          <div key={course._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingCourse(course);
                    setCourseForm({
                      title: course.title || '',
                      description: course.description || '',
                      tags: course.tags || [],
                      icon: course.icon || '📚',
                      color: course.color || '#3B82F6'
                    });
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{course.description}</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Modules:</span> {course.totalModules || 0}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">SubModules:</span> {course.totalSubModules || 0}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Duration:</span> {course.totalEstimatedHours || 0} hours
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Enrollments:</span> {course.enrollmentCount || 0}
              </p>
              {course.tags && course.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {course.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {(showAddCourse || editingCourse) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h3>
            <form onSubmit={editingCourse ? handleEditCourse : handleAddCourse} className="space-y-4">
              <div className="space-y-3 sm:space-y-4">
                {/* Title */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm(prev => ({
                      ...prev,
                      title: e.target.value
                    }))}
                    className="w-full px-3 py-2 sm:py-3 border rounded-lg text-base dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                    placeholder="e.g., Java Programming Masterclass"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description *
                  </label>
                  <textarea
                    value={courseForm.description}
                    onChange={(e) => setCourseForm(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    className="w-full px-3 py-2 sm:py-3 border rounded-lg text-base dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                    rows="4"
                    placeholder="Detailed description of the course"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(courseForm.tags) ? courseForm.tags.join(', ') : ''}
                    onChange={(e) => setCourseForm(prev => ({
                      ...prev,
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                    }))}
                    className="w-full px-3 py-2 sm:py-3 border rounded-lg text-base dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="e.g., programming, beginner, java"
                  />
                </div>

                {/* Icon */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={courseForm.icon}
                    onChange={(e) => setCourseForm(prev => ({
                      ...prev,
                      icon: e.target.value
                    }))}
                    className="w-full px-3 py-2 sm:py-3 border rounded-lg text-base dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="e.g., ☕ 📚 💻"
                  />
                </div>

                {/* Color */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Theme Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={courseForm.color}
                      onChange={(e) => setCourseForm(prev => ({
                        ...prev,
                        color: e.target.value
                      }))}
                      className="w-20 h-12 border rounded-lg cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{courseForm.color}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 mt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg text-base font-medium"
                >
                  {editingCourse ? 'Update' : 'Add'} Course
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCourse(false);
                    setEditingCourse(null);
                    setCourseForm({
                      title: '',
                      description: '',
                      tags: [],
                      icon: '📚',
                      color: '#3B82F6'
                    });
                  }}
                  className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg text-base font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CoursesComponent;
