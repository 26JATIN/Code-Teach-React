import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Loader } from 'lucide-react';
import { useGitHubAuth } from '../login&&signup/useGitHubAuth';

const GitHubAuthButton = () => {
  const {
    isAuthenticated,
    user,
    error,
    initiateLogin,
    signOut
  } = useGitHubAuth();

  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    initiateLogin();
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      {!isAuthenticated ? (
        <>
          <motion.button
            onClick={handleLogin}
            disabled={loading}
            className={`
              px-3 py-2 sm:px-4 sm:py-2
              rounded-full
              bg-gradient-to-r from-purple-600 to-blue-500
              text-white
              dark:from-purple-500 dark:to-blue-400
              transition-all duration-200
              flex items-center space-x-2
              ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md hover:from-purple-700 hover:to-blue-600'}
              text-xs sm:text-sm
            `}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? (
              <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
            <span className="font-medium">
              {loading ? 'Signing In...' : 'Sign In'}
            </span>
          </motion.button>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </>
      ) : (
        <div className="relative">
          <div className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
            >
              <img
                src={user?.avatar_url}
                alt={`${user?.login}'s avatar`}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />
            </motion.div>
            <span className="text-sm mt-1">{user?.login}</span>
          </div>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md">
              <button
                onClick={() => {
                  signOut();
                  toggleMenu();
                }}
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GitHubAuthButton;