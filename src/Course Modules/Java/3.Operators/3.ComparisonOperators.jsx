import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeEditor';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';

const ComparisonOperators = () => {
  const examples = {
    basicComparisons: {
      title: '🔍 Basic Comparison Operators',
      code: `public class ComparisonBasics {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        
        // Equal to
        System.out.println("x == y: " + (x == y));  // false
        
        // Not equal to
        System.out.println("x != y: " + (x != y));  // true
        
        // Greater than
        System.out.println("x > y: " + (x > y));    // false
        
        // Less than
        System.out.println("x < y: " + (x < y));    // true
        
        // Greater than or equal to
        System.out.println("x >= y: " + (x >= y));  // false
        
        // Less than or equal to
        System.out.println("x <= y: " + (x <= y));  // true
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    practiceQuestion1: {
      title: '🎯 Practice: Grade Calculator',
      code: `public class GradeCalculator {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        // Ask for score
        System.out.println("Enter your score (0-100): ");
        int score = scan.nextInt();
        
        // TODO: Write conditions using comparison operators to:
        // 1. Check if score is perfect (100)
        // 2. Check if score is passing (>= 60)
        // 3. Check if score is failing (< 60)
        // Your code here
        
        scan.close();
    }
}`
    },

    practiceQuestion2: {
      title: '🎯 Practice: Number Ordering',
      code: `public class NumberOrdering {
    public static void main(String[] args) {
        int num1 = 15;
        int num2 = 7;
        int num3 = 22;
        
        // TODO: Use comparison operators to:
        // 1. Find the largest number
        // 2. Find the smallest number
        // 3. Check if any numbers are equal
        // Your code here
    }
}`
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Comparison Operators in Java 🔍
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Comparison operators help us compare values and make decisions in our programs. 
          They're essential for creating conditions and making our programs smarter! 🧠
        </p>
      </div>

      {/* Operator Types */}
      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <h3 className="text-lg font-medium text-blue-400 mb-3">Comparison Operators</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <code className="text-blue-400">==</code>
            <span className="text-gray-300">Equal to</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-blue-400">!=</code>
            <span className="text-gray-300">Not equal to</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-blue-400">&gt;</code>
            <span className="text-gray-300">Greater than</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-blue-400">&lt;</code>
            <span className="text-gray-300">Less than</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-blue-400">&gt;=</code>
            <span className="text-gray-300">Greater than or equal</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-blue-400">&lt;=</code>
            <span className="text-gray-300">Less than or equal</span>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">See It In Action! 🚀</h2>
        <CodeSnippet {...examples.basicComparisons} />
        
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-2">Important Note! ⚠️</h3>
          <p className="text-gray-300">
            Comparison operators always return a boolean value (true or false). 
            These results are essential for making decisions in your programs!
          </p>
        </div>
      </section>

      {/* Practice Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Let's Practice! 💪</h2>
        
        {/* Practice Question 1 */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Practice 1: Grade Calculator</h3>
          <p className="text-gray-300 mb-4">
            Create a program that determines if a student passed or failed based on their score.
            This will help you practice using comparison operators with numbers!
          </p>
          <CodeEditor defaultCode={examples.practiceQuestion1.code} />
        </div>

        {/* Practice Question 2 */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Practice 2: Number Ordering</h3>
          <p className="text-gray-300 mb-4">
            Write a program that compares three numbers. This will give you practice with 
            multiple comparisons and logical thinking!
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
          <li>Forgetting parentheses in complex comparisons</li>
          <li>Not considering edge cases (like maximum/minimum values)</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
        <h3 className="text-lg font-medium text-green-400 mb-2">🎯 Next Steps</h3>
        <p className="text-gray-300">
          Now that you understand comparison operators, you're ready to learn about logical operators 
          and how to combine multiple conditions! These will be essential for creating more complex 
          decision-making in your programs.
        </p>
      </div>
    </div>
  );
};

export default ComparisonOperators;
