import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';

const AssignmentOperators = () => {
  const examples = {
    basicAssignment: {
      title: '📝 Basic Assignment',
      code: `public class BasicAssignment {
    public static void main(String[] args) {
        // Simple assignment
        int number = 10;
        
        // Compound assignments
        number += 5;  // Same as: number = number + 5
        System.out.println("After += 5: " + number);  // 15
        
        number -= 3;  // Same as: number = number - 3
        System.out.println("After -= 3: " + number);  // 12
        
        number *= 2;  // Same as: number = number * 2
        System.out.println("After *= 2: " + number);  // 24
        
        number /= 4;  // Same as: number = number / 4
        System.out.println("After /= 4: " + number);  // 6
        
        number %= 4;  // Same as: number = number % 4
        System.out.println("After %= 4: " + number);  // 2
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    practiceQuestion1: {
      title: '🎯 Practice: Score Calculator',
      code: `public class ScoreCalculator {
    public static void main(String[] args) {
        // TODO: Create a program that:
        // 1. Starts with a score of 100
        // 2. Adds 50 points using +=
        // 3. Doubles the score using *=
        // 4. Subtracts 25 points using -=
        // Print the score after each change
        
        int score = 100;
        // Your code here
    }
}`
    },

    practiceQuestion2: {
      title: '🎯 Practice: Temperature Converter',
      code: `import java.util.Scanner;

public class TemperatureConverter {
    public static void main(String[] args) {
        // TODO: Create a program that:
        // 1. Takes temperature in Celsius
        // 2. Converts it to Fahrenheit using compound operators
        // Formula: (C × 9/5) + 32 = F
        // Break this down using compound operators!
        
        Scanner scan = new Scanner(System.in);
        System.out.println("Enter temperature in Celsius: ");
        double celsius = scan.nextDouble();
        // Your code here
        
        scan.close();
    }
}`
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Assignment Operators in Java ✍️
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Assignment operators help us store and update values in variables. They're like shortcuts 
          that make our code cleaner and more efficient! Let's master them! 🎯
        </p>
      </div>

      {/* Operator Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <h3 className="text-lg font-medium text-blue-400 mb-3">Basic Assignment</h3>
          <ul className="space-y-2 text-gray-300">
            <li><code className="text-blue-400">=</code> Simple assignment</li>
          </ul>
        </div>
        
        <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <h3 className="text-lg font-medium text-purple-400 mb-3">Compound Assignment</h3>
          <ul className="space-y-2 text-gray-300">
            <li><code className="text-purple-400">+=</code> Add and assign</li>
            <li><code className="text-purple-400">-=</code> Subtract and assign</li>
            <li><code className="text-purple-400">*=</code> Multiply and assign</li>
            <li><code className="text-purple-400">/=</code> Divide and assign</li>
            <li><code className="text-purple-400">%=</code> Modulus and assign</li>
          </ul>
        </div>
      </div>

      {/* Examples and Practice */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">See It In Action! 🚀</h2>
        <CodeSnippet {...examples.basicAssignment} />
        
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-2">Pro Tip! 💡</h3>
          <p className="text-gray-300">
            Compound operators not only make your code shorter but also more efficient. 
            They perform the operation and assignment in one step!
          </p>
        </div>
      </section>

      {/* Practice Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Let's Practice! 💪</h2>
        
        {/* Practice Question 1 */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Practice 1: Score Calculator</h3>
          <p className="text-gray-300 mb-4">
            Let's create a program that manipulates a game score using different assignment operators!
          </p>
          <CodeEditor defaultCode={examples.practiceQuestion1.code} />
        </div>

        {/* Practice Question 2 */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Practice 2: Temperature Converter</h3>
          <p className="text-gray-300 mb-4">
            Create a temperature converter using compound assignment operators!
          </p>
          <CodeEditor defaultCode={examples.practiceQuestion2.code} />
        </div>
      </section>

      {/* Common Mistakes */}
      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        <h3 className="text-lg font-medium text-red-400 flex items-center gap-2 mb-2">
          <span>⚠️ Watch Out For These!</span>
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Confusing = (assignment) with == (comparison)</li>
          <li>Forgetting that /= and %= work like regular division and modulus</li>
          <li>Not initializing variables before using compound assignment</li>
        </ul>
      </div>
    </div>
  );
};

export default AssignmentOperators;
