import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const IfElseStatement = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicStructure: {
      title: '🏗️ If-Else Structure',
      code: `public class IfElseStructure {
    public static void main(String[] args) {
        // Basic if-else statement structure
        if (condition) {
            // Code to execute if condition is true
        } else {
            // Code to execute if condition is false
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    simpleExample: {
      title: '👶 Simple Example',
      code: `public class AgeCheck {
    public static void main(String[] args) {
        int age = 15;
        
        if (age >= 18) {
            System.out.println("You are an adult!");
        } else {
            System.out.println("You are a minor!");
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    practicalExample: {
      title: '🎯 Practical Example',
      code: `public class GradeChecker {
    public static void main(String[] args) {
        int score = 75;
        
        if (score >= 50) {
            System.out.println("Pass! 🎉");
        } else {
            System.out.println("Try again! 💪");
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    }
  };

  const mcqQuestions = [
    {
      id: 1,
      question: "In an if-else statement, when is the else block executed?",
      options: [
        "When the if condition is true",
        "When the if condition is false",
        "Always executed regardless of condition",
        "Never executed"
      ],
      correctAnswer: 1,
      explanation: "The else block only executes when the if condition evaluates to false. This provides an alternative path for the code execution."
    },
    {
      id: 2,
      question: "What happens if you omit the curly braces {} in an if-else statement with multiple lines?",
      options: [
        "All lines will be executed",
        "Only the first line after if/else will be considered part of the block",
        "The code won't compile",
        "The code will throw an error at runtime"
      ],
      correctAnswer: 1,
      explanation: "Without curly braces, only the first line after if/else is considered part of the conditional block. It's recommended to always use curly braces to avoid confusion."
    }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        If-Else Statements in Java 🔄
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          If-else statements extend the if statement by providing an alternative path when the condition is false. 
          Think of it as having a Plan B! 🎯
        </p>
      </div>

      {/* Essential Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Key Components 📌</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>If Block (primary path)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔄</span>
              <span>Else Block (alternative path)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Condition (decides the path)</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Remember 🤔</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">✨</span>
              <span>Only one block executes</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎨</span>
              <span>Else is optional</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <span>Use {} for multiple statements</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Structure and Examples 🏗️</h2>
        <CodeSnippet {...examples.basicStructure} />
        <CodeSnippet {...examples.simpleExample} />
        <CodeSnippet {...examples.practicalExample} />
      </section>

      {/* MCQ Sections */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-purple-400">Check Your Understanding 🤓</h2>
        {mcqQuestions.map((question, index) => (
          <MCQ
            key={question.id}
            question={question}
            selectedAnswer={selectedAnswers[question.id]}
            onAnswerSelect={handleAnswerSelect}
          />
        ))}
      </section>

      {/* Practice Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Practice Time! 💻</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <p className="text-gray-300 mb-4">
            Write a program that checks if a number is even or odd using if-else statement.
          </p>
          <CodeEditor 
            defaultCode={`public class EvenOddChecker {
    public static void main(String[] args) {
        int number = 7;
        
        // Write your if-else statement here
        
    }
}`} 
          />
        </div>
      </section>

      {/* Common Mistakes */}
      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        <h3 className="text-lg font-medium text-red-400 mb-2">⚠️ Watch Out For:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Don't put semicolon after if condition</li>
          <li>Always match each else with the nearest if</li>
          <li>Use proper indentation for readability</li>
          <li>Don't forget curly braces for multiple statements</li>
        </ul>
      </div>
    </div>
  );
};

export default IfElseStatement;
