import React from 'react';

const Summary = ({ title, description }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        {title}
      </h1>
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <p className="text-gray-300 text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Summary;
