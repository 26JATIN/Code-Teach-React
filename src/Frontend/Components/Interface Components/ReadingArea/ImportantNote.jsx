import React from 'react';

const ImportantNote = ({ title, points, description, variant = 'yellow' }) => {
  const variants = {
    yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400'
  };

  // Handle both array of points or single description text
  const hasPoints = points && Array.isArray(points) && points.length > 0;
  const hasDescription = description && typeof description === 'string';

  return (
    <div className={`p-4 rounded-xl border ${variants[variant]}`}>
      <h3 className="text-lg font-medium mb-2">⚠️ {title || 'Important Note'}</h3>
      {hasPoints ? (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      ) : hasDescription ? (
        <p className="text-gray-300 leading-relaxed">{description}</p>
      ) : (
        <p className="text-gray-400 italic">No content provided</p>
      )}
    </div>
  );
};

export default ImportantNote;
