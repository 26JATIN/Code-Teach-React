import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const IfElseIfLadder = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicStructure: {
      title: '🏗️ If-Else-If Ladder Structure',
      code: `public class GradeSystem {
    public static void main(String[] args) {
        int score = 85;
        
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    practicalExample: {
      title: '🎯 Real World Example',
      code: `public class WeatherAdvice {
    public static void main(String[] args) {
        double temperature = 25.5;
        
        if (temperature > 30) {
            System.out.println("It's hot! Stay hydrated!");
        } else if (temperature > 20) {
            System.out.println("Pleasant weather!");
        } else if (temperature > 10) {
            System.out.println("Bring a jacket!");
        } else {
            System.out.println("It's cold! Stay warm!");
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
      question: "In an if-else-if ladder, how many conditions can be executed?",
      options: [
        "All conditions that are true",
        "Only the first condition that is true",
        "Only the last condition",
        "All conditions regardless of truth value"
      ],
      correctAnswer: 1,
      explanation: "In an if-else-if ladder, only the first condition that evaluates to true will have its code block executed. Once a condition is true, the rest of the ladder is skipped."
    },
    {
      id: 2,
      question: "What happens if none of the conditions in the if-else-if ladder are true?",
      options: [
        "The program crashes",
        "All code blocks are skipped",
        "The else block executes (if present)",
        "The first condition executes by default"
      ],
      correctAnswer: 2,
      explanation: "If none of the conditions are true and there is an else block, the else block will execute. If there is no else block, all code blocks are skipped."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        If-Else-If Ladder in Java 🪜
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          The if-else-if ladder allows you to test multiple conditions in sequence, like a decision tree. 
          It's perfect for handling multiple possible scenarios! 🌳
        </p>
      </div>

      {/* Essential Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Key Features 📌</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Multiple conditions</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Sequential testing</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔄</span>
              <span>Optional else block</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Important Points 🤔</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">1️⃣</span>
              <span>Only first true condition executes</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <span>Order matters</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Conditions are tested in sequence</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Examples 💡</h2>
        <CodeSnippet {...examples.basicStructure} />
        <CodeSnippet {...examples.practicalExample} />
      </section>

      {/* MCQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-purple-400">Test Your Understanding 🤓</h2>
        {mcqQuestions.map((question) => (
          <MCQ
            key={question.id}
            question={question}
            selectedAnswer={selectedAnswers[question.id]}
            onAnswerSelect={(id, answer) => setSelectedAnswers(prev => ({...prev, [id]: answer}))}
          />
        ))}
      </section>

      {/* Practice Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Practice Time! 💻</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <p className="text-gray-300 mb-4">
            Write a program that assigns letter grades based on scores: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60)
          </p>
          <CodeEditor 
            defaultCode={`public class GradingSystem {
    public static void main(String[] args) {
        int score = 85;
        
        // Write your if-else-if ladder here
        
    }
}`} 
          />
        </div>
      </section>

      {/* Common Mistakes */}
      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        <h3 className="text-lg font-medium text-red-400 mb-2">⚠️ Watch Out For:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Incorrect order of conditions</li>
          <li>Overlapping conditions</li>
          <li>Missing else block for default case</li>
          <li>Using = instead of == for comparison</li>
        </ul>
      </div>

      {/* Tips Section */}
      <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-lg font-medium text-yellow-400 mb-2">💡 Pro Tips:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Order conditions from most specific to most general</li>
          <li>Use else as a catch-all for unexpected cases</li>
          <li>Keep conditions mutually exclusive</li>
        </ul>
      </div>
    </div>
  );
};

export default IfElseIfLadder;
