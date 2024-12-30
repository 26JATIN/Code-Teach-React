import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';

const BitwiseOperators = () => {
  const examples = {
    binaryBasics: {
      title: '🔢 Understanding Binary Numbers',
      code: `public class BinaryNumbers {
    public static void main(String[] args) {
        // In computers, numbers are stored in binary (base-2)
        // Each position represents a power of 2
        // Example: Converting 10 to binary
        
        int number = 10;  // In binary: 1010
        // 1    0    1    0
        // 8    4    2    1
        // 8 + 0 + 2 + 0 = 10
        
        // Java has a built-in method to see binary representation
        System.out.println("10 in binary: " + Integer.toBinaryString(number));
        
        // We can also create numbers using binary literals
        int binaryNumber = 0b1010; // Same as decimal 10
        System.out.println("Binary 1010 as decimal: " + binaryNumber);
    }
}`
    },

    bitwiseAND: {
      title: '🤝 Bitwise AND (&)',
      code: `public class BitwiseAND {
    public static void main(String[] args) {
        // Bitwise AND (&) compares each bit position:
        // 1 & 1 = 1 (true & true = true)
        // 1 & 0 = 0 (true & false = false)
        // 0 & 1 = 0 (false & true = false)
        // 0 & 0 = 0 (false & false = false)
        
        int a = 12;  // Binary: 1100
        int b = 10;  // Binary: 1010
        int result = a & b;  // Binary: 1000 (Decimal: 8)
        
        System.out.println("Binary representation:");
        System.out.println("a     = " + Integer.toBinaryString(a));   // 1100
        System.out.println("b     = " + Integer.toBinaryString(b));   // 1010
        System.out.println("a & b = " + Integer.toBinaryString(result)); // 1000
        
        System.out.println("\\nDecimal result:");
        System.out.println("12 & 10 = " + result); // 8
        
        // Common use: Checking if a number is even/odd
        int number = 25;
        boolean isEven = (number & 1) == 0;
        System.out.println("\\nIs 25 even? " + isEven); // false
    }
}`
    },

    bitwiseOR: {
      title: '🔗 Bitwise OR (|)',
      code: `public class BitwiseOR {
    public static void main(String[] args) {
        // Bitwise OR (|) compares each bit position:
        // 1 | 1 = 1 (true | true = true)
        // 1 | 0 = 1 (true | false = true)
        // 0 | 1 = 1 (false | true = true)
        // 0 | 0 = 0 (false | false = false)
        
        int a = 12;  // Binary: 1100
        int b = 10;  // Binary: 1010
        int result = a | b;  // Binary: 1110 (Decimal: 14)
        
        System.out.println("Binary representation:");
        System.out.println("a     = " + Integer.toBinaryString(a));   // 1100
        System.out.println("b     = " + Integer.toBinaryString(b));   // 1010
        System.out.println("a | b = " + Integer.toBinaryString(result)); // 1110
        
        System.out.println("\\nDecimal result:");
        System.out.println("12 | 10 = " + result); // 14
        
        // Common use: Setting a flag bit
        int permissions = 0;        // No permissions: 0000
        int READ = 4;              // Read permission:  0100
        int WRITE = 2;             // Write permission: 0010
        
        // Grant read and write permissions
        permissions = permissions | READ | WRITE;  // 0110
        System.out.println("\\nPermissions: " + Integer.toBinaryString(permissions));
    }
}`
    },

    practiceBasic: {
      title: '🎯 Practice: Basic Bit Operations',
      code: `public class BitOperationsPractice {
    public static void main(String[] args) {
        // TODO: Practice these basic operations
        
        // 1. Convert these numbers to binary (use Integer.toBinaryString())
        int num1 = 15;
        int num2 = 7;
        
        // 2. Perform AND, OR operations and print results in both binary and decimal
        
        // 3. Try to determine if numbers are even or odd using bitwise AND
        
        // Write your code here
    }
}`
    },

    practiceIntermediate: {
      title: '🎯 Practice: Permission System',
      code: `public class PermissionSystem {
    public static void main(String[] args) {
        // TODO: Create a file permission system
        // Use bits to represent: READ (4), WRITE (2), EXECUTE (1)
        
        // 1. Create variables for different permission combinations
        
        // 2. Write methods to:
        //    - Add a permission
        //    - Remove a permission
        //    - Check if a permission exists
        
        // 3. Test your system with different combinations
        
        // Write your code here
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
        <CodeSnippet {...examples.binaryBasics} />
        <CodeSnippet {...examples.bitwiseAND} />
        <CodeSnippet {...examples.bitwiseOR} />
        
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
          <h3 className="text-xl font-medium text-green-400 mb-3">Practice 1: Basic Bit Operations</h3>
          <p className="text-gray-300 mb-4">
            Practice these basic operations to solidify your understanding.
          </p>
          <CodeEditor defaultCode={examples.practiceBasic.code} />
        </div>

        {/* Practice Question 2 */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Practice 2: Permission System</h3>
          <p className="text-gray-300 mb-4">
            Create a file permission system using bitwise operators.
          </p>
          <CodeEditor defaultCode={examples.practiceIntermediate.code} />
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
