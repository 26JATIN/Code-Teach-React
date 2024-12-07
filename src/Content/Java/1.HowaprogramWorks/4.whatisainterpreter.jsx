import React from 'react';
import NextButton from '../../Components/NextButton';
import CodeSnippet from '../../Components/CodeSnippet';

const WhatIsInterpreter = ({ nextModule, onNext }) => {
  const interpreterSteps = [
    {
      code: 'print("Hello!")',
      execution: 'Reading line 1, translating, executing...',
      output: 'Hello!'
    },
    {
      code: 'x = 5 + 3',
      execution: 'Reading line 2, calculating...',
      output: 'Variable x = 8'
    },
    {
      code: 'if x > 5:\n    print("Big number!")',
      execution: 'Checking condition...',
      output: 'Big number!'
    }
  ];

  const pythonExample = {
    title: 'Python Example',
    code: `# Python (Interpreted)
name = input("What's your name?")
print("Hello, " + name)
age = 25
if age > 18:
    print("You're an adult!")`
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        What is an Interpreter? 🔍
      </h1>

      <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Imagine having a personal translator who translates a foreign language for you in real-time 
          as someone speaks! That's exactly what an interpreter does with your code - it reads, 
          translates, and executes your instructions line by line, right away! 🎭
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-blue-700/10 rounded-xl border border-indigo-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">How an Interpreter Works 🎯</h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400">1️⃣</span>
              <span>Reads one line of code</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400">2️⃣</span>
              <span>Translates it immediately</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400">3️⃣</span>
              <span>Executes that line</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400">4️⃣</span>
              <span>Moves to next line</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-700/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Interpreter Advantages 💪</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔄</span>
              <span>Easy to test and debug</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Instant feedback</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🌐</span>
              <span>Platform independent</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-purple-500/10 to-indigo-700/10 rounded-xl border border-purple-500/20">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">See It In Action! 🎬</h2>
        
        <div className="space-y-4">
          <p className="text-gray-300">Watch how an interpreter handles each line:</p>
          <div className="space-y-4">
            {interpreterSteps.map((step, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <CodeSnippet code={step.code} language="python" />
                <p className="text-yellow-400 text-sm mt-2">{step.execution}</p>
                <p className="text-green-400 text-sm mt-1">➜ {step.output}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-xl font-medium text-yellow-400 mb-3">Real World Example 🌟</h3>
        <p className="text-gray-300 mb-4">Here's a Python program (Python is an interpreted language):</p>
        <CodeSnippet {...pythonExample} language="python" />
      </div>

      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <h3 className="text-xl font-medium text-blue-400 mb-3">Fun Facts! 🎈</h3>
        <div className="space-y-4 text-gray-300">
          <p>
            <span className="text-yellow-400 font-medium">Did you know?</span> JavaScript, Python, and Ruby 
            are some of the most popular interpreted languages!
          </p>
          <p>
            <span className="text-green-400 font-medium">Cool fact:</span> Some languages use both 
            compilation and interpretation! Java compiles to bytecode first, then interprets it. 🤯
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <div></div>
        <NextButton nextModule={nextModule} onNext={onNext} />
      </div>
    </div>
  );
};

export default WhatIsInterpreter;
