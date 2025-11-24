'use client';

import { useState } from 'react';
import { QuizQuestion } from '@/types';

interface QuizPanelProps {
  questions: QuizQuestion[];
}

export default function QuizPanel({ questions }: QuizPanelProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  if (!questions || questions.length === 0) {
    return null;
  }

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (!showResults) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: optionIndex,
      }));
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const score = showResults
    ? questions.reduce((total, q, idx) => {
        return total + (selectedAnswers[idx] === q.correctAnswer ? 1 : 0);
      }, 0)
    : 0;

  return (
    <div className="bg-mars-900/50 border border-mars-700 rounded-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-mars-400 mb-4">
        📚 Study Quiz
      </h3>

      <div className="space-y-6">
        {questions.map((question, qIdx) => {
          const isAnswered = selectedAnswers[qIdx] !== undefined;
          const isCorrect = selectedAnswers[qIdx] === question.correctAnswer;

          return (
            <div key={qIdx} className="space-y-3">
              <p className="text-white font-medium">
                {qIdx + 1}. {question.question}
              </p>

              <div className="space-y-2 ml-4">
                {question.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[qIdx] === optIdx;
                  const isCorrectOption = optIdx === question.correctAnswer;

                  let bgColor = 'bg-mars-800/30';
                  let borderColor = 'border-mars-700';
                  let textColor = 'text-mars-300';

                  if (showResults) {
                    if (isCorrectOption) {
                      bgColor = 'bg-green-900/30';
                      borderColor = 'border-green-500';
                      textColor = 'text-green-300';
                    } else if (isSelected && !isCorrect) {
                      bgColor = 'bg-red-900/30';
                      borderColor = 'border-red-500';
                      textColor = 'text-red-300';
                    }
                  } else if (isSelected) {
                    bgColor = 'bg-mars-700/50';
                    borderColor = 'border-mars-500';
                    textColor = 'text-mars-200';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswerSelect(qIdx, optIdx)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded border ${bgColor} ${borderColor} ${textColor} transition-all ${
                        !showResults ? 'hover:border-mars-500 hover:bg-mars-700/40 cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}. {option}
                      {showResults && isCorrectOption && ' ✓'}
                      {showResults && isSelected && !isCorrect && ' ✗'}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!showResults ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(selectedAnswers).length !== questions.length}
          className="mt-6 w-full bg-gradient-to-r from-mars-600 to-mars-700 text-white font-bold py-3 px-6 rounded-lg hover:from-mars-500 hover:to-mars-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answers
        </button>
      ) : (
        <div className="mt-6 bg-mars-800/50 border border-mars-600 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-mars-400">
            Score: {score}/{questions.length}
          </p>
          <p className="text-mars-300 mt-2">
            {score === questions.length
              ? '🎉 Perfect score! You mastered the material!'
              : score >= questions.length / 2
              ? '👍 Good job! Keep studying!'
              : '📖 Review the material and try again!'}
          </p>
        </div>
      )}
    </div>
  );
}
