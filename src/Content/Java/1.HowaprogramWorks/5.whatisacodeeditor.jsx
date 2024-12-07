import React from 'react';
import NextButton from '../../Components/NextButton';
import CodeEditor from '../../Components/CodeEditor';

const WhatIsCodeEditor = ({ nextModule, onNext }) => {
  const simpleExample = `public class HelloWorld {
    public static void main(String[] args) {
        // Try changing this message!
        System.out.println("Hello, Programmer!");
    }
}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        What is a Code Editor? 🖥️
      </h1>

      <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Think of a code editor as your programming workshop - it's like Microsoft Word, but with 
          superpowers specifically designed for writing code! Let's explore what makes it special. ✨
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-blue-700/10 rounded-xl border border-indigo-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Smart Features 🧠</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎨</span>
              <span>Syntax highlighting makes code easier to read</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">💡</span>
              <span>Auto-completion suggests code as you type</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🐞</span>
              <span>Error detection finds mistakes instantly</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-700/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Helpful Tools 🛠️</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📏</span>
              <span>Line numbers help track code location</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔍</span>
              <span>Search and replace across files</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Keyboard shortcuts speed up coding</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-purple-500/10 to-indigo-700/10 rounded-xl border border-purple-500/20">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">Try It Yourself! 🎯</h2>
        <p className="text-gray-300 mb-4">Here's a live code editor - try editing the message and run the code:</p>
        <CodeEditor defaultCode={simpleExample} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
          <h3 className="text-xl font-medium text-yellow-400 mb-3">Popular Java Editors 🌟</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">💼</span>
              <div>
                <p className="font-medium text-yellow-400">IntelliJ IDEA</p>
                <p className="text-sm">Professional IDE with powerful features</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🌓</span>
              <div>
                <p className="font-medium text-yellow-400">Eclipse</p>
                <p className="text-sm">Popular free and open-source option</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="font-medium text-yellow-400">VS Code</p>
                <p className="text-sm">Lightweight and versatile editor</p>
                <div className="mt-2 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-blue-400 text-sm font-medium">📚 Our Course Choice!</p>
                  <p className="text-gray-300 text-sm mt-1">
                    We'll be using VS Code throughout this course for its excellent Java support 
                    and beginner-friendly features.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">VS Code Pro Tips 💡</h3>
          <div className="space-y-4">
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <p className="text-yellow-400 font-medium">Essential Shortcuts</p>
              <ul className="mt-2 space-y-2 text-gray-300 text-sm">
                <li className="flex items-center justify-between">
                  <span>Format Code:</span>
                  <code className="bg-gray-900/50 px-2 py-1 rounded">Shift + Alt + F</code>
                </li>
                <li className="flex items-center justify-between">
                  <span>Quick Fix:</span>
                  <code className="bg-gray-900/50 px-2 py-1 rounded">Ctrl + .</code>
                </li>
                <li className="flex items-center justify-between">
                  <span>Find in File:</span>
                  <code className="bg-gray-900/50 px-2 py-1 rounded">Ctrl + F</code>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-gray-800/50 rounded-lg">
              <p className="text-yellow-400 font-medium">Must-Have Extensions</p>
              <ul className="mt-2 space-y-2 text-gray-300 text-sm">
                <li>Extension Pack for Java</li>
                <li>Debugger for Java</li>
                <li>Test Runner for Java</li>
                <li>Project Manager for Java</li>
              </ul>
            </div>

            <div className="p-3 bg-gray-800/50 rounded-lg">
              <p className="text-yellow-400 font-medium">Productivity Features</p>
              <ul className="mt-2 space-y-2 text-gray-300 text-sm">
                <li>IntelliSense code suggestions</li>
                <li>Built-in Git integration</li>
                <li>Live code sharing</li>
                <li>Integrated terminal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <div></div>
        <NextButton nextModule={nextModule} onNext={onNext} />
      </div>
    </div>
  );
};

export default WhatIsCodeEditor;
