import React from 'react';

// Topic card component for consistent styling
const TopicCard = ({ title, emoji, description, subtopics }) => (
  <div className="p-6 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.01]">
    <div className="flex items-start gap-4">
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <h3 className="text-xl text-blue-400 mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 text-sm">{description}</p>
        <div className="space-y-2">
          {subtopics.map((topic, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-300 group">
              <span className="text-green-400 group-hover:scale-110 transition-transform">▪</span>
              <span className="text-sm">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TopicsCovered = () => {
  const courseContent = [
    {
      title: "Getting Started with Java",
      emoji: "🚀",
      description: "Your first steps into the world of Java programming. We'll start super simple!",
      subtopics: [
        "Installing Java (JDK) and writing your first program",
        "Understanding what makes Java special",
        "Basic program structure and how Java works",
        "Using VS Code or IntelliJ IDEA for coding"
      ]
    },
    {
      title: "Java Building Blocks",
      emoji: "🧱",
      description: "Learn the essential pieces that make up every Java program.",
      subtopics: [
        "Variables - storing different types of data",
        "Numbers, text (Strings), and other data types",
        "Basic math operations and calculations",
        "Converting between different data types"
      ]
    },
    {
      title: "Making Decisions in Code",
      emoji: "🤔",
      description: "Make your programs smart by teaching them to make decisions.",
      subtopics: [
        "If-else statements (like giving your code choices)",
        "Switch statements (handling multiple choices)",
        "Comparison operators (>, <, ==, etc.)",
        "Boolean logic (true/false decisions)"
      ]
    },
    {
      title: "Loops and Repetition",
      emoji: "🔄",
      description: "Make your programs do things over and over without writing the same code.",
      subtopics: [
        "For loops (counting and repeating)",
        "While loops (repeating until something happens)",
        "Break and continue (controlling your loops)",
        "Loop exercises and common patterns"
      ]
    },
    {
      title: "Working with Functions",
      emoji: "🛠️",
      description: "Create reusable blocks of code to organize your programs better.",
      subtopics: [
        "Creating and calling functions",
        "Function parameters and return values",
        "Method overloading (same name, different inputs)",
        "Built-in Java functions you can use"
      ]
    },
    {
      title: "Object-Oriented Basics",
      emoji: "🎨",
      description: "Learn to organize your code like building with LEGO blocks.",
      subtopics: [
        "Classes and Objects (creating your own types)",
        "Properties and Methods (what objects know and can do)",
        "Constructors (creating new objects)",
        "Access modifiers (public, private, protected)"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction Banner */}
      <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/20">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3">
          Your Java Learning Journey 🗺️
        </h1>
        <p className="text-gray-300">
          Don't worry about understanding everything at once! We'll take it step by step, 
          with lots of examples and practice exercises. Think of it like building a house - 
          we'll start with the foundation and work our way up! 🏗️
        </p>
      </div>

      {/* Learning Path */}
      <div className="grid gap-6">
        {courseContent.map((topic, index) => (
          <TopicCard key={index} {...topic} />
        ))}
      </div>

      {/* Practice Section */}
      <div className="p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/20">
        <h2 className="text-xl text-green-400 mb-3">🎯 Practice Makes Perfect!</h2>
        <p className="text-gray-300 mb-4">
          Each section includes:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-gray-300">
            <span className="text-green-400">✓</span>
            <span>Interactive code examples</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <span className="text-green-400">✓</span>
            <span>Hands-on exercises</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <span className="text-green-400">✓</span>
            <span>Mini-projects</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <span className="text-green-400">✓</span>
            <span>Knowledge checks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsCovered;
