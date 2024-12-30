import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const EnhancedSwitch = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    basicStructure: {
      title: '🎯 Enhanced Switch Example (Java 14+)',
      code: `public class EnhancedSwitchDemo {
    public static void main(String[] args) {
        String day = "MONDAY";
        
        String type = switch (day) {
            case "MONDAY", "TUESDAY", "WEDNESDAY", 
                 "THURSDAY", "FRIDAY" -> "Weekday";
            case "SATURDAY", "SUNDAY" -> "Weekend";
            default -> "Invalid day";
        };
        
        System.out.println(type);
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    yieldExample: {
      title: '🌟 Switch Expression with yield',
      code: `public class YieldExample {
    public static void main(String[] args) {
        int score = 85;
        
        String grade = switch (score / 10) {
            case 10, 9 -> {
                System.out.println("Excellent!");
                yield "A";
            }
            case 8 -> {
                System.out.println("Very Good!";
                yield "B";
            }
            case 7 -> "C";
            case 6 -> "D";
            default -> "F";
        };
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    }
  };

  const mcqQuestions = [
    {
      id: 1,
      question: "Which Java version introduced the enhanced switch expressions?",
      options: [
        "Java 11",
        "Java 12",
        "Java 14",
        "Java 16"
      ],
      correctAnswer: 2,
      explanation: "Enhanced switch expressions were introduced as a standard feature in Java 14."
    },
    {
      id: 2,
      question: "What keyword is used to return a value from a switch expression block?",
      options: [
        "return",
        "break",
        "yield",
        "case"
      ],
      correctAnswer: 2,
      explanation: "The 'yield' keyword is used to return a value from a switch expression block."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Enhanced Switch Expressions 🚀
      </h1>

      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Java 14 introduced enhanced switch expressions with arrow syntax and multiple case labels, 
          making switch statements more concise and powerful! Let's explore these modern features. 🎯
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">New Features 🆕</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">➡️</span>
              <span>Arrow syntax</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📦</span>
              <span>Multiple case labels</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Expression form</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Advantages ✨</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <span>More concise syntax</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔄</span>
              <span>No break statements needed</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">✅</span>
              <span>Exhaustiveness checking</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Examples 💡</h2>
        <CodeSnippet {...examples.basicStructure} />
        <CodeSnippet {...examples.yieldExample} />
      </section>

      <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-lg font-medium text-yellow-400 mb-2">⚠️ Important Notes</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Enhanced switch requires Java 14 or later</li>
          <li>Arrow syntax eliminates need for break statements</li>
          <li>Multiple case labels must be comma-separated</li>
          <li>Switch expressions must be exhaustive</li>
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
            Create an enhanced switch expression to convert numerical grades to letter grades
          </p>
          <CodeEditor 
            defaultCode={`public class GradeConverter {
    public static void main(String[] args) {
        int score = 87;
        
        // Create an enhanced switch expression that returns:
        // A for scores 90-100
        // B for scores 80-89
        // C for scores 70-79
        // D for scores 60-69
        // F for scores below 60
        
    }
}`} 
          />
        </div>
      </section>
    </div>
  );
};

export default EnhancedSwitch;
