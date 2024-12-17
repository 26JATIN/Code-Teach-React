import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';

const Syntexofjava = () => {
  const examples = {
    basicStructure: {
      title: '🏗️ Java Program Structure',
      code: `// This is a comment
public class MyProgram {
    public static void main(String[] args) {
        // Your code goes here
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    helloWorld: {
      title: '👋 Hello World Example',
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    emptyTemplate: {
      code: ''  // Changed from ' ' to '' to prevent unwanted space
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Understanding Java Syntax 📝
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Java syntax is like the grammar rules of the language. Just as English has rules for forming 
          sentences, Java has rules for writing programs. Let's explore these rules! 🚀
        </p>
      </div>

      {/* Program Structure Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Essential Components 📌</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📦</span>
              <span>Class Declaration</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Main Method</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔤</span>
              <span>Statements & Expressions</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Syntax Rules ⚡</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">✨</span>
              <span>Each statement ends with a semicolon</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🎨</span>
              <span>Code blocks are enclosed in curly braces</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📝</span>
              <span>Case-sensitive language</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Program Structure 🏗️</h2>
        <CodeSnippet {...examples.basicStructure} />
        
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <p className="text-gray-300">
            Every Java program must have a <code className="text-blue-400">class</code> and a 
            <code className="text-blue-400"> main</code> method. This is where your program starts executing!
          </p>
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-yellow-400 font-medium">🌟 Note for Beginners</p>
            <p className="text-gray-300 mt-2">
              Don't worry about understanding classes and methods in detail right now! For now, just remember this basic structure like a template. Think of it as a magic formula that makes your Java programs work. We'll explain every part in detail later in the course. Just focus on the code you write inside the main method!
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Your First Program: Hello World! 👋</h2>
        <CodeSnippet {...examples.helloWorld} />
        
        {/* Add this new explanation div */}
        <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
          <h3 className="text-lg font-medium text-blue-400">Understanding System.out.println 🖨️</h3>
          <p className="text-gray-300">
            Let's break down <code className="text-blue-400">System.out.println()</code>:
          </p>
          <ul className="space-y-2 text-gray-300 list-disc list-inside pl-4">
            <li><code className="text-blue-400">System</code> - The built-in Java class that contains useful tools</li>
            <li><code className="text-blue-400">out</code> - The output stream to display information</li>
            <li><code className="text-blue-400">println</code> - The method that prints text and adds a new line</li>
            <li>Think of it as telling Java: "Hey, display this message on the screen!"</li>
          </ul>
        </div>
      </section>

      {/* Add this new warning section */}
      <section className="space-y-4">
        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
          <h3 className="text-lg font-medium text-red-400 flex items-center gap-2 mb-2">
            <span>⚠️ Important Note for VS Code Users</span>
          </h3>
          <p className="text-gray-300 mb-3">
            When coding in VS Code or any IDE, the name of your Java file <strong>must match</strong> the name of your public class. For example:
          </p>
          
          {/* Code example with highlighted matching parts */}
          <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-sm mb-4">
            <div className="space-y-1">
              <div className="border-b-2 border-yellow-400/50 pb-1 mb-2">
                <p className="text-blue-400">{'// File: '}<span className="underline decoration-yellow-400 decoration-wavy decoration-2">HelloWorld</span>.java</p>
                <p className="text-gray-300">public class <span className="underline decoration-yellow-400 decoration-wavy decoration-2">HelloWorld</span> &#123;</p>
              </div>
              <p className="text-gray-300 ml-4">    public static void main(String[] args) &#123;</p>
              <p className="text-gray-300 ml-8">{'    // Your code here'}</p>
              <p className="text-gray-300 ml-4">    &#125;</p>
              <p className="text-gray-300">&#125;</p>
            </div>
          </div>

          {/* Screenshot area */}
          <div className="mt-4 p-4 border-2 border-dashed border-yellow-500/30 rounded-lg bg-black/30">
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="text-center text-gray-400">
                <p className="text-sm mb-2">👇 Real-world Example 👇</p>
                <p className="text-xs">Screenshot showing file name and class name in VS Code will be added here</p>
              </div>
            </div>
          </div>

          <p className="text-red-400 mt-3 text-sm flex items-center gap-2">
            <span>❌</span>
            <span>If they don't match, your code won't compile!</span>
          </p>
        </div>
      </section>

      {/* Interactive Code Editor */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Try It Yourself! 💻</h2>
        <div className="space-y-2">
          <p className="text-gray-300">
            Write your first Java program completely from scratch! Try to recreate the Hello World program by typing everything yourself.
          </p>
          <p className="text-yellow-400 text-sm">
            ℹ️ File name: <code className="bg-gray-800/50 px-2 py-0.5 rounded">Main.java</code>
          </p>
        </div>
        <CodeEditor defaultCode=" " />
      </section>
    </div>
  );
};

export default Syntexofjava;
