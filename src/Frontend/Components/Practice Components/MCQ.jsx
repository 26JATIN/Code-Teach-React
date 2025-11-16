import React, { useState } from 'react';

const MCQ = ({ question, selectedAnswer: externalSelectedAnswer, onAnswerSelect }) => {
  // Use local state if external state is not provided
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState(undefined);
  const selectedAnswer = externalSelectedAnswer !== undefined ? externalSelectedAnswer : localSelectedAnswer;
  
  const handleAnswerSelect = (questionId, index) => {
    if (onAnswerSelect) {
      onAnswerSelect(questionId, index);
    } else {
      setLocalSelectedAnswer(index);
    }
  };

  const isSelected = (index) => selectedAnswer === index;
  const isCorrect = (index) => index === question.correctAnswer;
  const showFeedback = (index) => isSelected(index);

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 mb-4">
      <p className="text-gray-200 mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(question.id, index)}
            disabled={selectedAnswer !== undefined}
            className={`w-full p-3 text-left rounded-lg transition-colors duration-200 
              ${isSelected(index)
                ? isCorrect(index)
                  ? 'bg-green-500/20 border-green-500/50'
                  : 'bg-red-500/20 border-red-500/50'
                : 'bg-gray-900/50 border-gray-800/50'
              } border hover:bg-gray-700/50 ${selectedAnswer !== undefined ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 
                  ${isSelected(index)
                    ? isCorrect(index)
                      ? 'border-green-400 bg-green-400'
                      : 'border-red-400 bg-red-400'
                    : 'border-gray-600'
                  }`} 
                />
                <span className="text-gray-300">{option}</span>
              </div>
              {showFeedback(index) && (
                <span className="text-sm">
                  {isCorrect(index) ? (
                    <span className="text-green-400">✓ Correct</span>
                  ) : (
                    <span className="text-red-400">✗ Incorrect</span>
                  )}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      {selectedAnswer !== undefined && question.explanation && (
        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
          <p className="text-gray-400 text-sm">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default MCQ;
