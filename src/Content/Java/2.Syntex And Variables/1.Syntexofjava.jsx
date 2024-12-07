import React from 'react';
import CodeEditor from '../../Components/CodeEditor';
import NextButton from '../../Components/NextButton';
import CodeSnippet from '../../Components/CodeSnippet';

const Syntexofjava = ({ nextModule, onNext }) => {
  const examples = {
    classStructure: {
      title: '📘 Basic Class Structure',
      code: `public class MyProgram {
    // Your code goes here!
}`,
      showLineNumbers: true,
      showCopyButton: true,
      collapsible: true
    },
    mainMethod: {
      title: '🎯 Main Method Structure',
      code: `public static void main(String[] args) {
    System.out.println("Hello!");  // Print statement
}`,
      showLineNumbers: true,
      showCopyButton: true,
      collapsible: true
    },
    fullProgram: {
      title: '🚀 Complete Java Program',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      showLineNumbers: true,
      showCopyButton: true,
      showFontControls: true
    },
    semicolons: {
      title: '⚠️ Statement Examples',
      code: `// Print something to the screen
System.out.println("Hello, Java!");  // Don't forget the semicolon!

// This won't work - missing semicolon
System.out.println("Oops")`,
      showLineNumbers: true,
      collapsible: true
    },
    comparisonExample: {
      title: '✅ Class Naming Convention',
      code: `// ❌ Wrong - class name should start with capital letter
public class main {
}

// ✅ Correct - class name starts with capital letter
public class Main {
}`,
      showLineNumbers: true,
      showCopyButton: true
    }
  };

  const syntaxElements = [
    { color: '#3B82F6', label: 'Keywords', description: 'Special words like public, class, static, void' },
    { color: '#22D3EE', label: 'Class Names', description: 'Names of classes like Main, MyProgram' },
    { color: '#F59E0B', label: 'Methods', description: 'Function names like main, println' },
    { color: '#FB7185', label: 'Strings', description: 'Text between quotes like "Hello, World!"' },
    { color: '#9CA3AF', label: 'Comments', description: 'Code explanations starting with //' }
  ];

  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div>
        <h1 className="text-4xl font-bold">Java Syntax: Your First Steps 🚀</h1>
        <p className="mt-4 text-gray-300">
          Think of Java syntax as the building blocks of your program - like LEGO pieces that fit together in specific ways. 
          Let's learn how to write code that Java can understand! 🎨
        </p>
      </div>

      {/* Code Sections */}
      <section className="space-y-6">
        <h2 className="text-2xl">Basic Class Structure 📘</h2>
        <CodeSnippet {...examples.classStructure} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl">Understanding Java Syntax 🎨</h2>
        <CodeSnippet {...examples.fullProgram} />
        
        <div className="bg-gray-800/30 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-4">Basic syntax elements overview:</p>
          {syntaxElements.map(({ color, label, description }) => (
            <div key={label} className="flex items-center gap-3 mb-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
              <span className="font-medium">{label}:</span>
              <span className="text-gray-400 text-sm">{description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl">The Main Method 🎯</h2>
        <CodeSnippet {...examples.mainMethod} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl">Your Turn: Write Your First Program! 🎯</h2>
        <CodeEditor defaultCode="// Write your first Java program here!" language="java" />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl">Common Mistakes to Avoid ⚠️</h2>
        <CodeSnippet {...examples.comparisonExample} />
      </section>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <NextButton nextModule={nextModule} onNext={onNext} />
      </div>
    </div>
  );
};

export default Syntexofjava;
