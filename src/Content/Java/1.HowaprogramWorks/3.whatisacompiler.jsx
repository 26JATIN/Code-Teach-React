import React from 'react';
import NextButton from '../../Components/NextButton';

const WhatIsCompiler = ({ nextModule, onNext }) => {
  const simpleCode = `System.out.println("Hello");
System.out.println("World");`;

  const machineCode = `010101110110010101101100
011000110110111101101101
0110010100100001`;

  return (
    <div className="space-y-6">
      <h1>What is a Compiler? 🔄</h1>

      <div className="space-y-4">
        <p>A compiler is like a translator that converts your entire code into machine language all at once before running it.</p>

        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-blue-400 mb-4">How Compilation Works</h3>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gray-700/50 p-3 rounded w-full">
              <p className="text-green-400 mb-2">Your Code:</p>
              <pre className="bg-black/30 p-2 rounded">{simpleCode}</pre>
            </div>

            <div className="text-yellow-400">⬇️ Compiler Translates Everything at Once</div>

            <div className="bg-gray-700/50 p-3 rounded w-full">
              <p className="text-green-400 mb-2">Machine Code:</p>
              <pre className="bg-black/30 p-2 rounded text-xs">{machineCode}</pre>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-blue-400 mb-2">Key Points About Compilers:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Translates entire code at once</li>
            <li>Creates executable file</li>
            <li>Faster execution</li>
            <li>Examples: Java Compiler (javac), C++ Compiler (g++)</li>
          </ul>
        </div>
      </div>

      <NextButton nextModule={nextModule} onNext={onNext} />
    </div>
  );
};

export default WhatIsCompiler;
