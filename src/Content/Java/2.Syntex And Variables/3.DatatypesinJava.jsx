import React from 'react';
import CodeSnippet from '../../Components/Code Components/CodeSnippet';
import CodeEditor from '../../Components/Code Components/CodeEditor';

const DatatypesinJava = () => {
  const examples = {
    basicTypes: {
      title: '🔢 Basic Data Types',
      code: `// Numbers without decimals
int age = 25;              // For storing whole numbers
long population = 7800000000L;  // For very big whole numbers

// Numbers with decimals
double height = 5.8;       // For storing decimal numbers
float temperature = 98.6f; // Another way to store decimals

// Single character
char grade = 'A';          // For storing a single character

// True or False
boolean isStudent = true;  // For yes/no type values

// Text
String name = "John";      // For storing text`,
      showLineNumbers: true,
      showCopyButton: true
    },
    
    simpleExample: {
      title: '👨‍🎓 Student Information Example',
      code: `public class StudentInfo {
    public static void main(String[] args) {
        // Store student information
        String name = "John";
        int age = 15;
        char grade = 'A';
        double height = 5.8;
        boolean isPresent = true;
        
        // Print student information
        System.out.println("Student Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Grade: " + grade);
        System.out.println("Height: " + height);
        System.out.println("Present Today: " + isPresent);
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    practiceQuestion: {
      title: '🎯 Practice Example',
      code: `public class AboutMe {
    public static void main(String[] args) {
        // Try creating variables about yourself!
        // 1. Your name
        // 2. Your age
        // 3. Your favorite grade (A, B, C, etc.)
        // 4. Are you a student?
        
        // Then print them all!
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    memoryUsage: {
      title: '💾 Memory Usage',
      code: `/*
Memory used by each type:

int: 4 boxes in memory
long: 8 boxes in memory
byte: 1 box in memory
short: 2 boxes in memory
float: 4 boxes in memory
double: 8 boxes in memory
char: 2 boxes in memory
boolean: 1 box in memory

Note: One box = 1 byte of memory
*/`,
      showLineNumbers: true,
      showCopyButton: true
    },

    printingVariables: {
      title: '🖨️ How to Print Variables',
      code: `public class PrintingExample {
    public static void main(String[] args) {
        // First, let's create some variables
        String name = "John";
        int age = 20;
        double height = 5.9;
        boolean isStudent = true;
        char grade = 'A';

        // Method 1: Using + to combine text and variables
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);

        // Method 2: Using printf for formatted output
        System.out.printf("Height: %.1f feet\\n", height);
        
        // Method 3: Multiple variables in one line
        System.out.println("Grade " + grade + " student: " + isStudent);
        
        // Method 4: Using String.format
        String message = String.format("%s is %d years old", name, age);
        System.out.println(message);
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    simpleMemoryExample: {
      title: '🎯 Understanding Memory Simply',
      code: `// Small numbers (use int - 4 boxes)
int age = 25;
int score = 95;

// Big numbers (use long - 8 boxes)
long population = 7800000000L;

// Decimal numbers (use double - 8 boxes)
double price = 99.99;

// Single letters/symbols (use char - 2 boxes)
char grade = 'A';

// Yes/No values (use boolean - 1 box)
boolean isStudent = true;

// Text (String - varies based on text length)
String name = "John";  // Uses more boxes for longer names`,
      showLineNumbers: true,
      showCopyButton: true
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Understanding Data Types in Java 📝
      </h1>

      {/* Simple Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Think of data types as different kinds of containers. Just like you wouldn't store water in a 
          pencil box, in Java, different types of information need different types of containers! 
          Let's learn about them in a simple way! 🎈
        </p>
      </div>

      {/* Main Types Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">The Main Types We Use 📦</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="text-xl font-medium text-blue-400 mb-4">Numbers 🔢</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <code className="text-blue-400">int</code>
                  <p className="text-sm mt-1">For whole numbers like 1, 42, -8</p>
                  <p className="text-xs text-gray-400">Example: int age = 25;</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔢</span>
                <div>
                  <code className="text-blue-400">double</code>
                  <p className="text-sm mt-1">For decimal numbers like 3.14, 2.5</p>
                  <p className="text-xs text-gray-400">Example: double price = 19.99;</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <h3 className="text-xl font-medium text-purple-400 mb-4">Text & Characters 📝</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <code className="text-purple-400">String</code>
                  <p className="text-sm mt-1">For text like names, messages</p>
                  <p className="text-xs text-gray-400">Example: String name = "John";</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔤</span>
                <div>
                  <code className="text-purple-400">char</code>
                  <p className="text-sm mt-1">For single characters like 'A', '1', '$'</p>
                  <p className="text-xs text-gray-400">Example: char grade = 'A';</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Boolean Section */}
        <div className="p-6 bg-green-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-4">Yes/No Values ✅</h3>
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <code className="text-green-400">boolean</code>
              <p className="text-sm mt-1">For true/false values only</p>
              <p className="text-xs text-gray-400">Example: boolean isStudent = true;</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Memory Boxes 📦</h2>
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
          <p className="text-gray-300 mb-4">
            Think of computer memory like a row of boxes. Different types need different numbers of boxes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-400 mb-2">Small Numbers 📱</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <code>byte</code>: 1 box (like storing age)</li>
                <li>• <code>short</code>: 2 boxes (like storing a year)</li>
                <li>• <code>int</code>: 4 boxes (most common for numbers)</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-purple-400 mb-2">Big Numbers 🌍</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <code>long</code>: 8 boxes (like world population)</li>
                <li>• <code>double</code>: 8 boxes (for decimal numbers)</li>
                <li>• <code>float</code>: 4 boxes (smaller decimals)</li>
              </ul>
            </div>
          </div>
        </div>
        <CodeSnippet {...examples.simpleMemoryExample} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Printing Variables 🖨️</h2>
        <div className="p-6 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-2">Ways to Print:</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <span>1️⃣</span>
              <div>
                <p className="font-medium">Simple Way (+ symbol)</p>
                <code className="text-sm bg-gray-900/50 px-2 py-1 rounded">System.out.println("Age: " + age);</code>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span>2️⃣</span>
              <div>
                <p className="font-medium">Formatted Way (printf)</p>
                <code className="text-sm bg-gray-900/50 px-2 py-1 rounded">System.out.printf("Age: %d\n", age);</code>
              </div>
            </li>
          </ul>
        </div>
        <CodeSnippet {...examples.printingVariables} />
        
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <h3 className="text-lg font-medium text-blue-400 mb-2">Format Specifiers 🎯</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• %s - for text (String)</li>
            <li>• %d - for whole numbers (int, long)</li>
            <li>• %f - for decimal numbers (float, double)</li>
            <li>• %c - for single characters (char)</li>
            <li>• %b - for true/false values (boolean)</li>
          </ul>
        </div>
      </section>

      {/* Simple Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Let's See Them in Action! 🎬</h2>
        <CodeSnippet {...examples.basicTypes} />
        
        <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-2">Remember! 💡</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Text always goes in double quotes: "like this"</li>
            <li>• Single characters go in single quotes: 'A'</li>
            <li>• Numbers don't need quotes: 42</li>
            <li>• true and false don't need quotes</li>
          </ul>
        </div>
      </section>

      {/* Real World Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">A Real Example 🎯</h2>
        <p className="text-gray-300">Here's how we might store information about a student:</p>
        <CodeSnippet {...examples.simpleExample} />
      </section>

      {/* Practice Time */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Your Turn! 💪</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <p className="text-gray-300 mb-4">
            Try creating a program about yourself! Store and display:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
            <li>Your name (use String)</li>
            <li>Your age (use int)</li>
            <li>Your favorite grade (use char)</li>
            <li>Whether you're a student (use boolean)</li>
          </ul>
          <CodeEditor defaultCode={examples.practiceQuestion.code} />
        </div>
      </section>

      {/* Tips Section */}
      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <h3 className="text-lg font-medium text-blue-400 mb-2">Quick Tips 💡</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Use <code className="text-blue-400">int</code> for counting things</li>
          <li>Use <code className="text-blue-400">double</code> for measurements</li>
          <li>Use <code className="text-blue-400">String</code> for any text</li>
          <li>Use <code className="text-blue-400">char</code> for single characters</li>
          <li>Use <code className="text-blue-400">boolean</code> for yes/no decisions</li>
        </ul>
      </div>
    </div>
  );
};

export default DatatypesinJava;