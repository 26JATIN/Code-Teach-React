import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const menuItems = ['Home', 'Courses', 'About', 'Contact'];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <a href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 hover:opacity-80 transition-opacity duration-200">
              CodeTeach
            </a>
          </motion.div>
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <a
                    href="#"
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 relative group"
                  >
                    {item}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2 sm:space-x-4"
          >
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-200 transition-colors duration-200 hover:bg-purple-200 dark:hover:bg-purple-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.a
              href="#"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white dark:from-purple-500 dark:to-blue-400 transition-all duration-200 flex items-center space-x-2 hover:shadow-md hover:from-purple-700 hover:to-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Sign in with GitHub"
            >
              <Github size={18} />
              <span className="text-sm font-medium">Sign In</span>
            </motion.a>
            <motion.button
              className="md:hidden p-2 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-200 transition-colors duration-200 hover:bg-purple-200 dark:hover:bg-purple-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <a
                      href="#"
                      className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-purple-50 dark:hover:bg-purple-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

