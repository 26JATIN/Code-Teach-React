import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const SimpleIfStatement = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicStructure: {
      title: '🏗️ If Statement Structure',
      code: `public class IfStructure {
    public static void main(String[] args) {
        // Basic if statement structure
        if (condition) {
            // Code to execute if condition is true
            // This block is skipped if condition is false
        }
        
        // Program continues here
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    simpleExample: {
      title: '👶 Simple Example',
      code: `public class AgeCheck {
    public static void main(String[] args) {
        int age = 18;
        
        if (age >= 18) {
            System.out.println("You are an adult!");
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    booleanExample: {
      title: '✅ Boolean Conditions',
      code: `public class LightSwitch {
    public static void main(String[] args) {
        boolean isLightOn = true;
        
        if (isLightOn) {
            System.out.println("The room is bright!");
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
        If Statements in Java 🔍
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          If statements are like decision points in your code. They help your program make choices 
          based on conditions, just like how we make decisions in real life! 🤔
        </p>
      </div>

      {/* Essential Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Key Components 📌</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Condition (must be boolean)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📦</span>
              <span>Code Block (in curly braces)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">➡️</span>
              <span>Flow Control</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Important Rules ⚡</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">✨</span>
              <span>Condition must be in parentheses</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎨</span>
              <span>No semicolon after condition</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <span>Curly braces for multiple statements</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Basic Structure 🏗️</h2>
        <CodeSnippet {...examples.basicStructure} />
        
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <p className="text-gray-300">
            The condition in an if statement must result in a <code className="text-blue-400">boolean</code> value 
            (true or false). The code block only runs when the condition is true!
          </p>
        </div>
      </section>

      {/* Simple Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Simple Example 👶</h2>
        <CodeSnippet {...examples.simpleExample} />
        <CodeSnippet {...examples.booleanExample} />
      </section>

      {/* MCQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-purple-400">Quick Check! 📝</h2>
        <MCQ
          question={mcqQuestions[0]}
          selectedAnswer={selectedAnswers[mcqQuestions[0].id]}
          onAnswerSelect={(id, answer) => handleAnswerSelect(id, answer)}
        />
      </section>

      {/* Practice Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Try It Yourself! 💻</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <p className="text-gray-300 mb-4">
            Write a program that checks if a temperature is above 25°C and prints "It's warm today!" if it is.
          </p>
          <CodeEditor 
            defaultCode={`public class WeatherCheck {
    public static void main(String[] args) {
        double temperature = 28.5;
        
        // Write your if statement here
        
    }
}`} 
          />
        </div>
      </section>

      {/* Common Mistakes */}
      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        <h3 className="text-lg font-medium text-red-400 mb-2">⚠️ Common Mistakes</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Using = instead of == for comparison</li>
          <li>Putting a semicolon after the if condition</li>
          <li>Forgetting parentheses around the condition</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleIfStatement;
