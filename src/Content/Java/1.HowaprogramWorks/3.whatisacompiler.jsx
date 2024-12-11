import React from 'react';
import CodeSnippet from '../../Components/Code Components/CodeSnippet';

const WhatIsCompiler = ({ nextModule, onNext }) => {
  const examples = {
    simpleProgram: {
      title: 'Simple Java Program',
      code: `public class Hello {
  public static void main(String[] args) {
    // This is a simple Java program
    System.out.println("Hello");
    System.out.println("World");
  }
}`
    },
    machineCode: {
      title: 'Machine Code Example',
      code: `010010110110010101101100
011011000110111101110111
0100100001100101011000010110010000100001`
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        What is a Compiler? 🔄
      </h1>

      <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Think of a compiler as a master translator that turns your human-friendly code into a language 
          your computer understands. It's like converting a recipe from English to Computer-ese! 🌐
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-blue-700/10 rounded-xl border border-indigo-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">How a Compiler Works 🎯</h3>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-center space-x-2">
              <span className="text-yellow-400">1️⃣</span>
              <span>Reads your entire source code</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-yellow-400">2️⃣</span>
              <span>Analyzes it for errors</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-yellow-400">3️⃣</span>
              <span>Optimizes the code</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-yellow-400">4️⃣</span>
              <span>Generates machine code</span>
            </p>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-700/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Compiler Superpowers 💪</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔍</span>
              <span>Catches errors before running</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Makes programs run faster</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Optimizes code automatically</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-purple-500/10 to-indigo-700/10 rounded-xl border border-purple-500/20">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">The Compilation Journey 🚀</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-400 mb-3">1. Your Source Code</h3>
            <CodeSnippet {...examples.simpleProgram} />
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-yellow-400">Compilation Process</p>
              <div className="h-16 w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-400 mb-3">2. Machine Code Output</h3>
            <CodeSnippet {...examples.machineCode} language="text" />
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-xl font-medium text-yellow-400 mb-3">Types of Compilation 🔄</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-lg font-medium text-blue-400 mb-2">Ahead of Time (AOT)</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Compiles everything before running</li>
              <li>Creates executable files</li>
              <li>Faster program execution</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-lg font-medium text-green-400 mb-2">Just in Time (JIT)</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Compiles during execution</li>
              <li>Optimizes hot code paths</li>
              <li>Used by Java's JVM</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <h3 className="text-xl font-medium text-blue-400 mb-3">Fun Facts! 🌟</h3>
        <div className="space-y-4 text-gray-300">
          <p>
            <span className="text-yellow-400 font-medium">Did you know?</span> The first compiler was 
            developed by Grace Hopper in 1952! She proved that code could be written in a human-friendly 
            way and automatically translated to machine code.
          </p>
          <p>
            <span className="text-green-400 font-medium">Amazing fact:</span> Modern compilers can 
            perform over 200 different types of optimizations on your code! 🤯
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatIsCompiler;
