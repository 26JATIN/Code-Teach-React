import React from 'react';
import NextButton from '../../Components/NextButton';

const WhatIsInterpreter = ({ nextModule, onNext }) => {
  const interpreterSteps = [
    {
      code: 'print("Step 1")',
      execution: 'Executing: "Step 1"',
      output: 'Step 1'
    },
    {
      code: 'print("Step 2")',
      execution: 'Executing: "Step 2"',
      output: 'Step 2'
    }
  ];

  return (
    <div className="space-y-6">
      <h1>What is an Interpreter? 🔍</h1>

      <div className="space-y-4">
        <p>An interpreter reads and executes your code line by line, translating each line as it goes.</p>

        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-blue-400 mb-4">How Interpretation Works</h3>
          
          <div className="space-y-4">
            {interpreterSteps.map((step, index) => (
              <div key={index} className="border border-gray-700 rounded p-3">
                <p className="text-green-400">Line {index + 1}:</p>
                <pre className="bg-black/30 p-2 rounded mb-2">{step.code}</pre>
                <p className="text-yellow-400 text-sm">{step.execution}</p>
                <p className="text-white text-sm mt-2">Output: {step.output}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-900/20 p-4 rounded-lg">
          <h3 className="text-purple-400 mb-2">Key Points About Interpreters:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Executes code line by line</li>
            <li>No separate compilation step</li>
            <li>Easier debugging</li>
            <li>Examples: Python, JavaScript, Ruby</li>
          </ul>
        </div>
      </div>

      <NextButton nextModule={nextModule} onNext={onNext} />
    </div>
  );
};

export default WhatIsInterpreter;
