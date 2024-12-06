import React from 'react';
import CodeEditor from '../../Components/CodeEditor';

const Syntexofjava = ({ nextModule, onNext }) => {
  const basicExample = `// This is a simple Java program
public class Main {
    public static void main(String[] args) {
        // This line prints "Hello, World!" to the screen
        System.out.println("Hello, World!");
    }
}`;

  return (
    <div className="space-y-6">
      <h1>Writing Your First Java Program 🚀</h1>

      <section className="space-y-4">
        <h2>Understanding Java Program Structure</h2>
        <p>Let's break down a Java program into its essential parts:</p>

        <div className="space-y-6">
          {/* Step 1: Class Declaration */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-blue-400 mb-2">Step 1: Class Declaration</h3>
            <pre className="bg-gray-900/50 p-2 rounded">public class Main { }</pre>
            <ul className="mt-2 space-y-1 text-gray-300">
              <li>• Every Java program must have at least one class</li>
              <li>• The class name must match the file name (Main.java)</li>
              <li>• 'public' means the class is accessible from anywhere</li>
            </ul>
          </div>

          {/* Step 2: Main Method */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-blue-400 mb-2">Step 2: Main Method</h3>
            <pre className="bg-gray-900/50 p-2 rounded">public static void main(String[] args) { }</pre>
            <ul className="mt-2 space-y-1 text-gray-300">
              <li>• This is the entry point of your program</li>
              <li>• Java starts executing code from the main method</li>
              <li>• Every program must have this method</li>
            </ul>
          </div>

          {/* Step 3: Program Statements */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-blue-400 mb-2">Step 3: Program Statements</h3>
            <pre className="bg-gray-900/50 p-2 rounded">System.out.println("Hello, World!");</pre>
            <ul className="mt-2 space-y-1 text-gray-300">
              <li>• Statements are actual instructions for the computer</li>
              <li>• Each statement ends with a semicolon (;)</li>
              <li>• println() is used to print text to the screen</li>
            </ul>
          </div>
        </div>

        {/* Try It Yourself Section */}
        <div className="mt-8">
          <h2 className="text-xl text-green-400 mb-4">👨‍💻 Try It Yourself!</h2>
          <p className="mb-4">
            Here's a complete "Hello, World!" program. Try running it to see what happens!
          </p>
          <CodeEditor defaultCode={basicExample} />
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-900/20 p-4 rounded-lg mt-8">
          <h3 className="text-yellow-400 mb-2">⚠️ Remember</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Java is case-sensitive (Main is different from main)</li>
            <li>• Every opening brace { '{' } needs a closing brace { '}' }</li>
            <li>• Each statement must end with a semicolon</li>
            <li>• Code inside a block is indented for better readability</li>
          </ul>
        </div>
      </section>

      {nextModule && (
        <div className="mt-8">
          <button
            onClick={() => onNext(nextModule.moduleId, nextModule.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next: {nextModule.title} →
          </button>
        </div>
      )}
    </div>
  );
};

export default Syntexofjava;
