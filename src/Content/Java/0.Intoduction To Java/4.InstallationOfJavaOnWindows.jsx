import React from 'react';
import NextButton from '../../Components/NextButton';

// Helper component for installation steps
const InstallStep = ({ number, title, children }) => (
  <div className="mb-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
    <h3 className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-mono">
        {number}
      </span>
      <span className="text-xl text-blue-400">{title}</span>
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

// Helper component for screenshot placeholders
const Screenshot = ({ alt, caption }) => (
  <div className="my-4 p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg">
    <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center">
      <span className="text-gray-500">Screenshot: {alt}</span>
    </div>
    {caption && (
      <p className="mt-2 text-sm text-gray-400 text-center">{caption}</p>
    )}
  </div>
);

const InstallationOfJavaOnWindows = ({ nextModule, onNext }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
        Setting Up Your Java Development Environment 🛠️
      </h1>

      {/* Introduction */}
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 mb-8">
        <p className="text-gray-300 text-lg leading-relaxed">
          Let's get your computer ready for Java programming! We'll install two main things:
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Java Development Kit (JDK) - The tools you need to write Java programs</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Visual Studio Code - A powerful and free code editor</span>
            </li>
          </ul>
        </p>
      </div>

      {/* Part 1: Installing Java */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Part 1: Installing Java Development Kit (JDK) 🪛
        </h2>

        <InstallStep number="1" title="Download JDK">
          <p className="text-gray-300">Visit the official Oracle website or use OpenJDK:</p>
          <a 
            href="https://www.oracle.com/java/technologies/downloads/#jdk17-windows" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            Download JDK from Oracle ↗
          </a>
          <Screenshot alt="JDK download page" caption="Oracle JDK download page" />
        </InstallStep>

        <InstallStep number="2" title="Run the Installer">
          <p className="text-gray-300">Double-click the downloaded file and follow these steps:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Accept the license agreement</li>
            <li>Choose installation directory (default is fine)</li>
            <li>Wait for installation to complete</li>
          </ol>
          <Screenshot alt="JDK installation process" />
        </InstallStep>

        <InstallStep number="3" title="Set Up Environment Variables">
          <p className="text-gray-300">We need to tell Windows where to find Java:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Open Windows Search</li>
            <li>Type "Environment Variables"</li>
            <li>Click "Edit the system environment variables"</li>
            <li>Click "Environment Variables" button</li>
            <li>Under "System variables", find and select "Path"</li>
            <li>Click "New" and add the path to your Java's bin folder</li>
          </ol>
          <Screenshot alt="Environment variables setup" />
        </InstallStep>

        <InstallStep number="4" title="Verify Installation">
          <p className="text-gray-300">Let's make sure Java is installed correctly:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Open Command Prompt (cmd)</li>
            <li>Type: java --version</li>
            <li>You should see your Java version information</li>
          </ol>
          <Screenshot alt="Java version check in CMD" />
        </InstallStep>
      </section>

      {/* Part 2: Installing VS Code */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Part 2: Installing Visual Studio Code 📝
        </h2>

        <InstallStep number="1" title="Download VS Code">
          <p className="text-gray-300">Get VS Code from the official website:</p>
          <a 
            href="https://code.visualstudio.com/download" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            Download VS Code ↗
          </a>
          <Screenshot alt="VS Code download page" />
        </InstallStep>

        <InstallStep number="2" title="Install VS Code">
          <p className="text-gray-300">Run the installer and select these options:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>"Add to PATH" option</li>
            <li>"Add 'Open with Code' action" options</li>
            <li>Other options are optional</li>
          </ul>
          <Screenshot alt="VS Code installation options" />
        </InstallStep>

        <InstallStep number="3" title="Install Java Extensions">
          <p className="text-gray-300">Open VS Code and install these essential extensions:</p>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400">1.</span>
              <div>
                <strong className="text-blue-400">Extension Pack for Java</strong>
                <p>Includes everything you need for Java development</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">2.</span>
              <div>
                <strong className="text-blue-400">Code Runner</strong>
                <p>Helps you run Java code quickly</p>
              </div>
            </li>
          </ul>
          <Screenshot alt="VS Code Java extensions" />
        </InstallStep>
      </section>

      {/* Testing Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Testing Your Setup 🧪
        </h2>

        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <h3 className="text-xl text-green-400 mb-4">Let's Write Your First Program!</h3>
          <ol className="list-decimal list-inside space-y-4 text-gray-300">
            <li>Open VS Code</li>
            <li>Create a new file named "HelloWorld.java"</li>
            <li>Copy this code:</li>
            <div className="my-4 p-4 bg-gray-900 rounded-lg">
              <pre className="text-blue-400">
{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java! 🚀");
    }
}`}
              </pre>
            </div>
            <li>Save the file</li>
            <li>Click the play button or right-click and select "Run Java"</li>
          </ol>
          <Screenshot alt="Hello World program in VS Code" />
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Common Issues & Solutions 🔧
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <h3 className="text-yellow-400 mb-2">Java not found in terminal?</h3>
            <p className="text-gray-300">→ Double-check your environment variables setup</p>
          </div>

          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <h3 className="text-yellow-400 mb-2">VS Code not recognizing Java?</h3>
            <p className="text-gray-300">→ Reload VS Code after installing extensions</p>
          </div>
        </div>
      </section>

      {/* Important Note About Code Editor */}
      <section className="mb-12">
        <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            📝 A Note About Code Editors
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Don't worry if you're having trouble setting up VS Code! This course comes with an 
              integrated code editor that's specifically designed for learning Java.
            </p>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
              <h3 className="text-green-400 font-medium mb-2">Good News! 🎉</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Our built-in code editor has everything you need for this course</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>You can start learning right away without additional setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Perfect for beginners - no complex configuration needed</span>
                </li>
              </ul>
            </div>
            <p>
              If you want to set up VS Code later, you can always:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Find detailed tutorials on YouTube</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Search for solutions on Google</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Ask the Java community for help</span>
              </li>
            </ul>
            <p className="text-lg text-indigo-400 font-medium mt-4">
              For now, focus on learning Java - we've got you covered! 💪
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <NextButton nextModule={nextModule} onNext={onNext} />
      </div>
    </div>
  );
};

export default InstallationOfJavaOnWindows;
