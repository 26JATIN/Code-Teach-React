import React, { useState } from 'react';
import CodeSnippet from '../../../Frontend/Components/Code Components/CodeSnippet';
import Summary from '../../../Frontend/Components/Interface Components/ReadingArea/summary';
import KeyFeatures from '../../../Frontend/Components/Interface Components/ReadingArea/KeyFeatures';
import ImportantNote from '../../../Frontend/Components/Interface Components/ReadingArea/importantnote';
import HandsOn from '../../../Frontend/Components/Interface Components/ReadingArea/handson';
import ConceptExplanation from '../../../Frontend/Components/Interface Components/ReadingArea/ConceptExplanation';
import MistakesToAvoid from '../../../Frontend/Components/Interface Components/ReadingArea/Mistakestoavoid';
import MCQ from '../../../Frontend/Components/practice compnenets/mcq';

const PatternPrograms = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const examples = {
    starPattern: {
      title: '⭐ Basic Star Pattern',
      code: `public class StarPattern {
    public static void main(String[] args) {
        int rows = 5;
        // Print increasing triangle
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
/* Output:
* 
* * 
* * * 
* * * * 
* * * * * 
*/`,
      showLineNumbers: true,
      showCopyButton: true
    },
    numberPattern: {
      title: '🔢 Number Pattern',
      code: `public class NumberPattern {
    public static void main(String[] args) {
        int rows = 5;
        // Print number pyramid
        for (int i = 1; i <= rows; i++) {
            // Print spaces
            for (int j = rows - i; j >= 1; j--) {
                System.out.print(" ");
            }
            // Print numbers
            for (int k = 1; k <= i; k++) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }
}
/* Output:
    1 
   2 2 
  3 3 3 
 4 4 4 4 
5 5 5 5 5 
*/`,
      showLineNumbers: true,
      showCopyButton: true
    }
  };

  const patternFeatures = [
    { icon: "🔄", text: "Uses nested loops" },
    { icon: "📐", text: "Creates visual patterns" },
    { icon: "🎯", text: "Improves logic building" }
  ];

  const applicationFeatures = [
    { icon: "🎨", text: "Visual design" },
    { icon: "🧮", text: "Mathematical patterns" },
    { icon: "🎯", text: "Algorithm practice" }
  ];

  const conceptSections = [
    {
      icon: "🔄",
      title: "Pattern Basics",
      content: [
        "Patterns are created using nested loops",
        "Outer loop controls rows",
        "Inner loop controls columns",
        "Print statement controls pattern elements"
      ],
      code: `for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}`
    },
    {
      icon: "📐",
      title: "Pattern Types",
      content: [
        "Triangle patterns",
        "Square patterns",
        "Number patterns",
        "Character patterns"
      ],
      code: `// Square pattern
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; j++) {
        System.out.print("* ");
    }
    System.out.println();
}`
    }
  ];

  const mcqQuestions = [
    {
      id: 1,
      question: "Which type of loops are typically used in pattern programs?",
      options: [
        "Single for loop",
        "While loop only",
        "Nested for loops",
        "Do-while loop"
      ],
      correctAnswer: 2,
      explanation: "Pattern programs typically use nested for loops where outer loop controls rows and inner loop controls columns."
    },
    {
      id: 2,
      question: "What determines the number of rows in a pattern?",
      options: [
        "Inner loop variable",
        "Outer loop variable",
        "Print statement",
        "Pattern type"
      ],
      correctAnswer: 1,
      explanation: "The outer loop control variable determines the number of rows in a pattern."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Summary 
        title="Pattern Programs in Java 🎨"
        description="Pattern programs are excellent exercises for understanding nested loops and improving logical thinking. They help visualize how loops work and enhance problem-solving skills."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KeyFeatures
          title="Pattern Characteristics 📐"
          items={patternFeatures}
          variant="blue"
        />
        <KeyFeatures
          title="Applications 🎯"
          items={applicationFeatures}
          variant="purple"
        />
      </div>

      <ConceptExplanation sections={conceptSections} />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Pattern Examples 💡</h2>
        <CodeSnippet {...examples.starPattern} />
        <CodeSnippet {...examples.numberPattern} />
      </section>

      <MistakesToAvoid
        title="Common Pattern Programming Mistakes"
        mistakes={[
          "Incorrect loop boundaries",
          "Missing nested loop",
          "Wrong spacing in patterns",
          "Forgetting line breaks"
        ]}
        alternatives={[
          "Double-check loop conditions",
          "Use nested loops for 2D patterns",
          "Add proper spaces between elements",
          "Include System.out.println() for new lines"
        ]}
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-purple-400">Test Your Knowledge 🤓</h2>
        {mcqQuestions.map((question) => (
          <MCQ
            key={question.id}
            question={question}
            selectedAnswer={selectedAnswers[question.id]}
            onAnswerSelect={(id, answer) => setSelectedAnswers(prev => ({...prev, [id]: answer}))}
          />
        ))}
      </section>

      <HandsOn
        title="Practice Exercise 💻"
        description="Create a program to print a diamond pattern using asterisks"
        defaultCode={`public class DiamondPattern {
    public static void main(String[] args) {
        int n = 5;
        // Write code to create a diamond pattern
        // Hint: Combine increasing and decreasing triangles
    }
}`}
      />

      <ImportantNote
        title="Pattern Programming Tips"
        points={[
          "Understand the role of each loop",
          "Visualize the pattern before coding",
          "Start with simple patterns and gradually move to complex ones",
          "Practice regularly to improve"
        ]}
      />
    </div>
  );
};

export default PatternPrograms;
