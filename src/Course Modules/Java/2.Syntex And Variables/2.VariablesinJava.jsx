import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
// Remove NextButton import

const VariablesinJava = () => {  // Remove props
  const examples = {
    variableDeclaration: {
      title: '📝 Variable Declaration',
      code: `// Basic variable declaration
int age = 25;
String name = "John";
double price = 19.99;
boolean isStudent = true;`,
      showLineNumbers: true,
      showCopyButton: true
    },
    namingConventions: {
      title: '🏷️ Naming Conventions',
      code: `// Good variable names
int userAge = 25;
String firstName = "John";
double priceInDollars = 19.99;

// Bad variable names (avoid these)
int a = 25;          // too short
String NAME = "John"; // uppercase for regular variables
double p$ = 19.99;    // special characters`,
      showLineNumbers: true,
      showCopyButton: true
    },
    bestPractices: {
      title: '✨ Best Practices Example',
      code: `public class VariableExample {
    // Class-level constants (use uppercase)
    private static final double TAX_RATE = 0.08;
    
    public static void main(String[] args) {
        // Descriptive variable names
        int numberOfStudents = 25;
        double totalPrice = 99.99;
        boolean isActive = true;
        
        // Initialize variables when declared
        String statusMessage = "Ready";
        
        // Use meaningful names for calculations
        double priceWithTax = totalPrice * (1 + TAX_RATE);
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },
    keywords: {
      title: '🚫 Reserved Keywords',
      code: `// These are invalid variable names (Don't do this!)
int public = 5;        // Error: 'public' is a keyword
String class = "Test"; // Error: 'class' is a keyword
boolean if = true;     // Error: 'if' is a keyword
int new = 42;         // Error: 'new' is a keyword

// Use these instead
int publicValue = 5;
String className = "Test";
boolean isValid = true;
int newNumber = 42;`,
      showLineNumbers: true,
      showCopyButton: true
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Variables in Java 🎯
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Variables are containers for storing data values in Java. Think of them as labeled boxes where you can store different types of information. Let's learn how to create and use them properly! 📦
        </p>
      </div>

      {/* Variable Basics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-3">Common Data Types 📊</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-2xl">🔢</span>
              <span><code className="text-blue-400">int</code> - Whole numbers</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">💬</span>
              <span><code className="text-blue-400">String</code> - Text</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">📊</span>
              <span><code className="text-blue-400">double</code> - Decimal numbers</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl">✅</span>
              <span><code className="text-blue-400">boolean</code> - True/False</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium text-purple-400 mb-3">Naming Rules ⚡</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-green-400">✓</span>
              <span>Start with letters, $ or _</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-400">✓</span>
              <span>Use camelCase for names</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-400">✗</span>
              <span>Don't start with numbers</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-400">✗</span>
              <span>No keywords as names</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Variable Declaration 📝</h2>
        <CodeSnippet {...examples.variableDeclaration} />
        
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <p className="text-yellow-400 font-medium">🌟 Remember</p>
          <p className="text-gray-300 mt-2">
            Always initialize your variables when you declare them. This is a good practice that helps prevent errors in your code.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Naming Best Practices 🏷️</h2>
        <CodeSnippet {...examples.namingConventions} />
        
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <h3 className="text-lg font-medium text-blue-400 mb-2">Quick Tips 💡</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Use descriptive names that explain the purpose</li>
            <li>Keep names short but meaningful</li>
            <li>Use camelCase for variable names</li>
            <li>Use UPPERCASE for constants</li>
          </ul>
        </div>
      </section>

      {/* Add this new section before Warning Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Reserved Keywords ⛔</h2>
        <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-red-500/10 rounded-xl border border-yellow-500/20">
          <p className="text-gray-300 mb-4">
            Keywords are special words that Java reserves for its own use. You cannot use these words as variable names because they have special meaning in the language.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
            <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50">
              <code className="text-yellow-400">public</code>
            </div>
            <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50">
              <code className="text-yellow-400">class</code>
            </div>
            <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50">
              <code className="text-yellow-400">void</code>
            </div>
            <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50">
              <code className="text-yellow-400">int</code>
            </div>
            <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50">
              <code className="text-yellow-400">if</code>
            </div>
            <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50">
              <code className="text-yellow-400">else</code>
            </div>
            <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50">
              <code className="text-yellow-400">for</code>
            </div>
            <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50">
              <code className="text-yellow-400">while</code>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            <p className="mb-2">💡 <span className="text-yellow-400">Pro Tip:</span> If your code editor shows a word in a different color, it's probably a keyword!</p>
          </div>
        </div>
        
        <CodeSnippet {...examples.keywords} />
      </section>

      {/* Warning Section */}
      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        <h3 className="text-lg font-medium text-red-400 flex items-center gap-2 mb-2">
          <span>⚠️ Common Mistakes to Avoid</span>
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Using reserved keywords as variable names</li>
          <li>Starting variable names with numbers</li>
          <li>Using spaces in variable names</li>
          <li>Not initializing variables before use</li>
        </ul>
      </div>

      {/* Replace Practice Section with Summary Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Summary 📚</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-green-400">✓</span>
              <span>Variables are containers for storing data</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-400">✓</span>
              <span>Always initialize variables when declaring them</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-400">✓</span>
              <span>Use meaningful and descriptive names</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-400">✓</span>
              <span>Follow Java naming conventions</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default VariablesinJava;
