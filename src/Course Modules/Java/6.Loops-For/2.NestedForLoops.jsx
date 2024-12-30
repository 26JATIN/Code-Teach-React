import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const NestedForLoops = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicNested: {
      title: '🎯 Basic Nested Loop Example',
      code: `public class NestedLoopDemo {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.println("i: " + i + ", j: " + j);
            }
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    patternExample: {
      title: '🌟 Pattern Printing Example',
      code: `public class PatternDemo {
    public static void main(String[] args) {
        int rows = 5;
        // Print triangle pattern
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    multiplicationTable: {
      title: '📊 Multiplication Table',
      code: `public class MultiplicationTable {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= 5; j++) {
                System.out.printf("%4d", i * j);
            }
            System.out.println();
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
      question: "How many times will the inner loop execute in total for: outer(3 iterations) * inner(4 iterations)?",
      options: [
        "3 times",
        "4 times",
        "7 times",
        "12 times"
      ],
      correctAnswer: 3,
      explanation: "The inner loop executes completely for each outer loop iteration: 3 * 4 = 12 times total."
    },
    {
      id: 2,
      question: "What is the output of this nested loop?\nfor(int i=1; i<=2; i++)\n  for(int j=1; j<=2; j++)\n    System.out.print(i+j);",
      options: [
        "2234",
        "2344",
        "2333",
        "2444"
      ],
      correctAnswer: 0,
      explanation: "For i=1: j=1(2) j=2(3), For i=2: j=1(3) j=2(4), So output is 2234"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Nested For Loops in Java 🔄
      </h1>

      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Nested loops are loops within loops, powerful for working with 2D patterns, matrices, 
          and complex iterations. Master them to solve advanced programming challenges! 🎯
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Key Concepts 🔑</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔄</span>
              <span>Outer & Inner Loops</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📊</span>
              <span>Loop Dependencies</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Iteration Order</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Common Uses 🎯</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎨</span>
              <span>Pattern Printing</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📱</span>
              <span>Matrix Operations</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔍</span>
              <span>Grid Processing</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Examples 💡</h2>
        <CodeSnippet {...examples.basicNested} />
        <CodeSnippet {...examples.patternExample} />
        <CodeSnippet {...examples.multiplicationTable} />
      </section>

      <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-lg font-medium text-yellow-400 mb-2">⚠️ Common Mistakes</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Using same variable name in nested loops</li>
          <li>Incorrect loop termination conditions</li>
          <li>Not understanding iteration order</li>
          <li>Creating infinite nested loops</li>
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
            Create a program that prints a number pyramid pattern using nested loops
          </p>
          <CodeEditor 
            defaultCode={`public class NumberPyramid {
    public static void main(String[] args) {
        int rows = 5;
        // Create a pyramid pattern like:
        //     1
        //    121
        //   12321
        //  1234321
        // 123454321
        
    }
}`} 
          />
        </div>
      </section>
    </div>
  );
};

export default NestedForLoops;
