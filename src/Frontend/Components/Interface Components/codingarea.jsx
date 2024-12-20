import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Folder, File, X, Plus, Save, Trash, Copy, Download, Play } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { debounce } from 'lodash';

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
  const variants = {
    default: 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300',
    primary: 'bg-blue-600/80 hover:bg-blue-700/80 text-white',
    success: 'bg-green-600/80 hover:bg-green-700/80 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs rounded-md transition-all duration-200 
        flex items-center gap-2 border border-gray-700/50 ${variants[variant]}`}
    >
      <Icon size={14} />
      <span>{label}</span>
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

  // Update handleFileChange to include auto-save and validation
  const handleFileChange = useCallback((value) => {
    if (!activeFile) return;

    // Validate Java class name
    if (activeFile.name.endsWith('.java')) {
      validateJavaClassName(value, activeFile.name);
    }

    // Update file content
    setFiles(prev => prev.map(f => 
      f.id === activeFile.id ? { ...f, content: value } : f
    ));

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
  }, [activeFile, files, validateJavaClassName]);

  const handleDeleteFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFile?.id === fileId) {
      setActiveFile(null);
    }
  };

  const editorOptions = useMemo(() => ({
    minimap: { enabled: false },
    fontSize: Math.max(12, fontSize),
    scrollBeyondLastLine: false,
    lineNumbers: 'on',
    lineNumbersMinChars: 3,  // Make line numbers width smaller
    roundedSelection: false,
    padding: { top: 16 },
    automaticLayout: true,
    scrollbar: {
      vertical: 'auto',
      horizontal: 'visible',
      useShadows: true,
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    },
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
  }), [fontSize]);

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

  const executeCode = useCallback(async (fileContent, language) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const isJava = language === 'java';
      
      // Validate Java class name before execution
      if (isJava && activeFile) {
        if (!validateJavaClassName(fileContent, activeFile.name)) {
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
            content: fileContent  // Changed from content to fileContent
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
  }, [input, activeFile, validateJavaClassName]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="flex-1 flex h-full bg-gradient-to-b from-gray-900 to-gray-950">
      {/* File Explorer */}
      <div className="w-56 border-r border-gray-800/50 flex flex-col bg-gray-900/50 backdrop-blur-sm">
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
              onClick={() => setActiveFile(file)}
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
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className="px-4 py-3 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-gray-200 font-medium">
                {activeFile ? activeFile.name : 'No file selected'}
              </h2>
              {saveStatus && (
                <span className="text-xs text-gray-400 animate-fade-in">
                  {saveStatus}
                </span>
              )}
              {activeFile && (
                <div className="flex items-center gap-2">
                  <ActionButton 
                    icon={Copy} 
                    label="Copy" 
                    onClick={() => navigator.clipboard.writeText(activeFile.content)}
                  />
                  <ActionButton 
                    icon={Download} 
                    label="Download" 
                    onClick={() => downloadCode(activeFile.content, activeFile.name)}
                  />
                  <ActionButton 
                    icon={Play} 
                    label={isLoading ? 'Running...' : 'Run'} 
                    variant="primary"
                    onClick={() => executeCode(activeFile.content, 
                      activeFile.name.endsWith('.java') ? 'java' : 'javascript')}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
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
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400"
                title="Close Editor"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Editor and Output */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative" ref={containerRef}>
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

          {/* Output Terminal with refined styling */}
          {activeFile && (
            <div className="h-48 border-t border-gray-800/50 bg-gray-950/90 backdrop-blur-sm">
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

      {/* New File Dialog */}
      {showNewFileDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800/90 p-6 rounded-xl w-96 shadow-2xl border border-gray-700/50
            backdrop-blur-md transform transition-all duration-200">
            <h3 className="text-gray-200 mb-4">Create New File</h3>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="filename.js"
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

      {/* Input Modal */}
      {showInputModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800/90 p-6 rounded-xl w-96 shadow-2xl border border-gray-700/50">
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
                onClick={() => executeCode(activeFile.content)}
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
