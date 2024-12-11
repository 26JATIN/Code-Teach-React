import React from 'react';
import NextButton from '../../Components/Interface Components/NextButton';

const ProgramFlowchart = () => (
  <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 600 300">
    {/* Boxes with improved visibility */}
    <rect x="240" y="20" width="120" height="40" rx="5" fill="#2563eb" opacity="0.3" stroke="#2563eb"/>
    <rect x="240" y="100" width="120" height="40" rx="5" fill="#2563eb" opacity="0.2" stroke="#2563eb"/>
    <path d="M300 180 L260 220 L340 220 Z" fill="#9333ea" opacity="0.2" stroke="#9333ea"/>
    <rect x="140" y="240" width="120" height="40" rx="5" fill="#2563eb" opacity="0.2" stroke="#2563eb"/>
    <rect x="340" y="240" width="120" height="40" rx="5" fill="#2563eb" opacity="0.2" stroke="#2563eb"/>

    {/* Arrows */}
    <path d="M300 60 L300 100" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M300 140 L300 180" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M300 220 L200 240" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M300 220 L400 240" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    {/* Arrow Marker Definition */}
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#4f46e5"/>
      </marker>
    </defs>

    {/* Text */}
    <text x="300" y="45" textAnchor="middle" fill="#fff" className="text-sm font-semibold">Input</text>
    <text x="300" y="125" textAnchor="middle" fill="#fff">Process</text>
    <text x="300" y="205" textAnchor="middle" fill="#fff">Decision</text>
    <text x="200" y="265" textAnchor="middle" fill="#fff">Action 1</text>
    <text x="400" y="265" textAnchor="middle" fill="#fff">Action 2</text>
  </svg>
);

const WhatIsAProgram = ({ nextModule, onNext }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        What is a Program? 🚀
      </h1>

      <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Imagine you're teaching a friendly robot to make your favorite sandwich! 🤖🥪 
          That's exactly what programming is - giving clear, step-by-step instructions to a computer. 
          Every click, swipe, or tap on your phone or computer is actually running a program behind the scenes!
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Let's Visualize How a Program Works! 📊
        </h2>
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <ProgramFlowchart />
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-semibold">The Three Superpowers of Programming 💫</h2>
      
      <div className="space-y-6 mt-4">
        {/* Adding smooth transitions and better hover effects */}
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20 
            transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10">
          <h3 className="text-xl font-medium text-blue-400 mb-3">📝 Instructions (The Recipe)</h3>
          <p className="text-gray-300">
            Just like when you're following a dance tutorial:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-300">
            <li>Step 1: Move your right foot forward</li>
            <li>Step 2: Spin around once</li>
            <li>Step 3: Clap your hands</li>
          </ul>
          <p className="mt-3 text-gray-300">
            Programs work the same way! They follow precise instructions one at a time.
          </p>
        </div>
        
        {/* Apply similar transitions to other sections */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-700/10 rounded-xl border border-green-500/20 
            transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/10">
          <h3 className="text-xl font-medium text-green-400 mb-3">📦 Data (The Ingredients)</h3>
          <p className="text-gray-300">
            Think of data like the ingredients in your recipe. It's the information your program 
            works with - numbers, text, images, or anything else your program needs to do its job.
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20 
            transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10">
          <h3 className="text-xl font-medium text-purple-400 mb-3">🧠 Logic (The Decision-Making)</h3>
          <p className="text-gray-300">
            This is like the decision-making in cooking - "if the water is boiling, add the pasta". 
            In programs, we tell the computer how to make decisions and what to do in different situations.
          </p>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-xl font-medium text-yellow-400 mb-3">👋 Let's Try It Together!</h3>
        <p className="text-gray-300">
          Think about making a simple calculator program:
        </p>
        <div className="mt-4 space-y-2 text-gray-300">
          <div className="flex items-center space-x-2">
            <span>Instructions:</span> Add two numbers
          </div>
          <div className="flex items-center space-x-2">
            <span>Data:</span> The numbers 5 and 3
          </div>
          <div className="flex items-center space-x-2">
            <span>Logic:</span> If both are numbers, add them; if not, show error
          </div>
          <div className="flex items-center space-x-2">
            <span>Result:</span> 5 + 3 = 8
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
        <h3 className="text-xl font-medium text-green-400 mb-3">🎮 Real-World Examples</h3>
        <div className="space-y-4 text-gray-300">
          <p>Here are some everyday programs you might use:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Instagram filters (transforming your photos)</li>
            <li>Calculator app (processing numbers)</li>
            <li>Weather app (showing forecasts)</li>
            <li>Games (responding to your controls)</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <div></div>
        <NextButton nextModule={nextModule} onNext={onNext} />
      </div>
    </div>
  );
};

export default WhatIsAProgram;
