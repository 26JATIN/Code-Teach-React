import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Loader } from 'lucide-react';
import { useGitHubAuth } from '../login&&signup/useGitHubAuth';
import { ThemeProvider } from '../../home/components/ThemeProvider';

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
  const timeoutRef = useRef(null);

  const handleLogin = () => {
    setLoading(true);
    initiateLogin();
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 100);
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center p-2 sm:p-4">
        {!isAuthenticated ? (
          <>
            <motion.button
              onClick={handleLogin}
              disabled={loading}
              className={`
                h-9
                px-2 sm:px-3
                rounded-full
                bg-gradient-to-r from-purple-600 to-blue-500
                text-white
                dark:from-purple-500 dark:to-blue-400
                transition-all duration-200
                flex items-center space-x-1.5
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md hover:from-purple-700 hover:to-blue-600'}
                text-[11px] sm:text-xs
                whitespace-nowrap
              `}
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Github className="w-4 h-4" />
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
          <div className="relative"
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={user?.avatar_url}
                alt={`${user?.login}'s avatar`}
                className="h-9 w-9 rounded-full cursor-pointer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ 
                opacity: menuOpen ? 1 : 0,
                y: menuOpen ? 0 : -5 
              }}
              transition={{ duration: 0.15 }}
              className={`
                absolute right-1/2 translate-x-1/2 
                mt-1 w-32 sm:w-36 
                rounded-xl shadow-lg 
                overflow-hidden
                bg-white dark:bg-gray-800 
                ring-1 ring-black ring-opacity-5
                ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}
              `}
            >
              <div className="px-2.5 py-1.5 text-[11px] sm:text-xs text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 truncate">
                {user?.login}
              </div>
              <button
                onClick={signOut}
                className="block w-full text-left px-2.5 py-1.5 text-[11px] sm:text-xs text-gray-700 dark:text-gray-200 
                hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-purple-500/10 
                dark:hover:from-purple-900/20 dark:hover:to-purple-800/20 
                transition-all duration-200"
              >
                Sign Out
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default GitHubAuthButton;