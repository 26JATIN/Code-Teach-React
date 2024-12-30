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

      {/* Examples and Practice */}
      // ...rest of the component implementation following the same pattern as previous modules...
    </div>
  );
};

export default ComparisonOperators;
