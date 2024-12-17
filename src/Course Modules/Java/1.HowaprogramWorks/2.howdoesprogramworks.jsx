import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';

const HowDoesAProgramWork = () => {
  // Code examples with proper titles
  const examples = {
    helloWorld: {
      title: 'Hello World Example',
      code: `public class Hello {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`
    },
    calculator: {
      title: 'Simple Calculator Example',
      code: `public class Main {
  public static void main(String[] args) {
    int x = 5 + 3;
    System.out.println(x);
  }
}`
    },
    simplePrint: {
      title: 'Simple Print Statement',
      code: `System.out.println("Hello!");`
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        How Does a Program Work? 🔄
      </h1>

      <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Imagine you have a LEGO building instruction manual, but it's written in a language your friend 
          doesn't understand. To build the LEGO set together, you need to translate those instructions! 
          That's exactly what happens when your program runs - it's a journey from human-readable code 
          to computer instructions. Let's explore this fascinating process! 🚀
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-blue-700/10 rounded-xl border border-indigo-500/20">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">The Program Journey: From You to Computer 🗺️</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-400 mb-2">1. Source Code (What You Write) ✍️</h3>
              <CodeSnippet {...examples.helloWorld} language="java" />
              <p className="mt-2 text-gray-300">This is your Java code - human-readable and easy to understand!</p>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-400 mb-2">2. Compilation (The Translation) 🔄</h3>
              <div className="flex items-center justify-center p-4 space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Source Code</p>
                  <span className="text-green-400">Hello.java</span>
                </div>
                <div className="text-blue-400">➔</div>
                <div className="p-3 bg-purple-500/20 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Bytecode</p>
                  <span className="text-green-400">Hello.class</span>
                </div>
                <div className="text-blue-400">➔</div>
                <div className="p-3 bg-green-500/20 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Machine Code</p>
                  <span className="text-green-400">01001...</span>
                </div>
              </div>
              <p className="mt-2 text-gray-300">
                Java uses a two-step translation process:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>First, your code becomes bytecode (a middle language)</li>
                  <li>Then, the JVM (Java Virtual Machine) turns it into machine code</li>
                </ul>
              </p>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h3 className="text-lg font-medium text-green-400 mb-2">3. Execution (The Magic Happens) ⚡</h3>
              <div className="space-y-2 text-gray-300">
                <p>Your program runs through these phases:</p>
                <div className="pl-4 border-l-2 border-green-500/30">
                  <p>a. Loading: Program loads into memory</p>
                  <p>b. Verification: JVM checks if code is safe</p>
                  <p>c. Execution: Instructions run one by one</p>
                  <p>d. Memory Management: Java handles memory automatically</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-indigo-700/10 rounded-xl border border-purple-500/20">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">What is JVM? 🤔</h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">
              Think of JVM (Java Virtual Machine) as a special translator that lives in your computer. 
              It's like having a universal translator for Java programs! 🌍
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-lg font-medium text-blue-400 mb-2">Main Jobs of JVM 🎯</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Runs Java programs on any device</li>
                  <li>Manages program memory automatically</li>
                  <li>Ensures program security</li>
                  <li>Optimizes code while running</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-lg font-medium text-green-400 mb-2">Why JVM is Special 🌟</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Write Once, Run Anywhere</li>
                  <li>Automatic Memory Cleaning</li>
                  <li>Makes Programs Faster</li>
                  <li>Keeps Programs Safe</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-gray-300">
                <span className="text-blue-400 font-medium">Fun Fact:</span> The same Java program can run on 
                your phone, computer, or even a smart TV - all thanks to JVM! It's like having a universal 
                adapter for your code. 🔌
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-700/10 rounded-xl border border-green-500/20">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Cool Things to Know! 🌟</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🚀</span>
              <p className="text-gray-300">Java programs can run on any device (Write Once, Run Anywhere)</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🧠</span>
              <p className="text-gray-300">JVM optimizes your code while it runs (Just-In-Time compilation)</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🔄</span>
              <p className="text-gray-300">Java automatically manages memory (Garbage Collection)</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Try It Yourself! 🎯</h2>
          <p className="text-gray-300">
            When you run this simple program:
          </p>
          <CodeSnippet {...examples.simplePrint} language="java" showLineNumbers={false} />
          <div className="mt-4 space-y-2">
            <p className="text-gray-300">Your computer:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 pl-4">
              <li>Reads your source code</li>
              <li>Compiles it to bytecode</li>
              <li>JVM translates it to machine code</li>
              <li>Executes the instructions</li>
              <li>Shows "Hello!" on your screen</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">💻 Interactive Example</h3>
          <div className="space-y-4">
            <CodeSnippet {...examples.calculator} language="java" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowDoesAProgramWork;
