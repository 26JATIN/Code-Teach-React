import React from 'react';
import CodeEditor from '../../Code Components/CodeEditor';

const HandsOn = ({ title, description, instructions, expectedOutcome, defaultCode, solution }) => {
  const content = instructions || description;
  
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-green-400">{title || 'Hands-On Practice'}</h2>
      <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
        {content && (
          <div className="text-gray-300 mb-4 whitespace-pre-wrap">{content}</div>
        )}
        {defaultCode && <CodeEditor defaultCode={defaultCode} />}
        {expectedOutcome && (
          <div className="mt-4 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <div className="text-sm font-semibold text-green-400 mb-2">Expected Outcome:</div>
            <div className="text-gray-300">{expectedOutcome}</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HandsOn;
