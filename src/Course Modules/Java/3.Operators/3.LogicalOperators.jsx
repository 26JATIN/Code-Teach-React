import React from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import CodeEditor from '../../../Frontend/Components/Code Components/CodeEditor';

const LogicalOperators = () => {
  const examples = {
    whatAreLogicalOperators: {
      title: '🤔 What are Logical Operators?',
      code: `public class LogicalOperatorsIntro {
    public static void main(String[] args) {
        // Logical operators help us make decisions based on multiple conditions
        boolean isSunny = true;
        boolean isWarm = true;
        
        // We can check if it's a good day for the beach
        boolean isGoodBeachDay = isSunny && isWarm;
        System.out.println("Is it a good beach day? " + isGoodBeachDay); // true
        
        // We can check if we need an umbrella
        boolean isRaining = false;
        boolean isSnowing = false;
        boolean needUmbrella = isRaining || isSnowing;
        System.out.println("Do I need an umbrella? " + needUmbrella); // false
    }
}`
    },

    andOperator: {
      title: '👥 AND Operator (&&)',
      code: `public class ANDOperatorExample {
    public static void main(String[] args) {
        // AND operator returns true only if BOTH conditions are true
        int age = 25;
        boolean hasLicense = true;
        
        // Can this person drive?
        boolean canDrive = age >= 18 && hasLicense;
        System.out.println("Can drive? " + canDrive); // true
        
        // Multiple conditions with AND
        boolean hasCar = true;
        boolean hasInsurance = true;
        boolean canDriveLegally = age >= 18 && hasLicense && hasCar && hasInsurance;
        System.out.println("Can drive legally? " + canDriveLegally); // true
        
        // Truth table demonstration
        System.out.println("true && true = " + (true && true));     // true
        System.out.println("true && false = " + (true && false));   // false
        System.out.println("false && true = " + (false && true));   // false
        System.out.println("false && false = " + (false && false)); // false
    }
}`
    },

    orOperator: {
      title: '🔀 OR Operator (||)',
      code: `public class OROperatorExample {
    public static void main(String[] args) {
        // OR operator returns true if ANY condition is true
        boolean hasCreditCard = false;
        boolean hasDebitCard = true;
        
        // Can this person pay electronically?
        boolean canPayElectronically = hasCreditCard || hasDebitCard;
        System.out.println("Can pay electronically? " + canPayElectronically); // true
        
        // Multiple conditions with OR
        boolean hasCash = true;
        boolean hasPaypal = false;
        boolean canPay = hasCreditCard || hasDebitCard || hasCash || hasPaypal;
        System.out.println("Can pay somehow? " + canPay); // true
        
        // Truth table demonstration
        System.out.println("true || true = " + (true || true));     // true
        System.out.println("true || false = " + (true || false));   // true
        System.out.println("false || true = " + (false || true));   // true
        System.out.println("false || false = " + (false || false)); // false
    }
}`
    },

    notOperator: {
      title: '❌ NOT Operator (!)',
      code: `public class NOTOperatorExample {
    public static void main(String[] args) {
        // NOT operator reverses the boolean value
        boolean isLoggedIn = true;
        boolean isNotLoggedIn = !isLoggedIn;
        System.out.println("Is not logged in? " + isNotLoggedIn); // false
        
        // Using NOT with conditions
        int age = 15;
        boolean isAdult = age >= 18;
        boolean isMinor = !isAdult;
        System.out.println("Is a minor? " + isMinor); // true
        
        // Double negative
        boolean isNotNotLoggedIn = !!isLoggedIn;
        System.out.println("Is not not logged in? " + isNotNotLoggedIn); // true
        
        // Truth table demonstration
        System.out.println("!true = " + (!true));   // false
        System.out.println("!false = " + (!false)); // true
    }
}`
    },

    complexConditions: {
      title: '🧩 Complex Conditions',
      code: `public class ComplexConditions {
    public static void main(String[] args) {
        int age = 25;
        boolean hasMembership = true;
        boolean isHoliday = false;
        boolean isWeekend = true;
        
        // Complex condition with AND and OR
        boolean canEnterClub = 
            (age >= 21 && hasMembership) || 
            (age >= 25 && isWeekend && !isHoliday);
            
        System.out.println("Can enter club? " + canEnterClub); // true
        
        // Using parentheses to control evaluation order
        boolean condition1 = true;
        boolean condition2 = false;
        boolean condition3 = true;
        
        // These give different results:
        boolean result1 = condition1 && condition2 || condition3;  // true
        boolean result2 = condition1 && (condition2 || condition3); // true
        boolean result3 = (condition1 && condition2) || condition3; // true
        
        System.out.println("Result 1: " + result1);
        System.out.println("Result 2: " + result2);
        System.out.println("Result 3: " + result3);
    }
}`
    },

    practiceQuestions: {
      basic: {
        title: '🎯 Practice: Basic Logical Operations',
        code: `public class BasicLogicalPractice {
    public static void main(String[] args) {
        // TODO: Write code to solve these problems:
        
        // 1. Create two boolean variables and print the result of:
        //    - AND operation
        //    - OR operation
        //    - NOT operation on each variable
        
        // 2. Create a program that checks if a person can vote:
        //    - Must be 18 or older
        //    - Must be a citizen
        //    - Must be registered
        
        // Write your code here
    }
}`
      },
      intermediate: {
        title: '🎯 Practice: Theme Park Rides',
        code: `public class ThemeParkRides {
    public static void main(String[] args) {
        // TODO: Create a program that determines if someone can ride:
        // 1. Roller Coaster:
        //    - Must be at least 4 feet tall
        //    - Must be at least 12 years old
        //    - Must not have a heart condition
        
        // 2. Water Slide:
        //    - Must be at least 48 inches tall
        //    - Must know how to swim
        //    - Must not be afraid of heights
        //    - OR must be accompanied by an adult
        
        // Write your code here
    }
}`
      },
      advanced: {
        title: '🎯 Practice: Game Access System',
        code: `public class GameAccessSystem {
    public static void main(String[] args) {
        // TODO: Create a complex game access system that checks:
        // 1. Player can play ranked matches if:
        //    - Is level 10 or higher
        //    - Has completed tutorial
        //    - Has won at least 5 matches
        //    - Is not currently banned
        
        // 2. Player can enter tournament if:
        //    - Meets ranked matches criteria
        //    - Is in top 100 players OR has tournament pass
        //    - Has stable internet connection
        //    - Has paid entry fee OR has VIP status
        
        // Write your code here
    }
}`
      }
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
        <CodeSnippet {...examples.whatAreLogicalOperators} />
        <CodeSnippet {...examples.andOperator} />
        <CodeSnippet {...examples.orOperator} />
        <CodeSnippet {...examples.notOperator} />
        <CodeSnippet {...examples.complexConditions} />
        
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-2">Pro Tip! 💡</h3>
          <p className="text-gray-300">
            When using multiple logical operators, use parentheses to make your code clearer 
            and control the order of evaluation!
          </p>
        </div>
      </section>

      {/* Truth Table Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-400">Truth Tables 📊</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="text-lg font-medium text-blue-400 mb-3">AND (&&) Table</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium text-gray-400">A</div>
              <div className="font-medium text-gray-400">B</div>
              <div className="font-medium text-gray-400">Result</div>
              <div className="text-gray-300">true</div>
              <div className="text-gray-300">true</div>
              <div className="text-green-400">true</div>
              <div className="text-gray-300">true</div>
              <div className="text-gray-300">false</div>
              <div className="text-red-400">false</div>
              <div className="text-gray-300">false</div>
              <div className="text-gray-300">true</div>
              <div className="text-red-400">false</div>
              <div className="text-gray-300">false</div>
              <div className="text-gray-300">false</div>
              <div className="text-red-400">false</div>
            </div>
          </div>

          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-medium text-purple-400 mb-3">OR (||) Table</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium text-gray-400">A</div>
              <div className="font-medium text-gray-400">B</div>
              <div className="font-medium text-gray-400">Result</div>
              <div className="text-gray-300">true</div>
              <div className="text-gray-300">true</div>
              <div className="text-green-400">true</div>
              <div className="text-gray-300">true</div>
              <div className="text-gray-300">false</div>
              <div className="text-green-400">true</div>
              <div className="text-gray-300">false</div>
              <div className="text-gray-300">true</div>
              <div className="text-green-400">true</div>
              <div className="text-gray-300">false</div>
              <div className="text-gray-300">false</div>
              <div className="text-red-400">false</div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        <h3 className="text-lg font-medium text-red-400 flex items-center gap-2 mb-2">
          <span>⚠️ Watch Out For These!</span>
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Forgetting parentheses around complex conditions</li>
          <li>Confusing && (AND) with || (OR)</li>
          <li>Not considering all possible combinations</li>
          <li>Incorrect order of operations with multiple logical operators</li>
        </ul>
      </div>

      {/* Summary Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-400">Quick Summary 📝</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="text-lg font-medium text-blue-400 mb-3">AND (&&)</h3>
            <p className="text-gray-300">Both conditions must be true</p>
          </div>
          
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-medium text-purple-400 mb-3">OR (||)</h3>
            <p className="text-gray-300">At least one must be true</p>
          </div>

          <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
            <h3 className="text-lg font-medium text-green-400 mb-3">NOT (!)</h3>
            <p className="text-gray-300">Reverses the condition</p>
          </div>
        </div>
      </section>

      {/* Practice Section - Moved to end */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-green-400">Time to Practice! 🎯</h2>
        
        {/* Basic Practice */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Level 1: Basic Logical Operations</h3>
          <p className="text-gray-300 mb-4">
            Start with basic logical operations and simple combinations of conditions.
          </p>
          <CodeEditor defaultCode={examples.practiceQuestions.basic.code} />
        </div>

        {/* Intermediate Practice */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Level 2: Theme Park Rides</h3>
          <p className="text-gray-300 mb-4">
            Apply logical operators to real-world scenarios with multiple conditions.
          </p>
          <CodeEditor defaultCode={examples.practiceQuestions.intermediate.code} />
        </div>

        {/* Advanced Practice */}
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl font-medium text-green-400 mb-3">Level 3: Game Access System</h3>
          <p className="text-gray-300 mb-4">
            Master complex combinations of logical operators in a game system.
          </p>
          <CodeEditor defaultCode={examples.practiceQuestions.advanced.code} />
        </div>

        {/* Practice Tips */}
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <h3 className="text-lg font-medium text-yellow-400 mb-2">Practice Tips 💡</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Start with the basic practice and work your way up</li>
            <li>Try to solve each problem without looking at solutions</li>
            <li>Test your code with different input combinations</li>
            <li>Challenge yourself to make the conditions more complex</li>
          </ul>
        </div>
      </section>

      {/* Next Steps */}
      <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
        <h3 className="text-lg font-medium text-green-400 mb-2">🎯 What's Next?</h3>
        <p className="text-gray-300">
          Ready to move on? Next, we'll explore control flow statements like if-else and loops 
          where you'll put these logical operators to great use!
        </p>
      </div>
    </div>
  );
};

export default LogicalOperators;
