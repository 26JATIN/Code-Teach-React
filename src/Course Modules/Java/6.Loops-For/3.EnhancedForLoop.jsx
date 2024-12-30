import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const EnhancedForLoop = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicSyntax: {
      title: '🎯 Enhanced For Loop (For-Each) Syntax',
      code: `public class EnhancedForDemo {
    public static void main(String[] args) {
        // Basic number sequence
        for (int i = 1; i <= 5; i++) {
            System.out.println("Regular for: " + i);
        }
        
        // Same using enhanced for (with range)
        for (int num : new int[]{1, 2, 3, 4, 5}) {
            System.out.println("Enhanced for: " + num);
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    limitations: {
      title: '⚠️ Limitations and Considerations',
      code: `public class EnhancedForLimitations {
    public static void main(String[] args) {
        // Regular for loop - has index access
        for (int i = 0; i < 5; i++) {
            System.out.println("Index: " + i);
        }
        
        // Enhanced for - no index access
        for (int num : new int[]{1, 2, 3, 4, 5}) {
            // Cannot know current position
            System.out.println("Value: " + num);
        }
        
        // Cannot modify counter
        // Cannot iterate in reverse
        // Cannot skip elements
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    }
  };

  const mcqQuestions = [
    {
      id: 1,
      question: "What is another name for enhanced for loop?",
      options: [
        "While loop",
        "For-each loop",
        "Do-while loop",
        "Infinite loop"
      ],
      correctAnswer: 1,
      explanation: "The enhanced for loop is also known as the for-each loop as it iterates through each element."
    },
    {
      id: 2,
      question: "What is the main advantage of enhanced for loop?",
      options: [
        "It's faster than regular for loop",
        "It can modify the counter variable",
        "It's more readable and simpler",
        "It can access the index"
      ],
      correctAnswer: 2,
      explanation: "Enhanced for loop provides cleaner, more readable syntax for iteration."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Enhanced For Loop in Java 🚀
      </h1>

      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          The enhanced for loop (for-each) provides a simpler way to iterate over arrays and collections. 
          It's more readable and less prone to errors, but comes with some limitations. Let's explore! 🎯
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Advantages 🎯</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <span>Cleaner syntax</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🐛</span>
              <span>Fewer bugs</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>No index needed</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Use Cases 🔍</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📦</span>
              <span>Array traversal</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <span>Collection iteration</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔍</span>
              <span>Read-only operations</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Code Examples 💡</h2>
        <CodeSnippet {...examples.basicSyntax} />
        <CodeSnippet {...examples.limitations} />
      </section>

      <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-lg font-medium text-yellow-400 mb-2">⚠️ Limitations</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Cannot modify collection elements</li>
          <li>No access to index</li>
          <li>Cannot control iteration direction</li>
          <li>Cannot skip elements</li>
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
            Create a program that finds the sum and average of array elements using enhanced for loop
          </p>
          <CodeEditor 
            defaultCode={`public class ArrayStats {
    public static void main(String[] args) {
        int[] numbers = {23, 45, 12, 89, 34, 67};
        // Use enhanced for loop to calculate sum and average
        
    }
}`} 
          />
        </div>
      </section>
    </div>
  );
};

export default EnhancedForLoop;
