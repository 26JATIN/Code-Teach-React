import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, LineChart, Settings } from 'lucide-react';
import config from '../../../config/config';

const AdminPanel = () => {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData();
  }, []);

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
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 h-screen fixed shadow-lg">
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
          </nav>
        </div>

        {/* Main content */}
        <div className="ml-64 p-8 w-full">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          {/* Add other tab content here */}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
