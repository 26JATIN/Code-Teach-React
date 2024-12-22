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
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [currentInputBuffer, setCurrentInputBuffer] = useState('');
  const terminalRef = useRef(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isProgramRunning, setIsProgramRunning] = useState(false);
  const inputRef = useRef(null);

  // Create a ref for tracking program state
  const programState = useRef({
    inputBuffer: '',
    lastOutput: '',
    isFirstRun: true
  });

  // Add new state for program execution
  const [executionState, setExecutionState] = useState({
    running: false,
    inputBuffer: '',
    outputBuffer: '',
    pid: null
  });

  // Update needsInput logic to be more sensitive
  const needsInput = useMemo(() => {
    const inputPatterns = [
      'Scanner',
      'System.in',
      'BufferedReader',
      'InputStreamReader',
      'Console.readLine',
      'console.readLine',
      'nextInt',
      'nextLine',
      'nextDouble',
      'nextFloat',
      'nextBoolean',
      'readLine',
      'read',
      'next'
    ];
    const code_lower = code.toLowerCase();
    return inputPatterns.some(pattern => 
      code_lower.includes(pattern.toLowerCase()) || 
      code.includes(pattern)
    );
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

  // Simplified scanner detection
  const hasScanner = useMemo(() => {
    const scannerPatterns = ['Scanner', 'System.in', 'next', 'nextLine', 'nextInt'];
    console.log('Checking for scanner patterns...'); // Debug log
    return scannerPatterns.some(pattern => code.includes(pattern));
  }, [code]);

  // Update executeCode to handle initial run
  const executeCode = useCallback(async () => {
    setIsCompiling(true);
    setTerminalHistory([{ type: 'system', content: '⚡ Compiling program...' }]);
    setExecutionState({
      running: false,
      inputBuffer: '',
      outputBuffer: '',
      pid: null
    });
    
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'java',
          version: '15.0.2',
          files: [{ content: code, name: 'Main.java' }],
          stdin: '',
          compile_timeout: 5000,
          run_timeout: 10000 // Increased timeout
        }),
      });

      const result = await response.json();
      
      if (result.run.stderr) {
        setTerminalHistory(prev => [...prev, 
          { type: 'error', content: result.run.stderr }
        ]);
        setIsCompiling(false);
        return;
      }

      setTerminalHistory(prev => [...prev,
        { type: 'system', content: '✅ Program compiled successfully!' },
        { type: 'system', content: '▶ Running program...' }
      ]);

      // Update execution state
      setExecutionState(prev => ({
        ...prev,
        running: true,
        outputBuffer: result.run.output || ''
      }));

      // Check if program is waiting for input
      if (result.run.output && !result.run.stderr) {
        setTerminalHistory(prev => [...prev, 
          { type: 'output', content: result.run.output }
        ]);
        setIsWaitingForInput(true);
      }

      setIsCompiling(false);
      setIsProgramRunning(true);

    } catch (err) {
      setTerminalHistory(prev => [...prev, 
        { type: 'error', content: 'Execution failed: ' + err.message }
      ]);
      setIsCompiling(false);
    }
  }, [code]);

  // Update handleInput to properly handle stdin
  const handleInput = useCallback(async (inputValue) => {
    if (!inputValue.trim()) return;

    setTerminalHistory(prev => [...prev, { type: 'input', content: inputValue }]);
    
    const newBuffer = executionState.inputBuffer + inputValue + '\n';

    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'java',
          version: '15.0.2',
          files: [{ content: code, name: 'Main.java' }],
          stdin: newBuffer,
          run_timeout: 10000
        }),
      });

      const result = await response.json();
      
      if (result.run.stderr) {
        setTerminalHistory(prev => [...prev, 
          { type: 'error', content: result.run.stderr }
        ]);
        setIsWaitingForInput(false);
        setIsProgramRunning(false);
        return;
      }

      // Get only new output by comparing with previous buffer
      const newOutput = result.run.output.substring(executionState.outputBuffer.length);
      
      if (newOutput.trim()) {
        setTerminalHistory(prev => [...prev, 
          { type: 'output', content: newOutput.trim() }
        ]);
      }

      // Update execution state
      setExecutionState(prev => ({
        ...prev,
        inputBuffer: newBuffer,
        outputBuffer: result.run.output
      }));

      // Check if program needs more input
      const needsMoreInput = result.run.output.endsWith('?') || 
                           result.run.output.toLowerCase().includes('enter') ||
                           code.includes('Scanner');

      setIsWaitingForInput(needsMoreInput);
      setIsProgramRunning(needsMoreInput);

    } catch (err) {
      setTerminalHistory(prev => [...prev, 
        { type: 'error', content: 'Error: ' + err.message }
      ]);
      setIsWaitingForInput(false);
      setIsProgramRunning(false);
    }
  }, [code, executionState]);

  // Handle terminal input submission
  const handleTerminalSubmit = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const input = e.target.value.trim();
      e.target.value = '';
      if (input) {
        handleInput(input);
      }
    }
  }, [handleInput]);

  // Reset and start execution
  const handleExecuteClick = useCallback(() => {
    setTerminalHistory([]);
    setCurrentInputBuffer('');
    setIsWaitingForInput(false);
    setIsProgramRunning(false);
    setIsCompiling(false);
    executeCode();
  }, [executeCode]);

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

  // Update the modal component to be mounted at the document root level
  useEffect(() => {
    if (showInputModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    console.log('Modal visibility:', showInputModal); // Debug log
  }, [showInputModal]);

  // Scroll terminal to bottom whenever history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  return (
    <div className="overflow-x-auto relative"> {/* Add relative here */}
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

        {/* Interactive Terminal */}
        <div className="bg-gray-950/90 rounded-lg border border-gray-800/50 mt-4">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/50">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-400">Interactive Terminal</span>
            </div>
          </div>
          
          <div ref={terminalRef} className="p-4 font-mono text-sm h-[300px] overflow-auto">
            {/* Terminal History */}
            {terminalHistory.map((entry, index) => (
              <div 
                key={index} 
                className={`whitespace-pre-wrap ${
                  entry.type === 'error' ? 'text-red-400' :
                  entry.type === 'input' ? 'text-blue-400' :
                  entry.type === 'system' ? 'text-yellow-400' :
                  'text-gray-300'
                }`}
              >
                {entry.content}
              </div>
            ))}
            
            {/* Input Line */}
            {(isWaitingForInput && !isCompiling) && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-400">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full bg-transparent text-gray-300 outline-none"
                  placeholder="Enter your input..."
                  onKeyDown={handleTerminalSubmit}
                  disabled={!isWaitingForInput || isCompiling}
                  autoFocus
                />
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