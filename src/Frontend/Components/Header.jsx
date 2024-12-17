import React, { useState, useEffect, useCallback, memo } from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
// Memoize menu items to prevent unnecessary re-renders
const MENU_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/Courses' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

// Animation variants to reduce repetition
const headerVariants = {
  initial: { y: -100 },
  animate: { 
    y: 0, 
    transition: { type: 'spring', stiffness: 100 }
  }
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { delay: 0.2 }
  }
};

const menuItemVariants = {
  initial: { opacity: 0, y: -20 },
  animate: (index) => ({
    opacity: 1, 
    y: 0,
    transition: { delay: 0.3 + index * 0.1 }
  })
};

// Memoize individual menu item component
const MenuItem = memo(({ item, isActive, onClick }) => (
  <motion.li
    custom={item.index}
    variants={menuItemVariants}
    initial="initial"
    animate="animate"
  >
    <Link
      to={item.href}
      className={`text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 relative group ${
        isActive ? 'text-purple-600 dark:text-purple-400 font-semibold' : ''
      }`}
      onClick={onClick}
    >
      {item.name}
      <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      } transition-transform duration-200 origin-left`}></span>
    </Link>
  </motion.li>
));

const Header = memo(() => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Use useCallback to memoize theme toggle function
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Optimize initial mount effect
  useEffect(() => {
    setMounted(true);
  }, []); // Empty dependency array ensures this runs only once

  // Cleanup effect for event listeners
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize handlers
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Early return if not mounted to prevent unnecessary renders
  if (!mounted) return null;

  return (
    <motion.header 
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo */}
          <div className="w-[200px] flex items-center">
            <motion.div 
              variants={itemVariants}
              initial="initial"
              animate="animate"
            >
              <Link 
                to="/" 
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 hover:opacity-80 transition-opacity duration-200"
              >
                CodeTeach
              </Link>
            </motion.div>
          </div>

          {/* Center section - Navigation */}
          <div className="flex-1 flex justify-center">
            <nav className="hidden md:block">
              <ul className="flex space-x-1">
                {MENU_ITEMS.map((item, index) => (
                  <MenuItem
                    key={item.name}
                    item={{ ...item, index }}
                    isActive={location.pathname === item.href}
                    onClick={() => setIsMenuOpen(false)}
                  />
                ))}
              </ul>
            </nav>
          </div>

          {/* Right section - Actions */}
          <div className="w-[200px] flex items-center justify-end space-x-2 sm:space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-200 transition-colors duration-200 hover:bg-purple-200 dark:hover:bg-purple-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>


            <motion.button
              className="md:hidden p-2 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-200 transition-colors duration-200 hover:bg-purple-200 dark:hover:bg-purple-700"
              onClick={handleMenuToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
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
                {MENU_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      to={item.href}
                      className={`block ${
                        location.pathname === item.href 
                          ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900 font-semibold' 
                          : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                      } px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-purple-50 dark:hover:bg-purple-900`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

export default Header;