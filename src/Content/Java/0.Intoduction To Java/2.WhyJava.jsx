import React from 'react';
import NextButton from '../../Components/NextButton';

// Feature card component for better organization
const FeatureCard = ({ emoji, title, description }) => (
  <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/50">
    <div className="flex items-start gap-3">
      <span className="text-2xl">{emoji}</span>
      <div>
        <h3 className="text-yellow-400 font-medium mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const WhyJava = ({ nextModule, onNext }) => {
  return (
    <div className="space-y-8">
      {/* Friendly Introduction */}
      <section>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Why Should You Learn Java? 🤔
        </h1>
        
        <div className="p-6 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl border border-orange-500/20">
          <p className="text-lg text-gray-200 leading-relaxed">
            Hey there! 👋 Wondering why you should pick Java as your first programming language? 
            Let's break it down in the simplest way possible!
          </p>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
          The Amazing Things About Java 🌟
        </h2>

        <div className="grid gap-4">
          <FeatureCard
            emoji="🎯"
            title="Easy to Learn"
            description="Java uses simple English-like commands. If you can say 'print this' or 'add these numbers', 
            you can write Java! It's like learning to cook with a very clear recipe book."
          />

          <FeatureCard
            emoji="🌍"
            title="Works Everywhere"
            description="Write your code once, and it works on phones, computers, and even smart TVs! 
            It's like having a universal remote that works with everything."
          />

          <FeatureCard
            emoji="🛡️"
            title="Safe and Secure"
            description="Java helps prevent common mistakes that could break your program. 
            It's like having a safety net while learning to ride a bike."
          />

          <FeatureCard
            emoji="🤝"
            title="Huge Community"
            description="Millions of developers use Java! When you're stuck, you can easily find help online. 
            It's like having a big group of friends ready to help you out."
          />
        </div>
      </section>

      {/* Real-World Examples */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
          What Can You Build With Java? 🚀
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-700/30">
            <h3 className="text-xl text-blue-400 font-medium mb-3">📱 Mobile Apps</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Instagram</li>
              <li>• Spotify</li>
              <li>• Netflix</li>
              <li>• And many other Android apps!</li>
            </ul>
          </div>

          <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-700/30">
            <h3 className="text-xl text-purple-400 font-medium mb-3">🎮 Games</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Minecraft</li>
              <li>• Online multiplayer games</li>
              <li>• Educational games</li>
              <li>• Mobile games</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Java is Perfect for Beginners */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
          Why Beginners Love Java 💝
        </h2>

        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
            <h3 className="text-xl text-green-400 font-medium mb-3">🎓 Learning Curve</h3>
            <p className="text-gray-300 leading-relaxed">
              Java is like learning to drive an automatic car:
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>Starts with basic concepts</li>
                <li>Clear rules to follow</li>
                <li>Lots of helpful error messages</li>
                <li>Great documentation and tutorials</li>
              </ul>
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
            <h3 className="text-xl text-purple-400 font-medium mb-3">💼 Job Opportunities</h3>
            <p className="text-gray-300 leading-relaxed">
              Learning Java can lead to many exciting careers:
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>Mobile App Developer</li>
                <li>Software Engineer</li>
                <li>Game Developer</li>
                <li>Web Developer</li>
              </ul>
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started Tips */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
          Ready to Start? 🎉
        </h2>

        <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
          <div className="space-y-4 text-gray-300">
            <p>Here's what makes Java great for your coding journey:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Start with simple "Hello, World!" programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Build up to more complex applications step by step</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Practice with fun projects like games and calculators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Join a community of millions of Java developers</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation Button */}
      <div className="flex justify-end">
        <NextButton nextModule={nextModule} onNext={onNext} />
      </div>
    </div>
  );
};

export default WhyJava;
