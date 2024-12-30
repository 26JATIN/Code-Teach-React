import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const SimpleIfStatement = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicIf: {
      title: '🔍 Basic If Statement',
      code: `public class SimpleIfDemo {
    public static void main(String[] args) {
        int number = 10;
        
        if (number > 0) {
            System.out.println("The number is positive!");
        }
    }
}`
    },
    realWorld: {
      title: '🌟 Real World Example',
      code: `public class AgeChecker {
    public static void main(String[] args) {
        int age = 20;
        
        if (age >= 18) {
            System.out.println("Welcome! You can enter.");
        }
    }
}`
    }
  };

  const mcqQuestions = [
    {
      id: 1,
      question: "What will happen if the condition in an if statement is false?",
      options: [
        "The code inside the if block will run",
        "The program will crash",
        "The code inside the if block will be skipped",
        "The program will show an error"
      ],
      correctAnswer: 2,
      explanation: "When an if statement's condition is false, the code block inside the if statement is simply skipped, and the program continues with the next instruction after the if block."
    },
    {
      id: 2,
      question: "Which of the following is the correct syntax for an if statement in Java?",
      options: [
        "if condition { }",
        "if (condition) { }",
        "if [condition] { }",
        "if condition: { }"
      ],
      correctAnswer: 1,
      explanation: "The correct syntax requires parentheses () around the condition. The proper format is: if (condition) { }"
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
        Simple If Statements in Java 🔍
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          If statements are fundamental building blocks for decision-making in programming. 
          They allow your program to execute different code based on conditions! 🎯
        </p>
      </div>

      {/* Syntax Overview */}
      <section className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Basic Syntax</h2>
        <div className="bg-black/30 p-4 rounded-lg">
          <pre className="text-gray-300">
            <code>{`if (condition) {
    // code to execute if condition is true
}`}</code>
          </pre>
        </div>
      </section>

      {/* Basic Concept */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Understanding If Statements 🤔</h2>
        <CodeSnippet {...examples.basicIf} />
        
        {/* New explanation for if statement */}
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <h3 className="text-lg font-medium text-blue-400 mb-3">How If Statements Work 🎯</h3>
          <div className="space-y-4">
            <p className="text-gray-300">Think of an if statement like a bouncer at a club:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li>The condition is like the rule (e.g., "Must be 18 or older")</li>
              <li>If the condition is true, you get in (code inside runs)</li>
              <li>If the condition is false, you don't get in (code inside is skipped)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* MCQ Section 1 */}
      <section className="space-y-4">
        <h3 className="text-xl font-medium text-purple-400">Quick Check! 📝</h3>
        <MCQ
          question={mcqQuestions[0]}
          selectedAnswer={selectedAnswers[mcqQuestions[0].id]}
          onAnswerSelect={handleAnswerSelect}
        />
      </section>

      {/* Real World Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Real World Example 🌟</h2>
        <CodeSnippet {...examples.realWorld} />
      </section>

      {/* MCQ Section 2 */}
      <section className="space-y-4">
        <h3 className="text-xl font-medium text-purple-400">Test Your Knowledge! 🎯</h3>
        <MCQ
          question={mcqQuestions[1]}
          selectedAnswer={selectedAnswers[mcqQuestions[1].id]}
          onAnswerSelect={handleAnswerSelect}
        />
      </section>

      {/* Practice Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Try It Yourself! 💻</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <p className="text-gray-300 mb-4">
            Write a program that checks if a number is greater than 100 and prints "Big number!" if it is.
          </p>
          <CodeEditor defaultCode={`public class NumberChecker {
    public static void main(String[] args) {
        int number = 150;
        
        // Write your if statement here
        
    }
}`} />
        </div>
      </section>

      {/* Common Mistakes Section */}
      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        <h3 className="text-lg font-medium text-red-400 mb-2">⚠️ Watch Out For These!</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Don't put a semicolon right after the if condition</li>
          <li>Always use == for comparison, not = (which is for assignment)</li>
          <li>Remember to use proper boolean expressions in the condition</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleIfStatement;
