import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';

const SimpleIfStatement = () => {
  const examples = {
    basicIf: {
      title: '🔍 Basic If Statement',
      code: `public class BasicIfExample {
    public static void main(String[] args) {
        int age = 18;
        
        // Simple if statement
        if (age >= 18) {
            System.out.println("You are an adult!");
        }
        
        // Program continues here regardless of if statement
        System.out.println("Program continues...");
    }
}`
    },
    multipleConditions: {
      title: '🔄 Multiple Conditions',
      code: `public class VotingEligibility {
    public static void main(String[] args) {
        int age = 19;
        boolean hasID = true;
        boolean isRegistered = true;
        
        // Using multiple conditions with AND (&&)
        if (age >= 18 && hasID && isRegistered) {
            System.out.println("You can vote!");
        }
        
        // Using multiple conditions with OR (||)
        boolean isHoliday = true;
        boolean isWeekend = false;
        
        if (isHoliday || isWeekend) {
            System.out.println("You can rest today!");
        }
    }
}`
    },
    nestedConditions: {
      title: '📦 Basic Nesting',
      code: `public class DriveTest {
    public static void main(String[] args) {
        int age = 17;
        boolean hasLearnerPermit = true;
        
        if (age >= 16) {
            System.out.println("Age requirement met!");
            
            if (hasLearnerPermit) {
                System.out.println("You can take the driving test!");
            }
        }
    }
}`
    }
  };

  const practices = {
    practice1: {
      title: "Temperature Check",
      description: "Write a program that checks if temperature is above 30°C and prints a warning if it is.",
      template: `public class TemperatureWarning {
    public static void main(String[] args) {
        double temperature = 32.5;
        
        // TODO: Check if temperature > 30
        // Print "Heat Warning!" if true
        
    }
}`,
      solution: `if (temperature > 30) {
    System.out.println("Heat Warning!");
}`
    },
    practice2: {
      title: "Score Validator",
      description: "Check if a student's score is perfect (100) and print a congratulatory message.",
      template: `public class ScoreChecker {
    public static void main(String[] args) {
        int score = 100;
        
        // TODO: Check if score is 100
        // Print "Perfect Score!" if true
        
    }
}`,
      solution: `if (score == 100) {
    System.out.println("Perfect Score!");
}`
    }
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

      {/* Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Examples 💡</h2>
        <CodeSnippet {...examples.basicIf} />
        <CodeSnippet {...examples.multipleConditions} />
        <CodeSnippet {...examples.nestedConditions} />
      </section>

      {/* Key Points */}
      <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-lg font-medium text-yellow-400 mb-2">Key Points to Remember 🔑</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>The condition must be a boolean expression</li>
          <li>Curly braces {} are optional for single statements but recommended</li>
          <li>Code inside if block only executes when condition is true</li>
          <li>Program continues after if block regardless of condition</li>
        </ul>
      </div>

      {/* Practice Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Practice Time! 💪</h2>
        
        {/* Practice 1 */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">{practices.practice1.title}</h3>
          <p className="text-gray-300 mb-4">{practices.practice1.description}</p>
          <CodeEditor defaultCode={practices.practice1.template} />
        </div>

        {/* Practice 2 */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">{practices.practice2.title}</h3>
          <p className="text-gray-300 mb-4">{practices.practice2.description}</p>
          <CodeEditor defaultCode={practices.practice2.template} />
        </div>
      </section>

      {/* Common Mistakes */}
      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        <h3 className="text-lg font-medium text-red-400 mb-2">⚠️ Common Mistakes</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Using = instead of == for comparison</li>
          <li>Forgetting curly braces {}</li>
          <li>Using ; right after the if condition</li>
          <li>Complex conditions without proper parentheses</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
        <h3 className="text-lg font-medium text-purple-400 mb-2">🎯 Next Steps</h3>
        <p className="text-gray-300">
          Ready to handle alternate cases? Move on to if-else statements to learn how to 
          execute different code when your condition is false!
        </p>
      </div>
    </div>
  );
};

export default SimpleIfStatement;
