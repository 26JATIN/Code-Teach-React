import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [code, setCode] = useState(
`public class Main {
    public static void main(String[] args) {
        // Write your code here
        
    }
}`);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fontSize, setFontSize] = useState(14);

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

  return (
    <div className="space-y-4 bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
      {/* Editor Section */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-sm text-gray-400 ml-2">Main.java</span>
          </div>
          <button
            onClick={handleExecute}
            disabled={isLoading}
            className="px-4 py-1.5 bg-blue-600/80 text-white rounded-md hover:bg-blue-700/80 
                     transition-all duration-200 text-sm font-medium flex items-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 
                     focus:ring-blue-500/50"
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

        {/* Font Size Slider */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm text-gray-400">Font Size:</span>
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-sm text-gray-400">{fontSize}px</span>
        </div>

        <div className="h-[400px] border border-gray-800 rounded-lg overflow-hidden resize-y">
          <Editor
            height="100%"
            defaultLanguage="java"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: fontSize,
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              roundedSelection: false,
              wordWrap: 'on',
              renderLineHighlight: 'all',
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                useShadows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10
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
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/50">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-400">Output Terminal</span>
          </div>
        </div>
        
        <div className="p-4 font-mono text-sm min-h-[100px] max-h-[200px] overflow-auto">
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
  );
};

export default CodeEditor;