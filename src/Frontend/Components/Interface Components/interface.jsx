import React, { useState, useEffect, useCallback, memo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Menu, ChevronRight, ChevronDown, ArrowRight, Code } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import CodingArea from './codingarea';  // Add this import
import { motion, AnimatePresence } from 'framer-motion'; // Add this import

// Internal ModuleButton component
const ModuleButton = ({ module, isExpanded, toggleModule }) => (
  <button
    onClick={() => toggleModule(module.id)}
    className={`w-full px-4 py-3 rounded-xl transition-colors duration-200 
      border group/module flex items-center justify-between
      ${isExpanded ? 'bg-gray-800/50 border-gray-700/50' : 'border-transparent hover:bg-white/[0.02]'}`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full transition-colors duration-200
        ${isExpanded ? 'bg-sky-400' : 'bg-gray-500 group-hover/module:bg-gray-400'}`} />
      <span className={`text-sm font-medium transition-colors duration-200
        ${isExpanded ? 'text-sky-400' : 'text-gray-400 group-hover/module:text-gray-300'}`}>
        {module.title}
      </span>
      
    </div>
    <ChevronDown size={16} 
      className={`text-gray-500 transition-transform duration-200
        ${isExpanded ? 'rotate-180 text-sky-400' : 'rotate-0 group-hover/module:text-gray-400'}`} 
    />
  </button>
);

// Internal LoadingSpinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

// Internal ErrorBoundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8">
          <h1>Something went wrong</h1>
          <p>Failed to load the module content.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Add NextButton component inside CourseLayout
const NextButton = memo(({ nextModule, onNext }) => {
  if (!nextModule) return null;

  return (
    <button
      onClick={() => onNext(nextModule.moduleId, nextModule.id)}
      className="group flex items-center gap-2 px-4 py-2 rounded-lg
        bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20
        text-blue-400 transition-all duration-200"
    >
      <span>Next: {nextModule.title}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );
});

const CourseLayout = ({ 
  courseName, 
  courseShortName, 
  modules, 
  basePath = "" 
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isMenuOpen, setIsMenuOpen] = useState(!isMobile);
  const [expandedModules, setExpandedModules] = useState({});
  const [activeModule, setActiveModule] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    modules.forEach((module) => {
      module.subModules.forEach((subModule) => {
        if (currentPath.includes(subModule.id)) {
          setExpandedModules((prev) => ({ ...prev, [module.id]: true }));
        }
      });
    });
  }, [location, modules]);

  useEffect(() => {
    const path = location.pathname;
    const pathParts = path.split('/');
    const moduleId = pathParts[pathParts.length - 2];
    const subModuleId = pathParts[pathParts.length - 1];
    if (moduleId && subModuleId) {
      setActiveModule(`${moduleId}.${subModuleId}`);
      setExpandedModules(prev => ({ ...prev, [moduleId]: true }));
    }
  }, [location.pathname]);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const navigateToContent = useCallback((moduleId, subModuleId) => {
    setActiveModule(`${moduleId}.${subModuleId}`);
    setExpandedModules(prev => ({ ...prev, [moduleId]: true }));
    if (isMobile) {
      setIsMenuOpen(false);
    }
    navigate(`${basePath}/${moduleId}/${subModuleId}`);
  }, [navigate, isMobile, basePath]);

  const toggleSidebar = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const findNextModule = useCallback((currentModuleId, currentSubModuleId) => {
    const flatModules = modules.flatMap(module => 
      module.subModules.map(subModule => ({
        ...subModule,
        moduleId: module.id
      }))
    );
    
    const currentIndex = flatModules.findIndex(
      m => m.moduleId === currentModuleId && m.id === currentSubModuleId
    );
    
    return flatModules[currentIndex + 1];
  }, [modules]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .writing-mode-vertical {
        writing-mode: vertical-rl;
        text-orientation: mixed;
      }
      
      * {
        scrollbar-width: thin;
        scrollbar-color: rgb(31 41 55) transparent;
      }

      .sidebar-transition {
        will-change: transform, opacity, width;
      }

      .content-scroll-area {
        will-change: scroll-position;
        -webkit-overflow-scrolling: touch;
      }

      .module-container {
        min-height: 48px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const smoothScroll = useCallback((direction) => {
    const contentArea = document.querySelector('.content-scroll-area');
    if (!contentArea) return;

    const scrollAmount = window.innerHeight * 0.75;
    const currentScroll = contentArea.scrollTop;
    const targetScroll = direction === 'up' ? 
      currentScroll - scrollAmount : 
      currentScroll + scrollAmount;

    contentArea.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  const navigateModules = useCallback((direction) => {
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    const currentModuleId = pathParts[pathParts.length - 2];
    const currentSubModuleId = pathParts[pathParts.length - 1];

    const flatModules = modules.flatMap(module => 
      module.subModules.map(subModule => ({
        ...subModule,
        moduleId: module.id
      }))
    );
    
    const currentIndex = flatModules.findIndex(
      m => m.moduleId === currentModuleId && m.id === currentSubModuleId
    );

    const targetIndex = direction === 'next' ? 
      currentIndex + 1 : 
      currentIndex - 1;

    if (targetIndex >= 0 && targetIndex < flatModules.length) {
      setSwipeDirection(direction === 'next' ? 'left' : 'right');
      const targetModule = flatModules[targetIndex];
      navigateToContent(targetModule.moduleId, targetModule.id);
    }
  }, [location.pathname, navigateToContent, modules]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          smoothScroll('down');
          break;
        case 'ArrowUp':
          e.preventDefault();
          smoothScroll('up');
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateModules('next');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigateModules('prev');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [smoothScroll, navigateModules]);

  const toggleEditor = useCallback(() => {
    setIsEditorOpen(prev => !prev);
  }, []);

  // Add touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setSwipeDirection('left'); // Changed from 'right' to 'left'
      navigateModules('next');
    } else if (isRightSwipe) {
      setSwipeDirection('right'); // Changed from 'left' to 'right'
      navigateModules('prev');
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Page transition variants for animations
  const pageTransitionVariants = {
    enter: (direction) => ({
      x: direction === 'left' ? 1000 : -1000, // Changed 'right' to 'left'
      opacity: 0,
      position: 'absolute', // Add this to prevent layout shifts
      width: '100%', // Add this to maintain consistent width
      willChange: 'transform, opacity' // Add this for performance
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative', // Reset position when centered
      width: '100%',
      willChange: 'transform, opacity',
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction === 'left' ? -1000 : 1000, // Changed 'right' to 'left'
      opacity: 0,
      position: 'absolute',
      width: '100%',
      willChange: 'transform, opacity',
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-950 overflow-hidden">
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-gray-800/90 
            border border-gray-700/50 text-gray-400 shadow-lg backdrop-blur-sm
            hover:text-gray-200 transition-all duration-200"
          title="Toggle Menu (Ctrl+M)"
        >
          <Menu size={20} />
        </button>
      )}

      <div 
        className={`fixed md:relative z-40 h-full sidebar-transition
          ${isMenuOpen ? 'w-[280px] md:w-[320px] translate-x-0' : 'w-[60px] -translate-x-full md:translate-x-0'}
          bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50 group flex flex-col`}
        style={{ 
          willChange: 'transform, width',
          backfaceVisibility: 'hidden'
        }}
      >
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`absolute top-1/2 -right-4 z-50 p-2 rounded-full 
              bg-gray-800/90 border border-gray-700/50 text-gray-400 shadow-lg
              hover:text-gray-200 transition-all duration-200 opacity-0 group-hover:opacity-100
              transform -translate-y-1/2 hover:scale-110 focus:outline-none
              hover:bg-gray-700/90 backdrop-blur-xl`}
            title="Toggle Menu (Ctrl+M)"
          >
            <ChevronRight size={16} className={`transform transition-transform duration-200
              ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>
        )}

        <div className={`${isMenuOpen ? 'opacity-0' : 'opacity-100'} 
          transition-opacity duration-200 h-full flex flex-col items-center py-6`}>
          <div className="flex flex-col items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 
              flex items-center justify-center border border-gray-700/50">
              <span className="text-lg font-semibold text-gray-300">{courseShortName}</span>
            </div>
            <div className="h-20 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-transparent"/>
          </div>
          <span className="writing-mode-vertical text-xs font-medium text-gray-400
            tracking-wider uppercase rotate-180 mt-4">{courseName}</span>
        </div>

        <div className={`${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} 
          transition-all duration-200 h-full overflow-hidden absolute inset-0 bg-gray-900/95 flex flex-col`}>
          <div className="p-6 border-b border-gray-800/50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                flex items-center justify-center border border-gray-700/50">
                <span className="text-sm font-semibold text-gray-300">{courseShortName}</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-200">{courseName}</h2>
                <p className="text-xs text-gray-400">Master Programming</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {modules.map((module) => (
                <div key={module.id} className="group">
                  <ModuleButton 
                    module={module}
                    isExpanded={expandedModules[module.id]}
                    toggleModule={toggleModule}
                  />

                  {expandedModules[module.id] && (
                    <div className="relative mt-2 ml-4 pl-4 py-2 animate-slideDown">
                      <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-blue-500/30 via-slate-700/20 to-transparent"></div>
                      {module.subModules.map((subModule) => (
                        <button
                          key={subModule.id}
                          onClick={() => navigateToContent(module.id, subModule.id)}
                          className={`group w-full px-4 py-3 rounded-xl transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-sky-500/20
                            ${activeModule === `${module.id}.${subModule.id}`
                              ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                              : 'text-slate-400 hover:bg-white/[0.02] hover:text-slate-200 border-transparent'
                            } border`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></div>
                            <span className="text-sm">{subModule.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={toggleSidebar}
          style={{ willChange: 'opacity' }}
          aria-hidden="true"
        />
      )}

      <div 
        className={`flex-1 relative transition-opacity duration-200
          ${isMobile && isMenuOpen ? 'opacity-50' : 'opacity-100'}`}
        style={{ willChange: 'opacity' }}
      >
        <div className="absolute inset-0 flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <div className="sticky top-0 z-10 px-4 sm:px-6 py-3 border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-gray-300 font-medium text-sm">{courseShortName}</span>
                <svg className="w-3 h-3 text-slate-600 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {modules.map(m => m.subModules.find(s => `${m.id}.${s.id}` === activeModule))
                  .filter(Boolean)
                  .map(subModule => (
                    <span key={subModule.id} 
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800/50 text-gray-200 border border-gray-700/50">
                      {subModule.title}
                    </span>
                  ))}
              </div>
              <button
                onClick={toggleEditor}
                className="p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-gray-100 
                  hover:bg-gray-700/50 transition-colors duration-200 border border-gray-700/50"
                title="Open Code Editor"
              >
                <Code size={20} />
              </button>
            </div>
          </div>

          {isEditorOpen ? (
            <CodingArea onClose={toggleEditor} />
          ) : (
            <div className="flex-1 overflow-hidden">
              <AnimatePresence 
                mode="wait" 
                initial={false} 
                custom={swipeDirection}
                onExitComplete={() => {
                  // Reset scroll position after animation completes
                  const contentArea = document.querySelector('.content-scroll-area');
                  if (contentArea) {
                    contentArea.scrollTop = 0;
                  }
                }}
              >
                <motion.div
                  key={location.pathname}
                  custom={swipeDirection}
                  variants={pageTransitionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="h-full overflow-y-auto content-scroll-area"
                  style={{
                    isolation: 'isolate', // Create new stacking context
                    backfaceVisibility: 'hidden', // Prevent flickering
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
                    <div className="prose prose-invert max-w-none
                      prose-headings:text-gray-100 
                      prose-h1:text-xl sm:prose-h1:text-2xl md:prose-h1:text-3xl
                      prose-h2:text-lg sm:prose-h2:text-xl md:prose-h2:text-2xl
                      prose-p:text-gray-300 
                      prose-p:text-sm sm:prose-p:text-base
                      prose-strong:text-gray-200
                      prose-code:text-gray-300 
                      prose-code:bg-gray-800/50
                      prose-code:px-1.5 
                      prose-code:py-0.5 
                      prose-code:text-sm
                      prose-code:rounded-md
                      prose-a:text-gray-300 
                      prose-a:no-underline 
                      prose-a:hover:text-gray-100
                      prose-li:text-gray-300
                      prose-li:text-sm sm:prose-li:text-base
                      prose-pre:bg-gray-800/50
                      prose-pre:border
                      prose-pre:border-gray-700/50
                      prose-pre:p-3 sm:prose-pre:p-4
                      prose-pre:text-sm sm:prose-pre:text-base
                      prose-img:rounded-lg">
                      <Routes>
                        <Route 
                          index 
                          element={
                            <div className="text-center p-8">
                              <h1>Welcome to {courseName}</h1>
                              <p>Select a topic from the sidebar to begin</p>
                            </div>
                          } 
                        />
                        {modules.map((module) =>
                          module.subModules.map((subModule) => (
                            <Route
                              key={`${module.id}-${subModule.id}`}
                              path={`${module.id}/${subModule.id}`}
                              element={
                                <ErrorBoundary>
                                  <React.Suspense fallback={<LoadingSpinner />}>
                                    <>
                                      <subModule.component />
                                      <div className="mt-8 flex justify-end">
                                        <NextButton 
                                          nextModule={findNextModule(module.id, subModule.id)} 
                                          onNext={navigateToContent}
                                        />
                                      </div>
                                    </>
                                  </React.Suspense>
                                </ErrorBoundary>
                              }
                            />
                          ))
                        )}
                        <Route 
                          path="*" 
                          element={
                            <div className="text-center p-8">
                              <h1>Topic Not Found</h1>
                              <p>The requested topic could not be found.</p>
                            </div>
                          } 
                        />
                      </Routes>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CourseLayout);