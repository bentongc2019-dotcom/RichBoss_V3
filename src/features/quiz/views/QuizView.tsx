
import React, { useState } from 'react';
import { Question } from '../types';

interface Props {
  questions: Question[];
  onComplete: (answers: Record<number, number>) => void;
}

const QuizView: React.FC<Props> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (score: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const options = [
    { label: '非常不同意', value: 1 },
    { label: '有点不同意', value: 2 },
    { label: '一般', value: 3 },
    { label: '有点同意', value: 4 },
    { label: '非常同意', value: 5 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeIn px-4">
      {/* Header Progress */}
      <div className="mb-10 pt-4">
        <div className="flex justify-between text-[11px] font-bold text-brand-purple uppercase tracking-[0.2em] mb-4">
          <span>PROGRESS</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-brand-purple h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-[32px] shadow-soft border border-slate-100 overflow-hidden">
        <div className="h-1.5 w-full bg-brand-purple"></div>
        <div className="p-10 md:p-20 text-center min-h-[450px] flex flex-col justify-center">
          <h3 className="text-2xl md:text-4xl font-bold text-slate-800 leading-relaxed mb-20 px-4 md:px-12">
            {currentIndex + 1}. {currentQuestion.text}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`p-6 rounded-2xl border transition-all text-sm font-medium flex flex-col items-center justify-center gap-3
                  ${answers[currentQuestion.id] === opt.value 
                    ? 'border-brand-purple bg-brand-purple bg-opacity-5 text-brand-purple shadow-sm' 
                    : 'border-slate-100 bg-slate-50 hover:border-brand-purple text-slate-500'
                  }`}
              >
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-start">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`text-slate-400 hover:text-brand-purple transition-colors font-medium text-lg flex items-center gap-2 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <span className="text-2xl">←</span> 上一题
        </button>
      </div>
    </div>
  );
};

export default QuizView;
