import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Folder, File, X, Plus, Save, Trash, Copy, Download, Play } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { debounce } from 'lodash';
import { useMediaQuery } from 'react-responsive';  // Add this import


// Add download helper function
const downloadCode = (content, filename) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

// Update CopyButton with more modern styling
const ActionButton = ({ icon: Icon, label, onClick, variant = 'default' }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const variants = {
    default: 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300',
    primary: 'bg-blue-600/80 hover:bg-blue-700/80 text-white',
    success: 'bg-green-600/80 hover:bg-green-700/80 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`p-1.5 md:px-3 md:py-1.5 text-xs rounded-md transition-all duration-200 
        flex items-center gap-1 md:gap-2 border border-gray-700/50 ${variants[variant]}`}
    >
      <Icon size={isMobile ? 16 : 14} />
      {label && <span className="hidden md:inline">{label}</span>}
    </button>
  );
};

const getDefaultContent = (filename) => {
  if (filename.endsWith('.java')) {
    const className = filename.replace('.java', '');
    return `public class ${className} {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello World!");
    }
}`;
  }
  return '// Write your code here';
};

const CodingArea = ({ onClose }) => {
  const [files, setFiles] = useState(() => {
    const savedFiles = localStorage.getItem('codeFiles');
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  const [activeFile, setActiveFile] = useState(null);
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [input, setInput] = useState('');
  const [showInputModal, setShowInputModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // Add save status state
  const [autoExecute, setAutoExecute] = useState(false);
  const latestContentRef = useRef('');  // To track latest content
  const [currentContent, setCurrentContent] = useState('');
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(!isMobile);
  const fileExplorerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('codeFiles', JSON.stringify(files));
  }, [files]);

  const handleCreateFile = () => {
    if (!newFileName) return;
    const newFile = {
      id: Date.now(),
      name: newFileName.includes('.') ? newFileName : `${newFileName}.js`,
      content: getDefaultContent(newFileName.includes('.') ? newFileName : `${newFileName}.js`),
      created: new Date().toISOString()
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFile(newFile);
    setNewFileName('');
    setShowNewFileDialog(false);
  };

  // Add function to validate Java class name
  const validateJavaClassName = useCallback((content, filename) => {
    if (!filename.endsWith('.java')) return true;
    
    const className = filename.replace('.java', '');
    const classPattern = new RegExp(`public\\s+class\\s+${className}\\s*{`);
    
    if (!classPattern.test(content)) {
      setError(`Error: Class name must be "${className}" to match the file name`);
      return false;
    }
    return true;
  }, []);

  const executeCode = useCallback(async (fileContent, language) => {
    if (!fileContent) return;
    setIsLoading(true);
    setError(null);
    
    try {
      const isJava = language === 'java';
      const contentToExecute = fileContent || currentContent;
      
      if (isJava && activeFile) {
        if (!validateJavaClassName(contentToExecute, activeFile.name)) {
          setIsLoading(false);
          return;
        }
      }
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: isJava ? 'java' : 'javascript',
          version: isJava ? '15.0.2' : '*',
          files: [{
            name: isJava ? 'Main.java' : 'index.js',
            content: contentToExecute
          }],
          stdin: input
        }),
      });

      const data = await response.json();
      
      if (data.message) {
        setError(data.message);
        return;
      }

      setOutput(data.run.output || data.run.stderr);
    } catch (err) {
      setError('Failed to execute code. Please try again.');
    } finally {
      setIsLoading(false);
      setShowInputModal(false);
    }
  }, [input, activeFile, validateJavaClassName, currentContent]);

  // Update handleFileChange to use a debounced execute
  const debouncedExecute = useCallback(
    debounce((content, language) => {
      executeCode(content, language);
    }, 1000),
    [executeCode]
  );

  // Update handleFileChange to include auto-save and validation
  const handleFileChange = useCallback((value) => {
    if (!activeFile) return;

    setCurrentContent(value);
    latestContentRef.current = value;

    // Validate Java class name
    if (activeFile.name.endsWith('.java')) {
      validateJavaClassName(value, activeFile.name);
    }

    // Update file content
    setFiles(prev => prev.map(f => 
      f.id === activeFile.id ? { ...f, content: value } : f
    ));

    // Auto-execute if enabled
    if (autoExecute && !error) {
      debouncedExecute(
        value,
        activeFile.name.endsWith('.java') ? 'java' : 'javascript'
      );
    }

    // Show saving status
    setSaveStatus('Saving...');

    // Debounced save to localStorage
    const saveToStorage = debounce(() => {
      localStorage.setItem('codeFiles', JSON.stringify(files));
      setSaveStatus('All changes saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);

    saveToStorage();

    return () => saveToStorage.cancel();
  }, [activeFile, files, validateJavaClassName, autoExecute, debouncedExecute, error]);

  const handleDeleteFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFile?.id === fileId) {
      setActiveFile(null);
    }
  };

  // Update file selection to close menu on mobile
  const handleFileSelect = useCallback((file) => {
    setActiveFile(file);
    if (isMobile) {
      setIsFileExplorerOpen(false);
    }
  }, [isMobile]);

  // Update editor options for better mobile scrolling
  const editorOptions = useMemo(() => ({
    minimap: { enabled: !isMobile },
    fontSize: isMobile ? Math.max(14, fontSize) : Math.max(12, fontSize),
    scrollBeyondLastLine: false,
    lineNumbers: isMobile ? 'off' : 'on',
    lineNumbersMinChars: 3,  // Make line numbers width smaller
    roundedSelection: false,
    padding: { top: 16 },
    automaticLayout: true,
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      useShadows: true,
      verticalScrollbarSize: isMobile ? 12 : 8,
      horizontalScrollbarSize: isMobile ? 12 : 8,
      alwaysConsumeMouseWheel: false,
      arrowSize: isMobile ? 15 : 11
    },
    mouseWheelScrollSensitivity: isMobile ? 2 : 1,
    touchScrollSensitivity: 2,
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    glyphMargin: false,  // Disable glyph margin to save space
    folding: true,
    // Modern editor styling
    renderLineHighlight: 'all',
    contextmenu: false,
    cursorBlinking: 'smooth',
    smoothScrolling: true,
    padding: { top: 20, bottom: 20 },
    lineDecorationsWidth: 5,
    renderIndentGuides: true,
    colorDecorators: true,
    bracketPairColorization: {
      enabled: true,
    },
    wordWrap: isMobile ? 'on' : 'off',
  }), [fontSize, isMobile]);

  const debouncedResize = useCallback(
    debounce((editor) => {
      if (editor) {
        editor.layout();
      }
    }, 100),
    []
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (editorRef.current) {
        debouncedResize(editorRef.current);
      }
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      debouncedResize.cancel();
    };
  }, [debouncedResize]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      debouncedExecute.cancel();
    };
  }, [debouncedExecute]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (activeFile) {
      setCurrentContent(activeFile.content);
    }
  }, [activeFile]);

  const toggleFileExplorer = useCallback(() => {
    setIsFileExplorerOpen(prev => !prev);
  }, []);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && 
          fileExplorerRef.current && 
          !fileExplorerRef.current.contains(event.target) &&
          !event.target.closest('button[aria-label="toggle-file-explorer"]')) {
        setIsFileExplorerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile]);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-2 border-b border-gray-800/50">
          <button
            onClick={toggleFileExplorer}
            aria-label="toggle-file-explorer"
            className="p-2 rounded-lg bg-gray-800/50 text-gray-400"
          >
            <Folder size={20} />
          </button>
          <span className="text-gray-200 font-medium">
            {activeFile?.name || 'Code Editor'}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-800/50 text-gray-400"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* File Explorer - Make it conditionally visible */}
      <div 
        ref={fileExplorerRef}
        className={`
        ${isFileExplorerOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isMobile ? 'absolute z-20 h-full' : 'relative'}
        w-56 md:w-64 border-r border-gray-800/50 flex flex-col bg-gray-900/50 
        backdrop-blur-sm transition-transform duration-200
      `}>
        <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
          <h2 className="text-gray-200 font-medium tracking-wide">Files</h2>
          <button
            onClick={() => setShowNewFileDialog(true)}
            className="p-1.5 rounded-lg hover:bg-gray-800/70 text-gray-400 
              transition-colors duration-200"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* File list with refined styling */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {files.map(file => (
            <div
              key={file.id}
              onClick={() => handleFileSelect(file)}
              className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer
                transition-all duration-200 ${
                activeFile?.id === file.id 
                  ? 'bg-gray-800/90 shadow-lg' 
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <File size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">{file.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file.id);
                }}
                className="p-1 rounded hover:bg-gray-700 text-gray-400"
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Editor Header - Responsive version */}
        <div className="px-2 md:px-4 py-2 md:py-3 border-b border-gray-800/50 bg-gray-900/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
              {!isMobile && (
                <h2 className="text-gray-200 font-medium">
                  {activeFile ? activeFile.name : 'No file selected'}
                </h2>
              )}
              {saveStatus && (
                <span className="text-xs text-gray-400 animate-fade-in whitespace-nowrap">
                  {saveStatus}
                </span>
              )}
              {activeFile && (
                <div className="flex items-center gap-1 md:gap-2">
                  <ActionButton 
                    icon={Copy} 
                    label={isMobile ? '' : "Copy"}
                    onClick={() => navigator.clipboard.writeText(currentContent)}
                  />
                  <ActionButton 
                    icon={Download} 
                    label={isMobile ? '' : "Download"}
                    onClick={() => downloadCode(currentContent, activeFile.name)}
                  />
                  <ActionButton 
                    icon={Play} 
                    label={isMobile ? '' : (isLoading ? 'Running...' : 'Run')}
                    variant="primary"
                    onClick={() => executeCode(currentContent, 
                      activeFile.name.endsWith('.java') ? 'java' : 'javascript')}
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              {!isMobile && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs text-gray-400">
                      <input
                        type="checkbox"
                        checked={autoExecute}
                        onChange={(e) => setAutoExecute(e.target.checked)}
                        className="rounded border-gray-600"
                      />
                      Auto-run
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Font Size:</span>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="text-xs text-gray-400">{fontSize}px</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Editor and Output - Responsive */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative min-h-0" ref={containerRef}>
            {activeFile ? (
              <div className="absolute inset-0 p-2">
                <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-800/50">
                  <Editor
                    height="100%"
                    defaultLanguage={activeFile.name.endsWith('.java') ? 'java' : 'javascript'}
                    theme="vs-dark"
                    value={activeFile.content}
                    onChange={handleFileChange}
                    onMount={handleEditorDidMount}
                    options={editorOptions}
                    className="rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center space-y-3">
                  <File size={40} className="mx-auto text-gray-500/50" />
                  <div className="text-lg font-medium">No File Selected</div>
                  <div className="text-sm text-gray-500">
                    Select an existing file or create a new one to start coding
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Output Terminal - Responsive */}
          {activeFile && (
            <div className="h-32 md:h-48 border-t border-gray-800/50 bg-gray-950/90">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/30">
                <span className="text-xs font-medium text-gray-400">Output Terminal</span>
                {output && <ActionButton icon={Copy} label="Copy" onClick={() => navigator.clipboard.writeText(output)} />}
              </div>
              <div className="p-4 font-mono text-sm h-36 overflow-auto">
                {error ? (
                  <span className="text-red-400">{error}</span>
                ) : output ? (
                  <span className="text-green-400 whitespace-pre-wrap">{output}</span>
                ) : (
                  <span className="text-gray-500">Run your code to see the output here...</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Responsive Modals */}
      {showNewFileDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800/90 p-4 md:p-6 rounded-xl w-full max-w-sm md:max-w-md">
            <h3 className="text-gray-200 mb-4">Create New File</h3>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="filename.java"
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-gray-200"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowNewFileDialog(false)}
                className="px-4 py-2 rounded bg-gray-700 text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {showInputModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800/90 p-4 md:p-6 rounded-xl w-full max-w-sm md:max-w-md">
            <h3 className="text-gray-200 mb-4">Program Input</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter program input..."
              className="w-full h-32 bg-gray-700 rounded border border-gray-600 p-2 text-gray-200"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowInputModal(false)}
                className="px-4 py-2 rounded bg-gray-700 text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const currentContent = latestContentRef.current || activeFile.content;
                  executeCode(
                    currentContent,
                    activeFile.name.endsWith('.java') ? 'java' : 'javascript'
                  );
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Run with Input
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(CodingArea);
