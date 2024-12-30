import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';

const ArithmeticOperators = () => {
  const examples = {
    basicOperators: {
      title: '➕ Basic Arithmetic Operators',
      code: `public class BasicArithmetic {
    public static void main(String[] args) {
        int a = 10;
        int b = 5;
        
        System.out.println("Addition: " + (a + b));      // 15
        System.out.println("Subtraction: " + (a - b));   // 5
        System.out.println("Multiplication: " + (a * b)); // 50
        System.out.println("Division: " + (a / b));      // 2
        System.out.println("Modulus: " + (a % b));       // 0
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    divisionTypes: {
      title: '📊 Integer vs Float Division',
      code: `public class DivisionTypes {
    public static void main(String[] args) {
        int x = 10;
        int y = 3;
        
        // Integer division
        System.out.println("Integer division: " + (x / y));     // 3
        
        // Float division
        System.out.println("Float division: " + (x / (float)y)); // 3.3333333
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    practiceExample: {
      title: '🎯 Practice Problem',
      code: `public class Calculator {
    public static void main(String[] args) {
        // TODO: Create a simple calculator that:
        // 1. Takes two numbers from user
        // 2. Performs all arithmetic operations
        // 3. Displays results nicely formatted
        
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
        Arithmetic Operators in Java 🧮
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Arithmetic operators are the basic building blocks of mathematical operations in Java. 
          They help us perform calculations just like we do in regular math! 🎯
        </p>
      </div>

      {/* Basic Operators Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Basic Operators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-2xl">➕</span>
                <span className="text-gray-300"><code className="text-blue-400">+</code> Addition</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">➖</span>
                <span className="text-gray-300"><code className="text-blue-400">-</code> Subtraction</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">✖️</span>
                <span className="text-gray-300"><code className="text-blue-400">*</code> Multiplication</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">➗</span>
                <span className="text-gray-300"><code className="text-blue-400">/</code> Division</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">🔄</span>
                <span className="text-gray-300"><code className="text-blue-400">%</code> Modulus (Remainder)</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-medium text-purple-400 mb-3">Quick Tips 💡</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Division between integers gives integer result</li>
              <li>• Use float/double for decimal division</li>
              <li>• Modulus is great for finding remainders</li>
            </ul>
          </div>
        </div>
        
        <CodeSnippet {...examples.basicOperators} />
      </section>

      {/* Division Types Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Understanding Division 📊</h2>
        <CodeSnippet {...examples.divisionTypes} />
        
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-2">Important Note! ⚠️</h3>
          <p className="text-gray-300">
            Remember that integer division drops decimal places. If you need decimal results, 
            make sure at least one operand is a floating-point number!
          </p>
        </div>
      </section>

      {/* Practice Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Let's Practice! 💪</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <p className="text-gray-300 mb-4">
            Create a calculator program that takes two numbers from the user and performs all arithmetic operations.
            Try to make it user-friendly!
          </p>
          <CodeEditor defaultCode={examples.practiceExample.code} />
        </div>
      </section>

      {/* Common Mistakes Section */}
      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        <h3 className="text-lg font-medium text-red-400 flex items-center gap-2 mb-2">
          <span>⚠️ Common Mistakes to Avoid</span>
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Forgetting that integer division truncates decimals</li>
          <li>Not handling division by zero</li>
          <li>Mixing integer and floating-point calculations without proper casting</li>
        </ul>
      </div>
    </div>
  );
};

export default ArithmeticOperators;
