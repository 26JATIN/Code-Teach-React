import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { debounce } from 'lodash';
import CopyButton from './CopyButton';

const CodeEditor = ({ defaultCode }) => {
  const [code, setCode] = useState(defaultCode || 
`public class Main {
    public static void main(String[] args) {
        // Write your code here
    }
}`);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fontSize, setFontSize] = useState(14);
  // eslint-disable-next-line no-unused-vars
  const [lineCount, setLineCount] = useState(0);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const LINE_HEIGHT_FACTOR = 1.5; // line height multiplier for better spacing
  const [input, setInput] = useState(''); // Add this new state
  const [showInputModal, setShowInputModal] = useState(false);

  // Add this function to check if code requires input
  const needsInput = useMemo(() => {
    const inputPatterns = [
      'Scanner',
      'System.in',
      'BufferedReader',
      'InputStreamReader',
      'Console.readLine',
      'console.readLine'
    ];
    return inputPatterns.some(pattern => code.includes(pattern));
  }, [code]);

  // Memoize expensive calculations
  const calculateEditorHeight = useMemo(() => {
    return (code, fontSize, LINE_HEIGHT_FACTOR) => {
      const baseLineHeight = fontSize * LINE_HEIGHT_FACTOR;
      const maxLines = 20;
      const padding = 16;
      const actualLines = code.split('\n').length;
      return Math.min(actualLines * baseLineHeight + padding, maxLines * baseLineHeight + padding);
    };
  }, []);

  // Memoize editor options
  const editorOptions = useMemo(() => ({
    minimap: { enabled: false },
    fontSize: Math.max(12, fontSize - (window.innerWidth < 640 ? 2 : 0)),
    scrollBeyondLastLine: false,
    lineNumbers: 'on',
    roundedSelection: false,
    wordWrap: 'off',
    renderLineHighlight: 'all',
    lineHeight: Math.round(fontSize * LINE_HEIGHT_FACTOR),
    padding: { top: 8, bottom: 8 },
    lineNumbersMinChars: 3,     // Add this line
    glyphMargin: false,         // Add this line
    folding: false,             // Add this line
    scrollbar: {
      vertical: 'auto',
      horizontal: 'visible',
      useShadows: true,
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    },
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    automaticLayout: true,
  }), [fontSize, LINE_HEIGHT_FACTOR]);

  // Modify debouncedResize to use proper dependency handling
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = useCallback(
    debounce((editor) => {
      if (editor) {
        editor.layout();
      }
    }, 100),
    [] // Empty dependency array is intentional as we want to create this function only once
  );

  // Alternative solution without eslint-disable:
  /*
  const debouncedResize = useMemo(
    () =>
      debounce((editor) => {
        if (editor) {
          editor.layout();
        }
      }, 100),
    []
  );
  */

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

  // Memoize handlers
  const handleEditorDidMount = useCallback((editor) => {
    editorRef.current = editor;
    setLineCount(code.split('\n').length);
  }, [code]);

  const executeWithInput = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setShowInputModal(false);
    
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'java',
          version: '15.0.2',
          files: [{ content: code }],
          stdin: needsInput ? input : '', // Only send input if needed
        }),
      });

      const data = await response.json();
      setOutput(data.run.output || data.run.stderr);
    } catch (err) {
      setError('Failed to execute code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [code, input, needsInput]);

  // Move handleExecuteClick after executeWithInput and include it in dependencies
  const handleExecuteClick = useCallback(() => {
    if (needsInput) {
      setShowInputModal(true);
    } else {
      executeWithInput(); // Execute directly if no input needed
    }
  }, [needsInput, executeWithInput]); // Add executeWithInput to dependencies

  const handleEditorChange = useCallback((value) => {
    setCode(value);
    setLineCount((value || '').split('\n').length);
  }, []);

  // Memoize the Editor component
  const MonacoEditor = useMemo(() => (
    <Editor
      height="100%"
      defaultLanguage="java"
      theme="vs-dark"
      value={code}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      options={editorOptions}
    />
  ), [code, handleEditorChange, handleEditorDidMount, editorOptions]);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[320px] w-full space-y-2 md:space-y-4 bg-gray-900/50 p-2 sm:p-3 md:p-6 rounded-xl border border-gray-700/50">
        {/* Editor Section */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2 min-w-full">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs sm:text-sm text-gray-400 ml-2">Main.java</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <CopyButton 
                textToCopy={code}
                className="w-full sm:w-auto justify-center" 
              />
              <button
                onClick={handleExecuteClick}
                disabled={isLoading}
                className="px-3 sm:px-4 py-1 sm:py-1.5 bg-blue-600/80 text-white rounded-md hover:bg-blue-700/80 
                       transition-all duration-200 text-xs sm:text-sm font-medium flex items-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 
                       focus:ring-blue-500/50 w-full sm:w-auto justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    <span>Running</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Run Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Font Size Slider */}
          <div className="mb-2 flex flex-wrap items-center gap-2 min-w-full overflow-x-auto">
            <span className="text-xs sm:text-sm text-gray-400">Font Size:</span>
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-24 sm:w-32 h-1.5 sm:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-xs sm:text-sm text-gray-400">{fontSize}px</span>
          </div>

          <div 
            ref={containerRef}
            className="border border-gray-800 rounded-lg overflow-hidden transition-height duration-200 ease-in-out"
            style={{ height: `${calculateEditorHeight(code, fontSize, LINE_HEIGHT_FACTOR)}px` }}
          >
            {MonacoEditor}
          </div>
        </div>

        {/* Replace the input section with this modal */}
        {showInputModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-lg font-medium">Input Required</h3>
                <button
                  onClick={() => setShowInputModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Your code contains input operations. Please provide the required input:
              </p>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your program input here..."
                className="w-full h-32 bg-gray-800 text-white rounded-md border border-gray-700 p-2 text-sm font-mono resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowInputModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={executeWithInput}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Run with Input
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Terminal Output */}
        <div className="bg-gray-950/90 rounded-lg border border-gray-800/50">
          <div className="flex items-center justify-between px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border-b border-gray-800/50 overflow-x-auto">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs sm:text-sm text-gray-400">Output Terminal</span>
            </div>
          </div>
          
          <div className="p-2 sm:p-3 md:p-4 font-mono text-xs sm:text-sm min-h-[80px] sm:min-h-[100px] max-h-[150px] sm:max-h-[200px] overflow-auto whitespace-pre">
            {error ? (
              <div className="text-red-400 flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            ) : output ? (
              <div className="text-green-400 whitespace-pre-wrap">{output}</div>
            ) : (
              <div className="text-gray-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Run your code to see the output here...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize the entire component
export default React.memo(CodeEditor);