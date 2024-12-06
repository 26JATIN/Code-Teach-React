import React from 'react';
import NextButton from '../../Components/NextButton';

const HowDoesAProgramWork = ({ nextModule, onNext }) => {
  return (
    <div>
      <h1>How Does a Program Work? 🔄</h1>

      <p className="text-gray-300">
        Imagine you're trying to tell a story to someone who speaks a different language. You'd 
        need a translator, right? That's exactly what happens when your program runs! Your computer 
        needs to translate your human-friendly code into its own language.
      </p>

      <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <p className="text-gray-300">
          💡 <span className="font-medium">Think About It:</span> Your computer only understands 1s and 0s, 
          but we don't want to write programs like "01001000 01100101 01101100 01101100 01101111"! 
          That's why we use languages like Java that are easier for humans to understand.
        </p>
      </div>

      <h2 className="mt-8">The Journey of Your Program 🚀</h2>
      <div className="mt-4 space-y-4">
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <h3 className="text-lg font-medium text-blue-400 mb-2">1. Writing Your Code ✍️</h3>
          <p className="text-gray-300">
            This is like writing a letter in your language (Java). It's readable and makes sense to you:
            <code className="block mt-2 p-2 bg-gray-900/50 rounded">
              System.out.println("Hello!");
            </code>
          </p>
        </div>

        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <h3 className="text-lg font-medium text-green-400 mb-2">2. The Translation Magic 🔄</h3>
          <p className="text-gray-300">
            Your computer translates this into its language (machine code). It's like converting your 
            letter into a secret code:
            <code className="block mt-2 p-2 bg-gray-900/50 rounded">
              01001000 01100101 01101100 01101100 01101111
            </code>
          </p>
        </div>

        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <h3 className="text-lg font-medium text-purple-400 mb-2">3. Running Your Program 🏃‍♂️</h3>
          <p className="text-gray-300">
            Now the computer reads and follows these instructions one by one, super fast! It's like 
            a super-efficient robot following your commands at lightning speed.
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <h3 className="text-lg font-medium text-blue-400 mb-2">Why It's Cool 🌟</h3>
        <p className="text-gray-300">
          This process happens billions of times every second in your computer! Every button you click, 
          every character you type, every game you play - it's all just your computer following these 
          translated instructions.
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <div></div>
        <NextButton nextModule={nextModule} onNext={onNext} />
      </div>
    </div>
  );
};

export default HowDoesAProgramWork;
