import React from 'react';
// Remove NextButton import

// Timeline component for better visualization
const TimelineEvent = ({ year, title, description }) => (
  <div className="relative pl-8 py-4 transition-all duration-300 hover:scale-[1.02]">
    <div className="absolute left-0 top-0 mt-7 -ml-1.5 h-3 w-3 rounded-full border-2 border-blue-400 bg-gray-900"></div>
    <div className="absolute left-0 top-0 mt-8 h-full w-px bg-gradient-to-b from-blue-500/50 to-transparent"></div>
    <div className="text-blue-400 font-mono text-sm">{year}</div>
    <h3 className="text-lg font-medium text-gray-200 mt-1">{title}</h3>
    <p className="text-gray-300 mt-1">{description}</p>
  </div>
);

const History = () => {  // Remove props
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        The Journey of Java ☕
      </h1>

      {/* Hero Section */}
      <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          Ever wondered how one of the world's most popular programming languages came to be? 
          Let's travel back in time to 1991, when a small team at Sun Microsystems embarked on 
          a journey that would revolutionize the world of programming! 🚀
        </p>
      </div>

      {/* Birth of Java Section */}
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          The Birth of a Programming Legend 🌟
        </h2>
        
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-700/10 rounded-xl border border-green-500/20 
          transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <span className="text-3xl">👨‍💻</span>
            </div>
            <div>
              <h3 className="text-xl font-medium text-green-400">The Green Team</h3>
              <p className="mt-2 text-gray-300">
                Led by James Gosling, the team set out to create a language for digital devices. 
                Originally called "Oak" (after a tree outside Gosling's office), it later became Java!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Java Through the Years 📅</h2>
        <div className="border-l border-blue-500/20 ml-4">
          <TimelineEvent 
            year="1991"
            title="The Green Project Begins"
            description="James Gosling and team start working on a new programming language for digital devices."
          />
          <TimelineEvent 
            year="1995"
            title="First Public Release"
            description="Java 1.0 is released with the promise: Write Once, Run Anywhere!"
          />
          <TimelineEvent 
            year="1996"
            title="JavaScript Partnership"
            description="Netscape and Sun form an alliance, bringing Java to web browsers."
          />
          <TimelineEvent 
            year="2010"
            title="Oracle Acquisition"
            description="Oracle Corporation acquires Sun Microsystems and takes over Java development."
          />
          <TimelineEvent 
            year="Present"
            title="Java Today"
            description="Powers Android apps, enterprise software, and remains one of the most popular programming languages."
          />
        </div>
      </div>

      {/* Fun Facts Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl border border-purple-500/20 
          transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10">
          <h3 className="text-xl font-medium text-purple-400 flex items-center gap-2">
            <span>☕</span> Why "Java"?
          </h3>
          <p className="mt-2 text-gray-300">
            The name Java was inspired by Java coffee, a favorite among the language's creators. 
            That's why the logo is a coffee cup!
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20 
          transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10">
          <h3 className="text-xl font-medium text-blue-400 flex items-center gap-2">
            <span>🎮</span> Famous Java Apps
          </h3>
          <p className="mt-2 text-gray-300">
            Minecraft, Eclipse IDE, and most Android apps are built with Java. 
            Even NASA has used Java for some of their projects!
          </p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8 p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
        <h3 className="text-xl font-medium text-yellow-400 mb-3">🎯 Why Java Succeeded</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✨</span>
            <span>Simple and Easy to Learn</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">🔒</span>
            <span>Secure and Robust</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">🌐</span>
            <span>Platform Independent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">🎯</span>
            <span>Object-Oriented</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
