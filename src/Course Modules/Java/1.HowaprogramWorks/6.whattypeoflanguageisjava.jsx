import React from 'react';
import CodeExample from '../../../Frontend/Components/Code Components/CodeEditor';

const WhatTypeOfLanguageIsJava = () => {
  const simpleExample = `public class Main {
    public static void main(String[] args) {
        // This is a simple Java program
        System.out.println("Welcome to Java!");
        
        // Simple calculation
        int result = 10 + 5;
        System.out.println("10 + 5 = " + result);
    }
}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        What Type of Language is Java? ☕
      </h1>

      <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Java is like a Swiss Army knife of programming languages - it's versatile, reliable, and 
          designed to help you build almost anything! Let's explore what makes Java special. 🚀
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">High-Level Language 📝</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Easy to read and write</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📚</span>
              <span>Similar to English</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🛠️</span>
              <span>Handles complex tasks automatically</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Object-Oriented 🎨</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📦</span>
              <span>Organizes code into objects</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔄</span>
              <span>Reusable components</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🏗️</span>
              <span>Models real-world things</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-700/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Platform Independent 🌐</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">💻</span>
              <span>Runs anywhere</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔒</span>
              <span>Secure by design</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🚀</span>
              <span>Write once, run anywhere</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Let's Write Some Java! 💫</h2>
        <p className="text-gray-300 mb-4">Here's a simple Java program to get started:</p>
        <CodeExample defaultCode={simpleExample} />
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
          <p className="text-gray-300">
            This is a basic Java program. Don't worry if some parts look confusing! 
            We'll learn about object-oriented programming concepts like classes and methods 
            in detail later in the course. 🎓
          </p>
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-blue-400 font-medium">Coming Up Next! 📚</p>
            <p className="text-gray-300 text-sm mt-1">
              We'll dive deep into object-oriented programming concepts like classes, objects, 
              methods, and more in our OOP section of the course.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-blue-700/10 rounded-xl border border-indigo-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Java's Special Features ✨</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start space-x-3">
              <span className="text-2xl">🔄</span>
              <div>
                <p className="font-medium text-blue-400">Automatic Memory Management</p>
                <p className="text-sm">No need to manually manage memory</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="font-medium text-blue-400">Strong Type Safety</p>
                <p className="text-sm">Catches errors before running</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">📚</span>
              <div>
                <p className="font-medium text-blue-400">Rich Standard Library</p>
                <p className="text-sm">Lots of built-in functionality</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Where Java Shines 🌟</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start space-x-3">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-medium text-purple-400">Android Apps</p>
                <p className="text-sm">Primary language for Android development</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">💼</span>
              <div>
                <p className="font-medium text-purple-400">Enterprise Software</p>
                <p className="text-sm">Powers many business applications</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">🎮</span>
              <div>
                <p className="font-medium text-purple-400">Game Development</p>
                <p className="text-sm">Used in games like Minecraft</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhatTypeOfLanguageIsJava;
