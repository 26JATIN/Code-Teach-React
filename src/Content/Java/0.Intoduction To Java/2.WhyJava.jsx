import React from 'react';
import NextButton from '../../Components/NextButton';

const WhyJava = ({ nextModule, onNext }) => {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-gray-100 mb-4">Why Choose Java? 🤔</h1>
        
        <div className="space-y-4">
          {/* Simple Intro */}
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <p className="text-gray-300">
              Think of Java as a super helpful friend who: 
              <ul className="mt-3 space-y-2 list-none">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Works everywhere (phones, computers, even fridges!)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Is really popular (lots of jobs available)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Has simple rules that make sense
                </li>
              </ul>
            </p>
          </div>

          {/* Cool Features */}
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <h2 className="text-xl text-gray-100 mb-3">🌟 What Makes Java Cool?</h2>
            
            <div className="space-y-4">
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-2">👉 It's Like Building with Legos</h3>
                <p className="text-gray-300">
                  Java lets you build big things using small, reusable pieces - just like Legos! 
                  This makes coding easier and more fun.
                </p>
              </div>

              <div className="p-3 bg-gray-900/50 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-2">👉 Runs Everywhere</h3>
                <p className="text-gray-300">
                  Write your code once, and it works on any device - phones, computers, 
                  tablets, everything! It's like having a universal language.
                </p>
              </div>

              <div className="p-3 bg-gray-900/50 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-2">👉 Lots of Help Available</h3>
                <p className="text-gray-300">
                  Stuck? No problem! Java has a huge community of friendly helpers and 
                  tons of free learning resources.
                </p>
              </div>
            </div>
          </div>

          {/* Real World Examples */}
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <h2 className="text-xl text-gray-100 mb-3">🌎 Where Is Java Used?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-900/50 rounded-lg flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className="text-yellow-400 font-medium">Android Apps</h3>
                  <p className="text-gray-300 text-sm">Instagram, Spotify, and many more!</p>
                </div>
              </div>

              <div className="p-3 bg-gray-900/50 rounded-lg flex items-start gap-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <h3 className="text-yellow-400 font-medium">Games</h3>
                  <p className="text-gray-300 text-sm">Minecraft and many other games</p>
                </div>
              </div>

              <div className="p-3 bg-gray-900/50 rounded-lg flex items-start gap-3">
                <span className="text-2xl">💻</span>
                <div>
                  <h3 className="text-yellow-400 font-medium">Desktop Apps</h3>
                  <p className="text-gray-300 text-sm">Tools you use every day</p>
                </div>
              </div>

              <div className="p-3 bg-gray-900/50 rounded-lg flex items-start gap-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <h3 className="text-yellow-400 font-medium">Websites</h3>
                  <p className="text-gray-300 text-sm">Many big websites use Java</p>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started Box */}
          <div className="p-4 bg-green-900/20 rounded-lg border border-green-700/30">
            <h2 className="text-xl text-green-100 mb-2">🚀 Ready to Start?</h2>
            <p className="text-gray-300">
              Don't worry about being perfect! Everyone starts somewhere, and Java is a 
              great first language. It's like learning to ride a bike - start slow, 
              practice regularly, and you'll be coding awesome stuff in no time!
            </p>
          </div>
        </div>
      </section>
      
      {/* Add Next Button */}
      <NextButton nextModule={nextModule} onNext={onNext} />
    </div>
  );
};

export default WhyJava;
