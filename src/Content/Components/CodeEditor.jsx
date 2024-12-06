import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [code, setCode] = useState(
`public class Main {
    public static void main(String[] args) {
        // Write your code here
    }
}`);  // Removed extra spacing after the template
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fontSize, setFontSize] = useState(14);
  // eslint-disable-next-line no-unused-vars
  const [lineCount, setLineCount] = useState(0);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const LINE_HEIGHT_FACTOR = 1.5; // line height multiplier for better spacing
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Set initial line count
    const initialLines = code.split('\n').length;
    setLineCount(initialLines);

    // Setup resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [code]); // Added code as a dependency

  const calculateEditorHeight = () => {
    const baseLineHeight = fontSize * LINE_HEIGHT_FACTOR;
    const maxLines = 20;
    const padding = 16; // top and bottom padding combined
    const actualLines = code.split('\n').length;
    
    // Calculate height based on actual number of lines
    const calculatedHeight = actualLines * baseLineHeight + padding;
    
    // Don't enforce minimum height, let it be exact
    return Math.min(calculatedHeight, maxLines * baseLineHeight + padding);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    // Update line count on mount
    setLineCount(code.split('\n').length);
  };

  const handleExecute = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'java',
          version: '15.0.2',
          files: [{
            content: code,
          }],
        }),
      });

      const data = await response.json();
      setOutput(data.run.output || data.run.stderr);
    } catch (err) {
      setError('Failed to execute code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorChange = (value) => {
    setCode(value);
    const lines = (value || '').split('\n').length;
    setLineCount(lines);
  };

  const handleCopy = async () => {
    try {
      // Get the current value from editor instance
      const currentCode = editorRef.current.getValue();
      await navigator.clipboard.writeText(currentCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      setCopySuccess(false);
    }
  };

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
              <button
                onClick={handleCopy}
                className="px-3 py-1 sm:py-1.5 bg-gray-700/50 text-white rounded-md hover:bg-gray-600/50 
                       transition-all duration-200 text-xs sm:text-sm font-medium flex items-center gap-2
                       focus:outline-none focus:ring-2 focus:ring-gray-500/50 w-full sm:w-auto justify-center"
                title="Copy code"
              >
                {copySuccess ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                onClick={handleExecute}
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
            style={{ height: `${calculateEditorHeight()}px` }}
          >
            <Editor
              height="100%"
              defaultLanguage="java"
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: Math.max(12, fontSize - (window.innerWidth < 640 ? 2 : 0)),
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                roundedSelection: false,
                wordWrap: 'off', // Changed to allow horizontal scrolling in editor
                renderLineHighlight: 'all',
                lineHeight: Math.round(fontSize * LINE_HEIGHT_FACTOR),
                padding: { top: 8, bottom: 8 },
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
              }}
            />
          </div>
        </div>

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

export default CodeEditor;