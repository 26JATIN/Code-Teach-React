import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';

const BitwiseOperators = () => {
  const examples = {
    basicBitwise: {
      title: '🔢 Basic Bitwise Operations',
      code: `public class BitwiseBasics {
    public static void main(String[] args) {
        int a = 5;  // Binary: 0101
        int b = 3;  // Binary: 0011
        
        // Bitwise AND (&)
        System.out.println("a & b = " + (a & b));   // 0001 = 1
        
        // Bitwise OR (|)
        System.out.println("a | b = " + (a | b));   // 0111 = 7
        
        // Bitwise XOR (^)
        System.out.println("a ^ b = " + (a ^ b));   // 0110 = 6
        
        // Bitwise NOT (~)
        System.out.println("~a = " + (~a));         // 11111111111111111111111111111010 = -6
        
        // Left shift (<<)
        System.out.println("a << 1 = " + (a << 1)); // 1010 = 10
        
        // Right shift (>>)
        System.out.println("a >> 1 = " + (a >> 1)); // 0010 = 2
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    practiceQuestion1: {
      title: '🎯 Practice: Flag Bits',
      code: `public class FlagBits {
    public static void main(String[] args) {
        // TODO: Create a program that uses bits to store multiple yes/no flags
        // Use a single byte to store 8 different settings
        // Example flags: isAdmin, canEdit, canDelete, canCreate, etc.
        
        byte permissions = 0;
        // Set some permissions using bitwise OR
        // Check permissions using bitwise AND
        // Toggle permissions using bitwise XOR
        
        // Your code here
    }
}`
    },

    practiceQuestion2: {
      title: '🎯 Practice: Power of Two',
      code: `public class PowerOfTwo {
    public static void main(String[] args) {
        // TODO: Create a program that:
        // 1. Uses left shift to calculate powers of 2
        // 2. Uses bitwise operations to check if a number is a power of 2
        
        int number = 16;  // Test with different numbers
        
        // Your code here to check if number is a power of 2
        // Hint: A power of 2 has only one bit set to 1
    }
}`
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Bitwise Operators in Java 🔓
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Bitwise operators work at the bit level, manipulating individual bits in binary numbers. 
          They're essential for low-level programming, optimization, and working with flags! 🚀
        </p>
      </div>

      {/* Operator Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <h3 className="text-lg font-medium text-blue-400 mb-3">Basic Operators</h3>
          <ul className="space-y-2 text-gray-300">
            <li><code className="text-blue-400">&</code> Bitwise AND</li>
            <li><code className="text-blue-400">|</code> Bitwise OR</li>
            <li><code className="text-blue-400">^</code> Bitwise XOR</li>
            <li><code className="text-blue-400">~</code> Bitwise NOT</li>
          </ul>
        </div>
        
        <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <h3 className="text-lg font-medium text-purple-400 mb-3">Shift Operators</h3>
          <ul className="space-y-2 text-gray-300">
            <li><code className="text-purple-400">{'<<'}</code> Left shift</li>
            <li><code className="text-purple-400">{'>>'}</code> Right shift</li>
            <li><code className="text-purple-400">{'>>>'}</code> Unsigned right shift</li>
          </ul>
        </div>

        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-lg font-medium text-green-400 mb-3">Common Uses</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Flag manipulation</li>
            <li>Fast multiplication/division</li>
            <li>Memory optimization</li>
            <li>Cryptography</li>
          </ul>
        </div>
      </div>

      {/* Binary Number Visualization */}
      <section className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <h3 className="text-xl font-medium text-blue-400 mb-4">Binary Visualization 👀</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-gray-300">5 in binary:</p>
            <div className="grid grid-cols-8 gap-1">
              {[0,1,0,1].map((bit, i) => (
                <div key={i} className={`p-2 text-center rounded ${
                  bit ? 'bg-green-500/20 text-green-400' : 'bg-gray-700/20 text-gray-400'
                }`}>
                  {bit}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300">3 in binary:</p>
            <div className="grid grid-cols-8 gap-1">
              {[0,0,1,1].map((bit, i) => (
                <div key={i} className={`p-2 text-center rounded ${
                  bit ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700/20 text-gray-400'
                }`}>
                  {bit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">See It In Action! 🚀</h2>
        <CodeSnippet {...examples.basicBitwise} />
        
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-2">Pro Tip! 💡</h3>
          <p className="text-gray-300">
            When working with bitwise operators, try to visualize the binary representation of numbers.
            It helps in understanding how the operations work!
          </p>
        </div>
      </section>

      {/* Practice Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Let's Practice! 💪</h2>
        
        {/* Practice Question 1 */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Practice 1: Flag Bits</h3>
          <p className="text-gray-300 mb-4">
            Create a program that uses bitwise operators to manage permissions flags efficiently.
          </p>
          <CodeEditor defaultCode={examples.practiceQuestion1.code} />
        </div>

        {/* Practice Question 2 */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Practice 2: Power of Two</h3>
          <p className="text-gray-300 mb-4">
            Create a program that works with powers of 2 using bitwise operators.
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
          <li>Confusing bitwise operators (&, |, ^) with logical operators (&&, ||)</li>
          <li>Forgetting that shift operations depend on the number's type</li>
          <li>Not considering sign bits when using right shift</li>
          <li>Overflow when shifting too many positions</li>
        </ul>
      </div>

      {/* Summary Section */}
      <section className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Quick Summary 📝</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium text-blue-400 mb-2">Operator Effects</h3>
            <ul className="space-y-2 text-gray-300">
              <li><code className="text-blue-400">&</code> - Sets bit to 1 only if both bits are 1</li>
              <li><code className="text-blue-400">|</code> - Sets bit to 1 if either bit is 1</li>
              <li><code className="text-blue-400">^</code> - Sets bit to 1 if bits are different</li>
              <li><code className="text-blue-400">~</code> - Inverts all bits</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-purple-400 mb-2">Shift Effects</h3>
            <ul className="space-y-2 text-gray-300">
              <li><code className="text-purple-400">{'<<'}</code> - Multiplies by 2 for each position</li>
              <li><code className="text-purple-400">{'>>'}</code> - Divides by 2 for each position</li>
              <li><code className="text-purple-400">{'>>>'}</code> - Same as {'>>'} but fills with zeros</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Application Examples */}
      <section className="p-6 bg-green-500/10 rounded-xl border border-green-500/20">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Real-World Applications 🌍</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h3 className="text-lg font-medium text-green-400 mb-2">Permissions System</h3>
            <p className="text-gray-300">
              Using single bits to store multiple yes/no flags saves memory compared to using individual boolean variables.
            </p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h3 className="text-lg font-medium text-green-400 mb-2">Fast Calculations</h3>
            <p className="text-gray-300">
              Left shift by n is the same as multiplying by 2ⁿ, but much faster for the computer to execute.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
        <h3 className="text-lg font-medium text-purple-400 mb-2">🎯 Where to Next?</h3>
        <p className="text-gray-300">
          Now that you understand bitwise operators, you're ready to explore more advanced topics like operator 
          precedence and control flow statements. Keep practicing with the examples above to solidify your understanding!
        </p>
      </div>
    </div>
  );
};

export default BitwiseOperators;
