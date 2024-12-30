import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const SwitchWithStrings = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicStructure: {
      title: '🎯 Switch with Strings Example',
      code: `public class StringSwitchDemo {
    public static void main(String[] args) {
        String command = "start";
        
        switch (command) {
            case "start":
                System.out.println("Starting the application...");
                break;
            case "stop":
                System.out.println("Stopping the application...");
                break;
            case "restart":
                System.out.println("Restarting the application...");
                break;
            default:
                System.out.println("Command not recognized");
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    practicalExample: {
      title: '🌟 Real World Example',
      code: `public class GameController {
    public static void main(String[] args) {
        String direction = "UP";
        
        switch (direction.toLowerCase()) {
            case "up":
                System.out.println("Moving player upward");
                break;
            case "down":
                System.out.println("Moving player downward");
                break;
            case "left":
                System.out.println("Moving player left");
                break;
            case "right":
                System.out.println("Moving player right");
                break;
            default:
                System.out.println("Invalid direction");
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
      question: "From which Java version is String supported in switch statements?",
      options: [
        "Java 5",
        "Java 6",
        "Java 7",
        "Java 8"
      ],
      correctAnswer: 2,
      explanation: "String support in switch statements was introduced in Java 7 as one of its key features."
    },
    {
      id: 2,
      question: "What happens if a String variable is null in a switch statement?",
      options: [
        "It matches the default case",
        "The code compiles but throws NullPointerException at runtime",
        "The code won't compile",
        "It automatically converts null to empty string"
      ],
      correctAnswer: 1,
      explanation: "If a String variable used in a switch statement is null, it will throw a NullPointerException at runtime."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Switch Statements with Strings 📝
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Since Java 7, switch statements can work with String values, making them even more versatile 
          for text-based control flow. Let's explore how to use them effectively! 🎯
        </p>
      </div>

      {/* Key Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Key Features 🔑</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <span>Case-sensitive comparison</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔄</span>
              <span>String method support</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Compile-time constants</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Common Use Cases 🎯</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎮</span>
              <span>Command processing</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🗺️</span>
              <span>Menu navigation</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔍</span>
              <span>State handling</span>
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
        <h3 className="text-lg font-medium text-yellow-400 mb-2">⚠️ Important Considerations</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Always check for null values</li>
          <li>Remember case sensitivity</li>
          <li>Use string normalization when needed</li>
          <li>Consider performance with large string comparisons</li>
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
            Create a simple menu system using switch with String input for different operations
          </p>
          <CodeEditor 
            defaultCode={`public class MenuSystem {
    public static void main(String[] args) {
        String menuChoice = "help";
        
        // Write your switch statement to handle:
        // "help" - Show help menu
        // "start" - Start the program
        // "exit" - Exit the program
        // Add appropriate messages for each case
        
    }
}`} 
          />
        </div>
      </section>

      {/* Best Practices */}
      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <h3 className="text-lg font-medium text-blue-400 mb-2">💡 Best Practices:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Normalize strings before comparison</li>
          <li>Handle null values appropriately</li>
          <li>Use constants for repeated strings</li>
          <li>Consider using enums for fixed sets of strings</li>
        </ul>
      </div>
    </div>
  );
};

export default SwitchWithStrings;
