import React from 'react';
import NextButton from '../../Components/NextButton';
import CodeEditor from '../../Components/CodeEditor';
const TopicsCovered = ({ nextModule }) => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-4">Master Java Programming: Your Complete Learning Path 🎯</h1>

      <p className="text-gray-300 mb-6">
        Embark on a comprehensive journey into Java programming! This carefully structured course 
        combines theory with hands-on practice, taking you from basic concepts to professional-level 
        programming. Whether you're aiming to build applications, understand enterprise systems, or 
        prepare for a coding career, we've got you covered.
      </p>

      <div className="grid gap-6">
        {/* Foundations */}
        <section className="p-5 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
          <h2 className="text-xl text-blue-400 mb-3">1. Java Foundations</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Introduction to Java and Its Ecosystem
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Setting Up Development Environment (JDK, IDE)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Understanding Java Virtual Machine (JVM)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Writing and Running Your First Program
            </li>
          </ul>
        </section>

        {/* Core Java Concepts */}
        <section className="p-5 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
          <h2 className="text-xl text-blue-400 mb-3">2. Core Java Programming</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Variables, Data Types, and Type Conversion
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Operators and Control Structures
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Arrays and Collections Framework
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              String Manipulation and Regular Expressions
            </li>
          </ul>
        </section>

        {/* OOP Concepts */}
        <section className="p-5 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
          <h2 className="text-xl text-blue-400 mb-3">3. Object-Oriented Programming</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Classes, Objects, and Constructors
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Inheritance and Interface Implementation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Polymorphism and Abstract Classes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Encapsulation and Package Management
            </li>
          </ul>
        </section>

        {/* Advanced Features */}
        <section className="p-5 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
          <h2 className="text-xl text-blue-400 mb-3">4. Advanced Java Features</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Exception Handling and Custom Exceptions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Generics and Collections Framework
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Multi-threading and Concurrency
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Lambda Expressions and Stream API
            </li>
          </ul>
        </section>

        {/* Practical Skills */}
        <section className="p-5 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
          <h2 className="text-xl text-blue-400 mb-3">5. Practical Programming</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              File I/O Operations and NIO
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Database Connectivity (JDBC)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Unit Testing with JUnit
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">▪</span>
              Best Practices and Design Patterns
            </li>
          </ul>
        </section>
      </div>

      <div className="bg-blue-900/20 p-4 rounded-lg mt-6 border border-blue-800/30">
        <p className="text-blue-200">
          👉 Each topic includes hands-on exercises, coding challenges, and real-world examples to 
          reinforce your learning. Get ready to build a strong foundation in Java programming!
        </p>
      </div>
        <CodeEditor/>
      <NextButton nextModule={nextModule} />
    </div>
  );
};

export default TopicsCovered;
