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
    { label: '极度不同意', value: 1 },
    { label: '有点不同意', value: 2 },
    { label: '一般', value: 3 },
    { label: '有点同意', value: 4 },
    { label: '极度同意', value: 5 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeIn px-4 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Progress fixed at top */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-white/5 z-50">
        <div 
          className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-10 pt-8 flex justify-between text-xs font-bold text-yellow-500 uppercase tracking-[0.2em]">
        <span className="bg-yellow-500/10 px-4 py-1.5 rounded-full border border-yellow-500/20">PROGRESS</span>
        <span className="bg-yellow-500/10 px-4 py-1.5 rounded-full border border-yellow-500/20">{currentIndex + 1} / {questions.length}</span>
      </div>

      {/* Question Card */}
      <div className="bg-[#1A103C]/80 backdrop-blur-md rounded-[32px] shadow-2xl border border-white/10 overflow-hidden relative z-10">
        <div className="p-10 md:p-20 text-center min-h-[450px] flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-20 px-4 md:px-12">
            "{currentQuestion.text}"
          </h3>

          <div className="w-full space-y-6">
            <div className="flex justify-between text-xs text-slate-500 font-medium px-2 uppercase tracking-wider">
              <span>极度不同意</span>
              <span>极度同意</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`relative p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 font-bold text-xl md:text-2xl
                    ${answers[currentQuestion.id] === opt.value 
                      ? 'border-yellow-500 bg-yellow-500/20 text-yellow-500 scale-105 shadow-[0_0_20px_rgba(234,179,8,0.2)]' 
                      : 'border-white/10 bg-white/5 hover:border-yellow-500/50 hover:bg-white/10 text-slate-400 hover:text-white'
                    }`}
                >
                  <span>{opt.value}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-60 font-normal">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between relative z-10">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`text-slate-500 hover:text-white transition-colors font-medium text-sm flex items-center gap-2 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span> 上一题
        </button>
      </div>
    </div>
  );
};

export default QuizView;
