import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const SwitchBasics = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicStructure: {
      title: '🎯 Basic Switch Structure',
      code: `public class SwitchDemo {
    public static void main(String[] args) {
        int day = 3;
        
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Other day");
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    practicalExample: {
      title: '🌟 Real World Example',
      code: `public class GradeCalculator {
    public static void main(String[] args) {
        char grade = 'B';
        
        switch (grade) {
            case 'A':
                System.out.println("Excellent!");
                break;
            case 'B':
                System.out.println("Good job!");
                break;
            case 'C':
                System.out.println("Satisfactory");
                break;
            default:
                System.out.println("Needs improvement");
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
      question: "What happens if you forget to use 'break' in a switch case?",
      options: [
        "The program will not compile",
        "The program will throw an error at runtime",
        "Fall-through: execution continues to next case",
        "The switch statement will end immediately"
      ],
      correctAnswer: 2,
      explanation: "Without a break statement, the code will 'fall through' to the next case, executing all subsequent cases until a break is encountered or the switch ends."
    },
    {
      id: 2,
      question: "Which of these cannot be used as a switch expression in Java?",
      options: [
        "int",
        "String",
        "float",
        "char"
      ],
      correctAnswer: 2,
      explanation: "float (and double) cannot be used as switch expressions. Only int, byte, short, char, enum, String, and their wrapper classes are allowed."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Switch Statement Basics in Java 🔄
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          The switch statement is a multi-way branch statement that provides an easy way to dispatch execution 
          to different parts of code based on the value of an expression. 🎯
        </p>
      </div>

      {/* Essential Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Key Components 🔑</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Switch expression</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📦</span>
              <span>Case statements</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔄</span>
              <span>Break statements</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Default case</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Supported Types 📋</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔢</span>
              <span>Primitive types (byte, short, char, int)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <span>String (Java 7+)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔰</span>
              <span>Enum types</span>
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
        <h3 className="text-lg font-medium text-yellow-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Forgetting break statements</li>
          <li>Using non-supported types</li>
          <li>Duplicate case values</li>
          <li>Missing default case</li>
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
            Create a simple calculator using switch statement that performs basic operations (+, -, *, /)
          </p>
          <CodeEditor 
            defaultCode={`public class Calculator {
    public static void main(String[] args) {
        int num1 = 10;
        int num2 = 5;
        char operator = '+';
        
        // Write your switch statement here
        
    }
}`} 
          />
        </div>
      </section>

      {/* Best Practices */}
      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <h3 className="text-lg font-medium text-blue-400 mb-2">💡 Best Practices:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Always include a default case</li>
          <li>Use break statements consistently</li>
          <li>Consider using enhanced switch (Java 14+)</li>
          <li>Keep cases simple and readable</li>
        </ul>
      </div>
    </div>
  );
};

export default SwitchBasics;
