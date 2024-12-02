import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { useGitHubAuth } from '../login&&signup/useGithubAuth';

const GitHubAuthButton = () => {
  const { 
    isAuthenticated, 
    user, 
    initiateLogin, 
    signOut 
  } = useGitHubAuth();

  return (
    <div className="flex items-center justify-center p-2 sm:p-4">
      {!isAuthenticated ? (
        <motion.button
          onClick={initiateLogin}
          className="
            px-3 py-2 sm:px-4 sm:py-2 
            rounded-full 
            bg-gradient-to-r from-purple-600 to-blue-500 
            text-white 
            dark:from-purple-500 dark:to-blue-400 
            transition-all duration-200 
            flex items-center space-x-2 
            hover:shadow-md hover:from-purple-700 hover:to-blue-600
            text-xs sm:text-sm
          "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Sign in with GitHub"
        >
          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">Sign In</span>
        </motion.button>
      ) : (
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <img 
              src={user?.avatar_url} 
              alt={`${user?.login}'s avatar`} 
              className="
                w-8 h-8 sm:w-10 sm:h-10 
                rounded-full 
                border-2 border-white 
                shadow-md 
                group-hover:border-purple-500 
                transition-all duration-200
              "
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-full right-0 
              mt-2 
              bg-white dark:bg-gray-800 
              shadow-lg rounded-md 
              border dark:border-gray-700 
              z-50 
              overflow-hidden 
              w-40 
            "
          >
            <button
              onClick={signOut}
              className="
                w-full text-left 
                px-3 py-2 sm:px-4 sm:py-2 
                hover:bg-gray-100 dark:hover:bg-gray-700 
                flex items-center space-x-2 
                text-xs sm:text-sm 
                text-gray-700 dark:text-gray-300
              "
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" x2="9" y1="12" y2="12"/>
              </svg>
              <span>Sign Out</span>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GitHubAuthButton;