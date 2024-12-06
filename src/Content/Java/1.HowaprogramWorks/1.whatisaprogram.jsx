import React from 'react';
import NextButton from '../../Components/NextButton';

const WhatIsAProgram = ({ nextModule, onNext }) => {
  return (
    <div>
      <h1>What is a Program? 🤔</h1>

      <p className="text-gray-300">
        Think of a program like a cooking recipe, but instead of teaching someone how to cook, 
        you're teaching your computer how to do something! Just as a recipe has steps to follow, 
        a program is a set of instructions that tells your computer exactly what to do.
      </p>

      <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <p className="text-gray-300">
          💡 <span className="font-medium">Fun Fact:</span> Even when you click a button or type something, 
          you're actually running a tiny program! Your computer follows thousands of instructions every 
          second to make things happen on your screen.
        </p>
      </div>

      <h2 className="mt-8">The Three Magic Ingredients of Every Program 🎯</h2>
      <div className="space-y-4 mt-4">
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <h3 className="text-lg font-medium text-blue-400 mb-2">📝 Instructions</h3>
          <p className="text-gray-300">
            Just like a recipe tells you "chop the onions" or "boil the water", a program tells the 
            computer what to do step by step. These could be simple things like "show this text" or 
            "add these numbers".
          </p>
        </div>

        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <h3 className="text-lg font-medium text-green-400 mb-2">📦 Data</h3>
          <p className="text-gray-300">
            Think of data like the ingredients in your recipe. It's the information your program 
            works with - numbers, text, images, or anything else your program needs to do its job.
          </p>
        </div>

        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <h3 className="text-lg font-medium text-purple-400 mb-2">🧠 Logic</h3>
          <p className="text-gray-300">
            This is like the decision-making in cooking - "if the water is boiling, add the pasta". 
            In programs, we tell the computer how to make decisions and what to do in different situations.
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <h3 className="text-lg font-medium text-orange-400 mb-2">Why Understanding This Matters 🎯</h3>
        <p className="text-gray-300">
          Every amazing app or game you've used started with these basic concepts. Whether it's 
          Instagram, Minecraft, or a simple calculator - they're all just programs following 
          instructions, working with data, and making decisions!
        </p>
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <h3 className="text-lg font-medium text-blue-400 mb-2">Remember 🌟</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Programs are just step-by-step instructions (like a recipe)</li>
          <li>They need to be super clear (computers can't guess what you mean)</li>
          <li>Start simple - even complex programs are built from simple instructions</li>
        </ul>
      </div>

      <div className="mt-8 flex justify-between">
        <div></div>
        <NextButton nextModule={nextModule} onNext={onNext} />
      </div>
    </div>
  );
};

export default WhatIsAProgram;
