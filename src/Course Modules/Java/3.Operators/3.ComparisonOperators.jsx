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

    stringComparison: {
      title: '📝 String Comparison',
      code: `public class StringComparison {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = "hello";
        
        // Comparing strings (case-sensitive)
        System.out.println("str1.equals(str2): " + str1.equals(str2));           // false
        
        // Comparing strings (ignore case)
        System.out.println("str1.equalsIgnoreCase(str2): " + 
                          str1.equalsIgnoreCase(str2));                          // true
        
        // DON'T use == for String comparison!
        System.out.println("Using == (unreliable for Strings): " + (str1 == str2)); // Don't do this!
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    practiceQuestion1: {
      title: '🎯 Practice: Grade Calculator',
      code: `public class GradeCalculator {
    public static void main(String[] args) {
        // TODO: Create a program that:
        // 1. Takes a student's score (0-100)
        // 2. Prints whether they:
        //    - Passed (>= 60)
        //    - Failed (< 60)
        //    - Got perfect score (== 100)
        
        Scanner scan = new Scanner(System.in);
        // Your code here
    }
}`
    },

    practiceQuestion2: {
      title: '🎯 Practice: Number Comparison',
      code: `public class NumberComparison {
    public static void main(String[] args) {
        // TODO: Write a program that:
        // 1. Takes three numbers from user
        // 2. Prints:
        //    - Which is largest
        //    - Which is smallest
        //    - If any are equal
        
        Scanner scan = new Scanner(System.in);
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

      {/* Operator Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <h3 className="text-lg font-medium text-blue-400 mb-3">Numeric Comparison</h3>
          <ul className="space-y-2 text-gray-300">
            <li><code className="text-blue-400">==</code> Equal to</li>
            <li><code className="text-blue-400">!=</code> Not equal to</li>
            <li><code className="text-blue-400">&gt;</code> Greater than</li>
            <li><code className="text-blue-400">&lt;</code> Less than</li>
            <li><code className="text-blue-400">&gt;=</code> Greater than or equal to</li>
            <li><code className="text-blue-400">&lt;=</code> Less than or equal to</li>
          </ul>
        </div>
        
        <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <h3 className="text-lg font-medium text-purple-400 mb-3">String Comparison</h3>
          <ul className="space-y-2 text-gray-300">
            <li><code className="text-purple-400">.equals()</code> Compare strings (case-sensitive)</li>
            <li><code className="text-purple-400">.equalsIgnoreCase()</code> Compare strings (ignore case)</li>
            <li><code className="text-purple-400">.compareTo()</code> Compare string order</li>
          </ul>
        </div>
      </div>

      {/* Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">See It In Action! 🚀</h2>
        <CodeSnippet {...examples.basicComparisons} />
        
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-2">Important Note! ⚠️</h3>
          <p className="text-gray-300">
            Remember that comparison operators always return a boolean value (true or false). 
            This makes them perfect for use in if statements and loops!
          </p>
        </div>
      </section>

      {/* String Comparison Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Comparing Strings 📝</h2>
        <CodeSnippet {...examples.stringComparison} />
        
        <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <h3 className="text-lg font-medium text-purple-400 mb-3">Quick Tips for String Comparison 💡</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Always use .equals() to compare String content</li>
            <li>• Use .equalsIgnoreCase() when case doesn't matter</li>
            <li>• Never use == for String comparison</li>
            <li>• .compareTo() returns negative, zero, or positive number based on string order</li>
          </ul>
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
          <h3 className="text-xl font-medium text-green-400 mb-3">Practice 2: Number Comparison</h3>
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
          <li>Using == to compare Strings instead of .equals()</li>
          <li>Forgetting parentheses in complex comparisons</li>
          <li>Confusing = (assignment) with == (comparison)</li>
          <li>Not considering edge cases in comparisons</li>
        </ul>
      </div>

      {/* Summary Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-400">Quick Summary 📝</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="text-lg font-medium text-blue-400 mb-3">For Numbers</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✓ Use ==, !=, &gt;, &lt;, &gt;=, &lt;= directly</li>
              <li>✓ Works with int, double, float, etc.</li>
              <li>✓ Always returns true or false</li>
            </ul>
          </div>
          
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-medium text-purple-400 mb-3">For Strings</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✓ Use .equals() for exact match</li>
              <li>✓ Use .equalsIgnoreCase() for case-insensitive</li>
              <li>✓ Use .compareTo() for ordering</li>
            </ul>
          </div>
        </div>
      </section>

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
