import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';
import RunCode from '../../../Frontend/Components/Code Components/RunCode';  // Add this import

const TakingInputInJava = () => {
  const examples = {
    basicInput: {
      title: '📥 Your First Input Program',
      code: `// First, we need to import Scanner - it's like borrowing a special tool
import java.util.Scanner;

public class MyFirstInput {
    public static void main(String[] args) {
        // Step 1: Create our Scanner tool
        Scanner scan = new Scanner(System.in);
        
        // Step 2: Ask the user for their name
        System.out.println("What is your name? ");
        
        // Step 3: Wait for user to type their name and save it
        String name = scan.nextLine();
        
        // Step 4: Say hello to the user
        System.out.println("Hello " + name + "! Nice to meet you!");
        
        // Step 5: Always clean up - close the scanner
        scan.close();
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    simpleCalculator: {
      title: '🔢 Getting Numbers from Users',
      code: `import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        // Create our Scanner
        Scanner scan = new Scanner(System.in);
        
        // Ask for the first number
        System.out.println("Enter first number: ");
        int number1 = scan.nextInt();
        
        // Ask for the second number
        System.out.println("Enter second number: ");
        int number2 = scan.nextInt();
        
        // Add the numbers and show result
        int sum = number1 + number2;
        System.out.println("The sum is: " + sum);
        
        scan.close();
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    differentTypes: {
      title: '📝 Getting Different Types of Input',
      code: `import java.util.Scanner;

public class UserDetails {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        // Getting text (String) input
        System.out.println("What is your name? ");
        String name = scan.nextLine();
        
        // Getting whole number (int) input
        System.out.println("How old are you? ");
        int age = scan.nextInt();
        
        // Getting decimal (double) input
        System.out.println("How tall are you (in meters)? ");
        double height = scan.nextDouble();
        
        // Printing everything back
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height + " meters");
        
        scan.close();
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    practiceQuestion: {
      title: '🎯 Let\'s Practice!',
      code: `import java.util.Scanner;

public class AboutYou {
    public static void main(String[] args) {
        // Create a Scanner
        Scanner scan = new Scanner(System.in);
        
        // TODO: Ask the user for:
        // 1. Their favorite color
        // 2. Their lucky number
        // Then print a message using both inputs!
        
        scan.close();
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
        Let's Learn About Taking Input! 🎮
      </h1>

      {/* Friendly Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Hey there! 👋 Today we're going to learn something super cool - how to make our programs 
          talk to us! Instead of just showing messages, we'll make programs that can ask questions 
          and remember our answers. It's like having a conversation with your computer! 🗣️💻
        </p>
      </div>

      {/* Scanner Explanation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">First, Meet Your New Friend: Scanner! 🤝</h2>
        
        <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-4">What's a Scanner? 🤔</h3>
          <p className="text-gray-300 mb-4">
            Think of Scanner like a friendly robot that helps your program read things! 
            Just like you use your eyes to read, your program uses Scanner to read what 
            you type. It's that simple! 🤖
          </p>

          <div className="mt-4 space-y-4">
            <div className="bg-black/30 p-4 rounded-lg">
              <h4 className="text-green-400 mb-2">How to Use Scanner:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>First, tell Java you want to use Scanner (import it)</li>
                <li>Create a new Scanner</li>
                <li>Use it to read input</li>
                <li>When done, close it (clean up)</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* First Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Your First Input Program! 🎉</h2>
        <div className="p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <p className="text-gray-300 mb-4">
            Let's write a program that asks for your name and says hello! 
            We'll go through it line by line: 👇
          </p>
        </div>
        <CodeSnippet {...examples.basicInput} />
        
        <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-medium text-blue-400 mb-4">Let's Break It Down! 📝</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <code className="text-blue-400">import java.util.Scanner;</code>
                <p className="mt-1">This line tells Java we want to use the Scanner tool</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <code className="text-blue-400">Scanner scan = new Scanner(System.in);</code>
                <p className="mt-1">Creates our Scanner tool and names it 'scan'</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <code className="text-blue-400">String name = scan.nextLine();</code>
                <p className="mt-1">Waits for user to type something and saves it in 'name'</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">4️⃣</span>
              <div>
                <code className="text-blue-400">scan.close();</code>
                <p className="mt-1">Tells Java we're done using Scanner</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Reading Different Types */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Reading Different Types of Input 📚</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="text-xl font-medium text-blue-400 mb-4">Scanner's Special Powers 🦸‍♂️</h3>
            <ul className="space-y-3 text-gray-300">
              <li>• <code>nextLine()</code> - Reads text (like names)</li>
              <li>• <code>nextInt()</code> - Reads whole numbers</li>
              <li>• <code>nextDouble()</code> - Reads decimal numbers</li>
            </ul>
          </div>
          
          <div className="p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <h3 className="text-xl font-medium text-purple-400 mb-4">Remember! 🧠</h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Always show a message before asking for input</li>
              <li>• Use the right method for the right type</li>
              <li>• Don't forget to close your Scanner</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Practice Time */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Your Turn! 🎯</h2>
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <p className="text-gray-300 mb-4">
            Let's write a program that asks for your favorite color and lucky number! 
            Try completing this code:
          </p>
          <div className="space-y-4">
            <CodeEditor defaultCode={examples.practiceQuestion.code} />
            <RunCode 
              testCases={[
                {
                  input: ["Blue", "7"],
                  expected: "Your favorite color is Blue and your lucky number is 7!"
                },
                {
                  input: ["Red", "13"],
                  expected: "Your favorite color is Red and your lucky number is 13!"
                }
              ]}
              defaultCode={examples.practiceQuestion.code}
            />
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-lg font-medium text-yellow-400 mb-2">Friendly Reminders! 💝</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Always import Scanner at the top</li>
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
