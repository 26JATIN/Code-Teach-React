import React, { useState, useEffect, useCallback, memo, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import History from './0.Intoduction To Java/1.History';
import WhyJava from './0.Intoduction To Java/2.WhyJava';
import TopicsCovered from './0.Intoduction To Java/3.TopicsCovered';
import InstallationOfJavaOnWindows from './0.Intoduction To Java/4.InstallationOfJavaOnWindows';
import Syntexofjava from './2.Syntex And Variables/1.Syntexofjava';
import VariablesinJava from './2.Syntex And Variables/2.VariablesinJava';
import DatatypesinJava from './2.Syntex And Variables/3.DatatypesinJava';
import WhatIsAProgram from './1.HowaprogramWorks/1.whatisaprogram';
import HowDoesAProgramWork from './1.HowaprogramWorks/2.howdoesprogramworks';
import WhatIsCompiler from './1.HowaprogramWorks/3.whatisacompiler';
import WhatIsInterpreter from './1.HowaprogramWorks/4.whatisainterpreter';
import WhatIsCodeEditor from './1.HowaprogramWorks/5.whatisacodeeditor';
import WhatTypeOfLanguageIsJava from './1.HowaprogramWorks/6.whattypeoflanguageisjava';

const modules = [
  {
    id: '0',
    title: 'Introduction To Java',
    subModules: [
      { id: '0.1', title: '1. History', component: History },
      { id: '0.2', title: '2. Why Java?', component: WhyJava },
      { id: '0.3', title: '3. Topics Covered', component: TopicsCovered },
      { id: '0.4', title: '4. Installation Guide', component: InstallationOfJavaOnWindows }
    ]
  },
  {
    id: '1',
    title: 'How Programs Work',
    subModules: [
      { id: '1.1', title: 'What is a Program?', component: WhatIsAProgram },
      { id: '1.2', title: 'How Programs Run', component: HowDoesAProgramWork },
      { id: '1.3', title: 'What is a Compiler?', component: WhatIsCompiler },
      { id: '1.4', title: 'What is an Interpreter?', component: WhatIsInterpreter },
      { id: '1.5', title: 'What is a Code Editor?', component: WhatIsCodeEditor },
      { id: '1.6', title: 'What Type of Language is Java?', component: WhatTypeOfLanguageIsJava }
    ]
  },
  {
    id: '2',
    title: 'Syntax And Variables',
    subModules: [
      { id: '2.1', title: 'Java Syntax', component: Syntexofjava },
      { id: '2.2', title: 'Variables in Java', component: VariablesinJava },
      { id: '2.3', title: 'Data Types in Java', component: DatatypesinJava }
    ]
  }
];

// Memoize the module and submodule buttons for better performance
const ModuleButton = memo(({ module, isExpanded, toggleModule }) => (
  <button
    onClick={() => toggleModule(module.id)}
    className="w-full px-4 py-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50
      transition-all duration-200 border border-gray-700/30 hover:border-gray-600/30
      focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-left"
  >
    <div className="flex items-center">
      <div className={`p-1.5 rounded-md transition-colors
        ${isExpanded ? 'bg-blue-500/10' : ''}`}>
        {isExpanded ? (
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
));

const LearnJava = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const [isMenuOpen, setIsMenuOpen] = useState(!isMobile);

  const [expandedModules, setExpandedModules] = useState({});
  const [activeModule, setActiveModule] = useState(null);
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
  }, [location]);

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

  // Optimized scroll behavior
  const scrollToTop = useCallback(() => {
    const contentArea = document.querySelector('.content-scroll-area');
    if (!contentArea) return;

    const scroll = () => {
      contentArea.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(scroll);
  }, []);

  const navigateToContent = useCallback((moduleId, subModuleId) => {
    setActiveModule(`${moduleId}.${subModuleId}`);
    setExpandedModules(prev => ({ ...prev, [moduleId]: true }));
    scrollToTop();
    if (isMobile) {
      setIsMenuOpen(false);
    }
    setTimeout(() => {
      navigate(`/modules/java/${moduleId}/${subModuleId}`);
    }, 100);
  }, [navigate, scrollToTop, isMobile]);

  useEffect(() => {
    scrollToTop();
  }, [location.pathname, scrollToTop]);

  // Debounced menu toggle to prevent rapid toggling
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
  }, []);

  // Clean up styles on unmount
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

      /* Prevent CLS during transitions */
      .sidebar-transition {
        will-change: transform, opacity, width;
      }

      /* Optimize animations */
      .content-scroll-area {
        will-change: scroll-position;
        -webkit-overflow-scrolling: touch;
      }

      /* Prevent layout shifts */
      .module-container {
        min-height: 48px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Add smooth scroll function
  const smoothScroll = useCallback((direction) => {
    const contentArea = document.querySelector('.content-scroll-area');
    if (!contentArea) return;

    const scrollAmount = window.innerHeight * 0.75; // 75% of viewport height
    const currentScroll = contentArea.scrollTop;
    const targetScroll = direction === 'up' ? 
      currentScroll - scrollAmount : 
      currentScroll + scrollAmount;

    contentArea.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  // Add navigation between modules
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
      const targetModule = flatModules[targetIndex];
      navigateToContent(targetModule.moduleId, targetModule.id);
    }
  }, [location.pathname, navigateToContent]);

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle if not typing in an input
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

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-950 overflow-hidden">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-gray-800/90 
            border border-gray-700/50 text-gray-400 shadow-lg backdrop-blur-sm
            hover:text-gray-200 transition-all duration-200
            hover:bg-gray-700/90"
          title="Toggle Menu (Ctrl+M)"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar - Update visibility classes for mobile */}
      <div 
        className={`fixed md:relative z-40 h-full sidebar-transition
          ${isMenuOpen ? 'w-[280px] md:w-[320px] translate-x-0' : 'w-[60px] -translate-x-full md:translate-x-0'}
          bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50 group flex flex-col
          transition-all duration-300 ease-in-out`}
        style={{ 
          willChange: 'transform, width',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Show toggle button only on desktop */}
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
              <span className="text-lg font-semibold text-gray-300">J</span>
            </div>
            <div className="h-20 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-transparent"/>
          </div>
          <span className="writing-mode-vertical text-xs font-medium text-gray-400
            tracking-wider uppercase rotate-180 mt-4">Learn Java</span>
        </div>

        <div className={`${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} 
          transition-all duration-200 h-full overflow-hidden absolute inset-0 bg-gray-900/95 flex flex-col`}>
          <div className="p-6 border-b border-gray-800/50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                flex items-center justify-center border border-gray-700/50">
                <span className="text-sm font-semibold text-gray-300">J</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-200">Learn Java</h2>
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
        <div className="absolute inset-0 flex flex-col">
          <div className="sticky top-0 z-10 px-4 sm:px-6 py-3 border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-xl flex-shrink-0">
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
              
          <div className="flex-1 overflow-y-auto content-scroll-area">
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
                        <h1>Welcome to Java Learning</h1>
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
                            <Suspense fallback={<LoadingSpinner />}>
                              <subModule.component 
                                nextModule={findNextModule(module.id, subModule.id)}
                                onNext={navigateToContent}
                              />
                            </Suspense>
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
          </div>
        </div>
      </div>
    </div>
  );
};

// Add error boundary
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

// Add loading spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

export default memo(LearnJava);
