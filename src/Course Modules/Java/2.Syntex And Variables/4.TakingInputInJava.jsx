import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';

const TakingInputInJava = () => {
  const examples = {
    basicInput: {
      title: '📥 Basic Input Example',
      code: `import java.util.Scanner;

public class BasicInput {
    public static void main(String[] args) {
        // Create a Scanner object
        Scanner scanner = new Scanner(System.in);
        
        // Get text input
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        
        // Get number input
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        
        // Print the input
        System.out.println("Hello " + name + "! You are " + age + " years old.");
        
        // Close the scanner
        scanner.close();
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    differentInputTypes: {
      title: '🎯 Different Types of Input',
      code: `import java.util.Scanner;

public class InputTypes {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // String input
        System.out.print("Enter text: ");
        String text = scanner.nextLine();
        
        // Integer input
        System.out.print("Enter number: ");
        int number = scanner.nextInt();
        
        // Double input
        System.out.print("Enter decimal: ");
        double decimal = scanner.nextDouble();
        
        // Boolean input
        System.out.print("Enter true/false: ");
        boolean flag = scanner.nextBoolean();
        
        scanner.close();
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    inputValidation: {
      title: '✅ Input Validation Example',
      code: `import java.util.Scanner;

public class SafeInput {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Safe number input
        int age = 0;
        System.out.print("Enter your age: ");
        while (!scanner.hasNextInt()) {
            System.out.print("Please enter a valid number: ");
            scanner.next(); // Clear invalid input
        }
        age = scanner.nextInt();
        
        System.out.println("Your age is: " + age);
        scanner.close();
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    practiceQuestion: {
      title: '🎯 Practice Example',
      code: `import java.util.Scanner;

public class StudentDetails {
    public static void main(String[] args) {
        // Create a Scanner and get:
        // 1. Student's name
        // 2. Student's age
        // 3. Student's grade (as a decimal)
        // 4. Is the student passing? (true/false)
        
        // Then print all the information!
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Taking Input in Java 🎮
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Want to make your programs interactive? Let's learn how to get input from users! 
          Think of it like having a conversation with your computer. We'll use something called 
          a Scanner - it's like a helper that reads what users type! 🎯
        </p>
      </div>

      {/* Scanner Introduction Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Meet the Scanner 📱</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="text-xl font-medium text-blue-400 mb-4">Getting Started 🚀</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <p className="text-sm">First, import the Scanner:</p>
                  <code className="text-blue-400">import java.util.Scanner;</code>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <p className="text-sm">Create a Scanner:</p>
                  <code className="text-blue-400">Scanner scanner = new Scanner(System.in);</code>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <h3 className="text-xl font-medium text-purple-400 mb-4">Common Methods 🛠️</h3>
            <ul className="space-y-3 text-gray-300">
              <li>• <code>nextLine()</code> - Read text</li>
              <li>• <code>nextInt()</code> - Read whole numbers</li>
              <li>• <code>nextDouble()</code> - Read decimal numbers</li>
              <li>• <code>nextBoolean()</code> - Read true/false</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Basic Example Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Let's Try It! 🎮</h2>
        <p className="text-gray-300">Here's a simple example of getting input:</p>
        <CodeSnippet {...examples.basicInput} />
      </section>

      {/* Different Types Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Different Types of Input 📝</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <p className="text-gray-300 mb-4">Scanner can read different types of input:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li><code className="text-blue-400">nextLine()</code> - For text like names</li>
            <li><code className="text-blue-400">nextInt()</code> - For whole numbers</li>
            <li><code className="text-blue-400">nextDouble()</code> - For decimal numbers</li>
            <li><code className="text-blue-400">nextBoolean()</code> - For true/false values</li>
          </ul>
        </div>
        <CodeSnippet {...examples.differentInputTypes} />
      </section>

      {/* Input Validation Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Making It Safe 🛡️</h2>
        <p className="text-gray-300">Sometimes users type wrong things. Here's how to handle that:</p>
        <CodeSnippet {...examples.inputValidation} />
      </section>

      {/* Practice Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Your Turn! 💪</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <p className="text-gray-300 mb-4">
            Create a program that asks for student details:
          </p>
          <CodeEditor defaultCode={examples.practiceQuestion.code} />
        </div>
      </section>

      {/* Tips Section */}
      <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-lg font-medium text-yellow-400 mb-2">Important Tips! 💡</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Always close your Scanner when done</li>
          <li>Be careful mixing nextLine() with other methods</li>
          <li>Add clear prompts for users</li>
          <li>Always validate important input</li>
        </ul>
      </div>
    </div>
  );
};

export default TakingInputInJava;
