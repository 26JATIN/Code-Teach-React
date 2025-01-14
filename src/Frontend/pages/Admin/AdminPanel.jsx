import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, LineChart, Settings, LogOut, Plus, Edit, Trash2, Menu, X } from 'lucide-react';
import config from '../../../config/config';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    price: '',
    image: ''
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    checkAdminSession();
    fetchAdminData();
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const checkAdminSession = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (!user || !token || !user.isAdmin) {
      handleLogout();
    }
  };

  const fetchAdminData = async () => {
    try {
      const response = await fetch(`${config.api.baseUrl}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Not authorized');
      }

      const data = await response.json();
      setStats(data.stats);
      setUsers(data.recentUsers);
      setCourses(data.recentCourses);
    } catch (error) {
      console.error('Admin fetch error:', error);
      navigate('/auth');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${config.api.baseUrl}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Fetch users error:', error);
    }
  };

  const handleLogout = () => {
    // Clear all session data
    localStorage.clear();
    // Force navigation to auth page
    window.location.href = '/auth';
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.api.baseUrl}/admin/courses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseForm)
      });

      if (!response.ok) throw new Error('Failed to add course');
      
      fetchAdminData();
      setShowAddCourse(false);
      setCourseForm({
        title: '',
        description: '',
        category: '',
        duration: '',
        price: '',
        image: ''
      });
    } catch (error) {
      console.error('Add course error:', error);
    }
  };

  const handleEditCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.api.baseUrl}/admin/courses/${editingCourse._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseForm)
      });

      if (!response.ok) throw new Error('Failed to update course');
      
      fetchAdminData();
      setEditingCourse(null);
      setCourseForm({
        title: '',
        description: '',
        category: '',
        duration: '',
        price: '',
        image: ''
      });
    } catch (error) {
      console.error('Edit course error:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const response = await fetch(`${config.api.baseUrl}/admin/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete course');
      
      
      fetchAdminData();
    } catch (error) {
      console.error('Delete course error:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${config.api.baseUrl}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete user');
      }

      // Remove user from state
      setUsers(users.filter(user => user._id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Delete user error:', error);
      alert(error.message || 'Failed to delete user');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const StatCard = ({ title, value, icon: Icon }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
      </div>
    </motion.div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LineChart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg md:hidden"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      <div className="flex">
        {/* Sidebar - Modified for mobile */}
        <div className={`
          fixed top-0 left-0 z-40 w-64 h-screen transform transition-transform duration-200 ease-in-out
          md:translate-x-0 bg-white dark:bg-gray-800 shadow-lg
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          </div>
          <nav className="mt-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-4 px-6 py-4 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
            
            {/* Add logout button at the bottom */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 px-6 py-4 mt-auto text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content - Modified for mobile */}
        <div className="w-full md:ml-64 p-4 md:p-8 mt-16 md:mt-0">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
              
              {/* Stats Grid - Modified for mobile */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                  title="Total Users"
                  value={stats?.totalUsers || '0'}
                  icon={Users}
                />
                <StatCard
                  title="Total Courses"
                  value={stats?.totalCourses || '0'}
                  icon={BookOpen}
                />
              </div>

              {/* Recent Activity - Modified for mobile */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Users */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Users</h3>
                  <div className="space-y-4">
                    {users.map(user => (
                      <div key={user._id} className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Courses */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Courses</h3>
                  <div className="space-y-4">
                    {courses.map(course => (
                      <div key={course._id} className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                          <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{course.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{course.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">User Management</h2>
              
              {/* Responsive Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full">
                    <table className="min-w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Username
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Join Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {users.map(user => (
                          <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm">
                              <div className="flex flex-col md:flex-row md:items-center">
                                <span className="font-medium text-gray-900 dark:text-white">{user.username}</span>
                                <span className="text-gray-500 dark:text-gray-400 md:hidden">{user.email}</span>
                              </div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${user.isEmailVerified 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}
                              >
                                {user.isEmailVerified ? 'Verified' : 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.email !== process.env.REACT_APP_ADMIN_EMAIL && (
                                <button
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Course Management Header - Modified for mobile */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Courses Management</h2>
                <button
                  onClick={() => setShowAddCourse(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Course</span>
                </button>
              </div>

              {/* Course Grid - Modified for mobile */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map(course => (
                  <div key={course._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingCourse(course);
                            setCourseForm(course);
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
                    <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-500">Category: {course.category}</p>
                      <p className="text-sm text-gray-500">Duration: {course.duration}</p>
                      <p className="text-sm text-gray-500">Price: ${course.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Modal - Modified for mobile */}
              {(showAddCourse || editingCourse) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {editingCourse ? 'Edit Course' : 'Add New Course'}
                    </h3>
                    <form onSubmit={editingCourse ? handleEditCourse : handleAddCourse} className="space-y-4">
                      {/* Form fields */}
                      <div className="space-y-4">
                        {Object.keys(courseForm).map(key => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                              type={key === 'price' ? 'number' : 'text'}
                              value={courseForm[key]}
                              onChange={(e) => setCourseForm(prev => ({
                                ...prev,
                                [key]: e.target.value
                              }))}
                              className="w-full px-3 py-2 border rounded-lg"
                              required
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
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
                              category: '',
                              duration: '',
                              price: '',
                              image: ''
                            });
                          }}
                          className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {/* Add other tab content here */}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
