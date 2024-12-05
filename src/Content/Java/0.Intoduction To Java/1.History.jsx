import React from 'react';
import NextButton from '../../Components/NextButton';

const History = ({ nextModule, onNext }) => {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-gray-100 mb-4">History of Java</h1>
        
        <div className="space-y-4">
          {/* Birth of Java */}
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <h2 className="text-xl text-gray-100 mb-2">🌟 The Birth of Java (1991)</h2>
            <p className="text-gray-300">
              It all started when <span className="text-yellow-400 font-medium">James Gosling</span> and his team at 
              <span className="text-blue-400 font-medium"> Sun Microsystems</span> began creating a language for digital devices 
              like TVs and set-top boxes. They called this project <span className="text-green-400">"Green Project"</span>.
            </p>
          </div>

          {/* Why Java Was Created */}
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <h2 className="text-xl text-gray-100 mb-2">🎯 Why Was Java Created?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>To be <span className="text-blue-400 font-medium">simple and easy</span> to learn</li>
              <li>To be <span className="text-blue-400 font-medium">secure and portable</span> (run anywhere)</li>
              <li>To be <span className="text-blue-400 font-medium">object-oriented</span></li>
              <li>To be <span className="text-blue-400 font-medium">robust and durable</span></li>
            </ul>
          </div>

          {/* Evolution Timeline */}
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <h2 className="text-xl text-gray-100 mb-2">📅 Key Moments</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-mono">1995</span>
                <p className="text-gray-300">First public version of Java was released</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-mono">1996</span>
                <p className="text-gray-300">JDK 1.0 released with the promise: "Write Once, Run Anywhere"</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-mono">2010</span>
                <p className="text-gray-300">Oracle bought Sun Microsystems and took over Java</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-mono">Today</span>
                <p className="text-gray-300">Java is one of the world's most popular programming languages</p>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <h2 className="text-xl text-gray-100 mb-2">🎈 Fun Facts</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-400">☕</span>
                <p className="text-gray-300">Java's logo is a coffee cup because Java island is known for its coffee!</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">📱</span>
                <p className="text-gray-300">Android apps are primarily written in Java</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">🎮</span>
                <p className="text-gray-300">Minecraft was originally written in Java</p>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
            <h2 className="text-xl text-blue-100 mb-2">📚 Quick Summary</h2>
            <p className="text-gray-300">
              Java was created to be a <span className="text-blue-400 font-medium">simple</span>, 
              <span className="text-blue-400 font-medium"> portable</span>, and 
              <span className="text-blue-400 font-medium"> secure</span> programming language. 
              From TV boxes to Android phones, from web applications to games, Java has grown to 
              become one of the most versatile and widely-used programming languages in the world.
            </p>
          </div>
        </div>
      </section>
      
      {/* Add Next Button */}
      <NextButton nextModule={nextModule} onNext={onNext} />
    </div>
  );
};

export default History;
