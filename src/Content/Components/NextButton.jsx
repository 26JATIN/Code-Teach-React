import React from 'react';
import { ArrowRight } from 'lucide-react';

const NextButton = ({ nextModule, onNext }) => {
  if (!nextModule) return null;

  return (
    <button
      onClick={() => onNext(nextModule.moduleId, nextModule.id)}
      className="group flex items-center gap-2 mt-8 px-4 py-2 rounded-lg
        bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20
        text-blue-400 transition-all duration-200"
    >
      <span>Next: {nextModule.title}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

export default NextButton;