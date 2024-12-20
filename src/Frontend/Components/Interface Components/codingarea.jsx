import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Folder, File, X, Plus, Save, Trash, Copy } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { debounce } from 'lodash';

// Import CopyButton component from CodeEditor
const CopyButton = ({ textToCopy, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 text-xs bg-gray-800/50 text-gray-300 rounded-md
        hover:bg-gray-700/50 transition-all duration-200 flex items-center gap-2
        border border-gray-700/50 ${className}`}
    >
      <Copy size={14} />
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
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

  useEffect(() => {
    localStorage.setItem('codeFiles', JSON.stringify(files));
  }, [files]);

  const handleCreateFile = () => {
    if (!newFileName) return;
    const newFile = {
      id: Date.now(),
      name: newFileName.includes('.') ? newFileName : `${newFileName}.js`,
      content: '',
      created: new Date().toISOString()
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFile(newFile);
    setNewFileName('');
    setShowNewFileDialog(false);
  };

  const handleFileChange = (value) => {
    if (!activeFile) return;
    setFiles(prev => prev.map(f => 
      f.id === activeFile.id ? { ...f, content: value } : f
    ));
  };

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
    roundedSelection: false,
    padding: { top: 16 },
    automaticLayout: true,
    scrollbar: {
      vertical: 'auto',
      horizontal: 'visible',
      useShadows: true,
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    }
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
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: language || 'javascript',
          version: language === 'java' ? '15.0.2' : '*',
          files: [{ content: fileContent }],
          stdin: input
        }),
      });

      const data = await response.json();
      setOutput(data.run.output || data.run.stderr);
    } catch (err) {
      setError('Failed to execute code. Please try again.');
    } finally {
      setIsLoading(false);
      setShowInputModal(false);
    }
  }, [input]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="flex-1 flex h-full bg-gray-900">
      {/* File Explorer */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-gray-200 font-medium">Files</h2>
          <button
            onClick={() => setShowNewFileDialog(true)}
            className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400"
            title="New File"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {files.map(file => (
            <div
              key={file.id}
              onClick={() => setActiveFile(file)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                activeFile?.id === file.id ? 'bg-gray-800' : 'hover:bg-gray-800/50'
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
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-gray-200 font-medium">
              {activeFile ? activeFile.name : 'No file selected'}
            </h2>
            {activeFile && (
              <div className="flex items-center gap-2">
                <CopyButton textToCopy={activeFile.content} />
                <button
                  onClick={() => executeCode(activeFile.content, activeFile.name.endsWith('.java') ? 'java' : 'javascript')}
                  disabled={isLoading}
                  className="px-3 py-1.5 bg-blue-600/80 text-white rounded-md hover:bg-blue-700/80 
                    transition-all duration-200 text-xs font-medium flex items-center gap-2
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Running...' : 'Run Code'}
                </button>
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

        <div className="flex-1 flex flex-col">
          <div className="flex-1" ref={containerRef}>
            {activeFile ? (
              <Editor
                height="100%"
                defaultLanguage={activeFile.name.endsWith('.java') ? 'java' : 'javascript'}
                theme="vs-dark"
                value={activeFile.content}
                onChange={handleFileChange}
                onMount={handleEditorDidMount}
                options={editorOptions}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Select or create a file to start coding
              </div>
            )}
          </div>

          {/* Output Terminal */}
          {activeFile && (
            <div className="h-48 border-t border-gray-800 bg-gray-950/90">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/50">
                <span className="text-xs text-gray-400">Output Terminal</span>
                {output && <CopyButton textToCopy={output} />}
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
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
