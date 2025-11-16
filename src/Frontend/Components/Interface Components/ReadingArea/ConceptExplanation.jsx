import React from 'react';

const ConceptExplanation = ({ sections, title, concept, explanation, examples }) => {
  // Handle both old format (sections array) and new format (flat fields)
  if (sections && Array.isArray(sections) && sections.length > 0) {
    // Old format: array of sections
    return (
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
            <h3 className="text-xl font-medium text-indigo-400 mb-3 flex items-center gap-2">
              {section.icon && <span>{section.icon}</span>}
              {section.title}
            </h3>
            <div className="space-y-4 text-gray-300">
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {section.code && (
                <div className="bg-gray-900/50 p-4 rounded-md mt-2">
                  <code className="text-sm text-gray-300">{section.code}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // New format: flat fields
  return (
    <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
      <h3 className="text-xl font-medium text-indigo-400 mb-3">
        {title || 'Concept Explanation'}
      </h3>
      {concept && (
        <div className="mb-3">
          <span className="text-sm font-semibold text-indigo-300">Concept: </span>
          <span className="text-gray-300">{concept}</span>
        </div>
      )}
      {explanation && (
        <div className="text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
          {explanation}
        </div>
      )}
      {examples && Array.isArray(examples) && examples.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-semibold text-indigo-300 mb-2">Examples:</div>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {examples.map((example, idx) => (
              <li key={idx}>{example}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConceptExplanation;
