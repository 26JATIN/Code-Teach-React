import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Grip, Menu, X } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import History from './0.Intoduction To Java/1.History';
import WhyJava from './0.Intoduction To Java/2.WhyJava';
import TopicsCovered from './0.Intoduction To Java/3.TopicsCovered';

const modules = [
  {
    id: '0',
    title: 'Introduction To Java',
    subModules: [
      { id: '0.1', title: '1. History', component: History },
      { id: '0.2', title: '2. Why Java?', component: WhyJava },
      { id: '0.3', title: '3. Topics Covered', component: TopicsCovered }
    ]
  }
  // For next module:
  // {
  //   id: '1',
  //   title: 'Module Name',
  //   subModules: [
  //     { id: '1.1', title: '1. SubmoduleName', component: ComponentName },
  //   ]
  // }
];

const LearnJava = () => {
  // Add responsive hooks
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  
  // Adjust initial sidebar width based on screen
  const getInitialWidth = useCallback(() => {
    if (isMobile) return 0;
    if (isTablet) return 300;
    return 320;
  }, [isMobile, isTablet]);

  const [sidebarWidth, setSidebarWidth] = useState(getInitialWidth());
  const [expandedModules, setExpandedModules] = useState({});
  const [isResizing, setIsResizing] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Open the module containing the current route
    const currentPath = location.pathname;
    modules.forEach((module) => {
      module.subModules.forEach((subModule) => {
        if (currentPath.includes(subModule.id)) {
          setExpandedModules((prev) => ({ ...prev, [module.id]: true }));
        }
      });
    });
  }, [location]);

  // Add this to handle initial route
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

  // Update scroll behavior with improved scroll restoration
  const scrollToTop = useCallback(() => {
    requestAnimationFrame(() => {
      const contentArea = document.querySelector('.content-scroll-area');
      if (contentArea) {
        // Capture current position
        const currentPosition = contentArea.scrollTop;
        
        // Force a reflow at current position
        contentArea.style.scrollBehavior = 'instant';
        contentArea.scrollTo(0, currentPosition);
        
        // Then smoothly scroll to top
        requestAnimationFrame(() => {
          contentArea.style.scrollBehavior = 'smooth';
          contentArea.scrollTo(0, 0);
          
          // Reset scroll behavior after animation
          setTimeout(() => {
            contentArea.style.scrollBehavior = 'auto';
          }, 500);
        });
      }
    });
  }, []);

  // Update navigation with better scroll timing
  const navigateToContent = useCallback((moduleId, subModuleId) => {
    setActiveModule(`${moduleId}.${subModuleId}`);
    setExpandedModules(prev => ({ ...prev, [moduleId]: true }));
    // Scroll first, then navigate
    scrollToTop();
    setTimeout(() => {
      navigate(`/modules/java/${moduleId}/${subModuleId}`);
    }, 100);
  }, [navigate, scrollToTop]);

  // Add this effect to handle scroll restoration
  useEffect(() => {
    scrollToTop();
  }, [location.pathname, scrollToTop]);

  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
    mouseDownEvent.preventDefault();
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        const newWidth = mouseMoveEvent.clientX;
        if (newWidth >= 200 && newWidth <= 600) {
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  useEffect(() => {
    setSidebarWidth(getInitialWidth());
  }, [getInitialWidth]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Update the findNextModule function
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
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-950">
      {/* Mobile Menu - More Visible */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-50 p-3.5 rounded-xl bg-gray-800/30 
        border border-gray-700/30 text-gray-300 hover:bg-gray-800/50 
        active:scale-95 transform backdrop-blur-xl shadow-lg"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar - Improved Mobile */}
      <div 
        style={{ width: isSidebarOpen ? (isMobile ? '100%' : sidebarWidth) : 0 }} 
        className={`fixed md:relative z-40 h-full bg-gray-900/95 backdrop-blur-xl
          transition-all duration-300 transform border-r border-gray-800/50
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
          md:transform-none md:transition-none overflow-hidden
          md:min-w-[280px] lg:min-w-[320px] w-full md:w-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Header Area */}
          <div className="p-6 flex-shrink-0">
            <div className="relative pb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                    Learn Java
                  </span>
                  <span className="text-xs ml-2 text-slate-400 font-normal">Beta</span>
                </h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">Master Java Programming</p>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 via-slate-700/20 to-transparent"></div>
            </div>
          </div>

          {/* Module List */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700/30 hover:scrollbar-thumb-blue-500/20">
            <div className="p-4 space-y-3">
              {modules.map((module) => (
                <div key={module.id} className="group">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50
                      transition-all duration-200 border border-gray-700/30 hover:border-gray-600/30
                      focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-left"
                  >
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-md transition-colors
                        ${expandedModules[module.id] ? 'bg-blue-500/10' : ''}`}>
                        {expandedModules[module.id] ? (
                          <ChevronDown className="w-4 h-4 text-sky-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-sky-400" />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between ml-2">
                        <div>
                          <span className="font-medium text-slate-200 text-sm block">
                            {module.title}
                          </span>
                          <span className="text-xs text-slate-400">
                            {module.subModules.length} lessons
                          </span>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/50 text-blue-400 border border-slate-700/50">
                          {module.subModules.length}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Submodules */}
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

        {/* Enhanced Resize Handle */}
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize group hidden md:block"
          onMouseDown={startResizing}
        >
          <div className="absolute inset-y-0 right-0 w-px bg-white/[0.02] group-hover:bg-sky-500/20 
            transition-colors duration-200"></div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Grip className="w-4 h-4 text-sky-400/40" />
          </div>
        </div>
      </div>

      {/* Content Area - Enhanced Responsiveness */}
      <div className="flex-1 overflow-hidden bg-gray-950">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 content-scroll-area">
          {/* Responsive Breadcrumb */}
          <div className="sticky top-0 z-10 px-4 sm:px-6 py-3 border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-gray-300 font-medium text-sm">Java</span>
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
          </div>
              
          {/* Content Area */}
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
                {modules.map((module) =>
                  module.subModules.map((subModule) => (
                    <Route
                      key={subModule.id}
                      path={`/${module.id}/${subModule.id}`}
                      element={
                        <subModule.component 
                          nextModule={findNextModule(module.id, subModule.id)}
                          onNext={navigateToContent}
                        />
                      }
                    />
                  ))
                )}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnJava;
