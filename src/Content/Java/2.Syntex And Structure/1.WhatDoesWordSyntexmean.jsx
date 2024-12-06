import React from 'react';

const WhatDoesWordSyntexmean = ({ nextModule, onNext }) => {
  return (
    <div>
      <h1>Understanding Java Syntax 🤔</h1>

      <p>
        Syntax in programming refers to the set of rules that define how Java programs must be written. 
        These rules ensure that the code is valid and can be properly interpreted by the Java compiler.
      </p>

      <div className="bg-blue-900/20 p-4 rounded-lg my-6">
        <h3 className="text-blue-400 mb-2">📝 Basic Rules</h3>
        <p className="text-gray-300">
          Java follows strict syntactical rules that govern everything from statement termination 
          to code block structure and naming conventions.
        </p>
      </div>

      <h2>Key Aspects of Java Syntax ✨</h2>
      <ul className="space-y-4">
        <li>
          <span className="text-blue-400">🏗️ Structure</span><br/>
          Java code must be organized within classes and methods
        </li>
        <li>
          <span className="text-blue-400">📋 Statement Rules</span><br/>
          Each instruction must follow specific formatting and punctuation rules
        </li>
        <li>
          <span className="text-blue-400">👀 Readability</span><br/>
          Consistent syntax makes code maintainable and easier to debug
        </li>
      </ul>

      <div className="mt-8">
        <h2>Syntax Example 💡</h2>
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <p className="text-green-400 mb-2">Valid syntax:</p>
          <code>System.out.println("Hello!");</code>
          
          <p className="text-red-400 mt-4 mb-2">Invalid syntax:</p>
          <code>System.out.println("Hello")</code>
          <p className="text-gray-400 text-sm mt-2">Missing semicolon - a common syntax error</p>
        </div>
      </div>

      <div className="bg-yellow-900/20 p-4 rounded-lg my-6">
        <h3 className="text-yellow-400 mb-2">💡 Pro Tip</h3>
        <p className="text-gray-300">
          Modern IDEs help identify syntax errors in real-time, making it easier to write correct code.
        </p>
      </div>

      {nextModule && (
        <div className="mt-8">
          <button
            onClick={() => onNext(nextModule.moduleId, nextModule.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next: Let's Learn Java Syntax! →
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatDoesWordSyntexmean;
