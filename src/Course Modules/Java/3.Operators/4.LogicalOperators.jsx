import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';

const LogicalOperators = () => {
  const examples = {
    basicLogical: {
      title: '🤔 Basic Logical Operators',
      code: `public class LogicalBasics {
    public static void main(String[] args) {
        boolean isStudent = true;
        boolean hasID = true;
        boolean isHoliday = false;
        
        // AND operator (&&)
        System.out.println("Can enter library: " + (isStudent && hasID));       // true
        
        // OR operator (||)
        System.out.println("Needs to study: " + (isHoliday || !hasID));        // false
        
        // NOT operator (!)
        System.out.println("School is open: " + !isHoliday);                   // true
        
        // Complex condition
        System.out.println("Can study: " + (isStudent && hasID && !isHoliday)); // true
    }
}`,
      showLineNumbers: true,
      showCopyButton: true
    },

    practiceQuestion1: {
      title: '🎯 Practice: Movie Theater Access',
      code: `public class MovieTheater {
    public static void main(String[] args) {
        // TODO: Create a program that checks if someone can watch a movie
        // Requirements:
        // - Must be 13 or older for PG-13 movies
        // - Must have a valid ticket
        // - Theater must not be full
        // Use logical operators to combine these conditions!
        
        int age = 15;
        boolean hasTicket = true;
        boolean theaterFull = false;
        
        // Your code here to check if they can watch the movie
    }
}`
    },

    practiceQuestion2: {
      title: '🎯 Practice: Game Level Access',
      code: `public class GameAccess {
    public static void main(String[] args) {
        // TODO: Create a program that checks if a player can access a game level
        // Requirements:
        // - Must have completed previous level OR have a special pass
        // - Must have enough health (> 50)
        // - Must not be in penalty time
        
        boolean completedPreviousLevel = true;
        boolean hasSpecialPass = false;
        int health = 75;
        boolean inPenaltyTime = false;
        
        // Your code here to check if they can access the level
    }
}`
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Logical Operators in Java 🧠
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Logical operators help us combine multiple conditions and make complex decisions. 
          They're like the brain of your program, helping it make smart choices! 🤔
        </p>
      </div>

      {/* Operator Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <h3 className="text-lg font-medium text-blue-400 mb-3">AND (&&)</h3>
          <p className="text-gray-300">Both conditions must be true</p>
          <div className="mt-2 text-sm">
            <code className="text-blue-400">true && true = true</code>
            <br />
            <code className="text-blue-400">true && false = false</code>
          </div>
        </div>
        
        <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <h3 className="text-lg font-medium text-purple-400 mb-3">OR (||)</h3>
          <p className="text-gray-300">At least one must be true</p>
          <div className="mt-2 text-sm">
            <code className="text-purple-400">true || false = true</code>
            <br />
            <code className="text-purple-400">false || false = false</code>
          </div>
        </div>

        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-lg font-medium text-green-400 mb-3">NOT (!)</h3>
          <p className="text-gray-300">Reverses the condition</p>
          <div className="mt-2 text-sm">
            <code className="text-green-400">!true = false</code>
            <br />
            <code className="text-green-400">!false = true</code>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">See It In Action! 🚀</h2>
        <CodeSnippet {...examples.basicLogical} />
        
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-2">Pro Tip! 💡</h3>
          <p className="text-gray-300">
            When using multiple logical operators, use parentheses to make your code clearer 
            and control the order of evaluation!
          </p>
        </div>
      </section>

      {/* Practice Section */}
      <section className="space-y-6">
        // ...rest of the component (practice questions, common mistakes, etc.)...
      </section>
    </div>
  );
};

export default LogicalOperators;
