import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const BasicForLoop = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicSyntax: {
      title: '🎯 Basic For Loop Syntax',
      code: `public class BasicForLoop {
    public static void main(String[] args) {
        // Basic for loop structure
        for (int i = 0; i < 5; i++) {
            System.out.println("Count is: " + i);
        }
        
        /* Loop breakdown:
           initialization: int i = 0
           condition: i < 5
           increment: i++
        */
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    commonPatterns: {
      title: '🌟 Common For Loop Patterns',
      code: `public class LoopPatterns {
    public static void main(String[] args) {
        // Counting down
        for (int i = 10; i > 0; i--) {
            System.out.println(i);
        }
        
        // Step by 2
        for (int i = 0; i <= 10; i += 2) {
            System.out.println(i);
        }
        
        // Multiple variables
        for (int i = 0, j = 10; i < j; i++, j--) {
            System.out.println("i=" + i + ", j=" + j);
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
      question: "Which part of a for loop is optional?",
      options: [
        "Initialization only",
        "Condition only",
        "Increment/Decrement only",
        "All parts are optional"
      ],
      correctAnswer: 3,
      explanation: "All three parts of a for loop (initialization, condition, increment/decrement) are optional in Java."
    },
    {
      id: 2,
      question: "What is the output of: for(int i=0; i<5; i++) { System.out.print(i); }",
      options: [
        "12345",
        "01234",
        "1234",
        "01235"
      ],
      correctAnswer: 1,
      explanation: "The loop prints numbers from 0 to 4, resulting in '01234'."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Basic For Loops in Java 🔄
      </h1>

      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          For loops are one of the most commonly used control structures in Java. 
          They allow you to execute a block of code repeatedly based on a condition. 
          Let's master the basics! 🎯
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Loop Components 🔍</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">1️⃣</span>
              <span>Initialization (start)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">2️⃣</span>
              <span>Condition (continue?)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">3️⃣</span>
              <span>Update (change)</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Common Uses 🎯</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔄</span>
              <span>Iterating specific times</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📦</span>
              <span>Processing arrays</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔍</span>
              <span>Search operations</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Code Examples 💡</h2>
        <CodeSnippet {...examples.basicSyntax} />
        <CodeSnippet {...examples.commonPatterns} />
      </section>

      <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-lg font-medium text-yellow-400 mb-2">⚠️ Common Mistakes</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Using comma instead of semicolon in for loop syntax</li>
          <li>Forgetting to update the loop variable</li>
          <li>Creating infinite loops with wrong conditions</li>
          <li>Using wrong comparison operators</li>
        </ul>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-purple-400">Test Your Knowledge 🤓</h2>
        {mcqQuestions.map((question) => (
          <MCQ
            key={question.id}
            question={question}
            selectedAnswer={selectedAnswers[question.id]}
            onAnswerSelect={(id, answer) => setSelectedAnswers(prev => ({...prev, [id]: answer}))}
          />
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Practice Exercise 💻</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <p className="text-gray-300 mb-4">
            Create a program that prints the first 10 even numbers using a for loop
          </p>
          <CodeEditor 
            defaultCode={`public class EvenNumbers {
    public static void main(String[] args) {
        // Write your for loop here to print first 10 even numbers
        // Expected output: 2 4 6 8 10 12 14 16 18 20
        
    }
}`} 
          />
        </div>
      </section>
    </div>
  );
};

export default BasicForLoop;
