import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const NestedIfStatements = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicStructure: {
      title: '🎯 Basic Nested If Structure',
      code: `public class NestedIfDemo {
    public static void main(String[] args) {
        int age = 20;
        boolean hasLicense = true;
        
        if (age >= 18) {
            System.out.println("Age requirement met!");
            if (hasLicense) {
                System.out.println("You can drive!");
            }
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    practicalExample: {
      title: '🌟 Real World Example',
      code: `public class OnlineShop {
    public static void main(String[] args) {
        boolean isLoggedIn = true;
        double cartTotal = 1000.0;
        boolean isPremiumMember = true;
        
        if (isLoggedIn) {
            if (cartTotal > 500.0) {
                if (isPremiumMember) {
                    System.out.println("20% Premium Discount Applied!");
                } else {
                    System.out.println("10% Regular Discount Applied!");
                }
            } else {
                System.out.println("Add more items for discount!");
            }
        } else {
            System.out.println("Please log in first!");
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
      question: "What happens when an inner if condition is false in nested if statements?",
      options: [
        "All outer if statements are skipped",
        "Only the inner if block is skipped",
        "The program terminates",
        "The next else statement executes"
      ],
      correctAnswer: 1,
      explanation: "When an inner if condition is false, only that specific if block is skipped. The outer if statements and their code blocks continue to execute normally."
    },
    {
      id: 2,
      question: "What is the maximum number of nesting levels allowed in Java?",
      options: [
        "Only 2 levels",
        "Maximum 5 levels",
        "No technical limit, but should be limited for readability",
        "Exactly 3 levels"
      ],
      correctAnswer: 2,
      explanation: "Java doesn't impose a technical limit on nesting levels, but it's recommended to limit nesting to 2-3 levels for code readability and maintainability."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Nested If Statements in Java 📦
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Nested if statements are like Russian nesting dolls - one if statement inside another! 
          They help you check multiple conditions in a hierarchical way. 🪆
        </p>
      </div>

      {/* Essential Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Key Concepts 📌</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📦</span>
              <span>Multiple levels of conditions</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Hierarchical decision making</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔄</span>
              <span>Independent conditions</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Best Practices 🎯</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <span>Limit nesting levels (2-3 max)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎨</span>
              <span>Use proper indentation</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">✨</span>
              <span>Consider alternatives for deep nesting</span>
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

      {/* Warning Section */}
      <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-lg font-medium text-yellow-400 mb-2">⚠️ Nesting Depth Warning</h3>
        <p className="text-gray-300">
          While you can nest if statements as deep as you want, too much nesting can make your code:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
          <li>Hard to read and understand</li>
          <li>Difficult to maintain</li>
          <li>More prone to errors</li>
          <li>Complex to debug</li>
        </ul>
      </div>

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
            Write a program that checks if a user can vote based on age (18+) and whether they have valid ID (true/false)
          </p>
          <CodeEditor 
            defaultCode={`public class VotingEligibility {
    public static void main(String[] args) {
        int age = 19;
        boolean hasValidID = true;
        
        // Write your nested if statements here
        
    }
}`} 
          />
        </div>
      </section>

      {/* Common Mistakes */}
      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        <h3 className="text-lg font-medium text-red-400 mb-2">⚠️ Common Mistakes:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Forgetting to match braces correctly</li>
          <li>Poor indentation making code hard to read</li>
          <li>Too many levels of nesting</li>
          <li>Not considering alternative approaches</li>
        </ul>
      </div>

      {/* Alternative Approaches */}
      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <h3 className="text-lg font-medium text-blue-400 mb-2">💡 Pro Tips:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Consider using && operators instead of deep nesting</li>
          <li>Break complex nested conditions into separate methods</li>
          <li>Use early returns to reduce nesting</li>
        </ul>
      </div>
    </div>
  );
};

export default NestedIfStatements;
