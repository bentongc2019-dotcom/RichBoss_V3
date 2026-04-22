
import React from 'react';

interface Props {
  onStart: () => void;
}

const IntroView: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="bg-white rounded-[32px] shadow-soft overflow-hidden animate-fadeIn max-w-4xl mx-auto">
      {/* Purple Hero Header */}
      <div className="bg-brand-purple pt-20 pb-16 px-8 text-center">
        <h1 className="flex flex-col md:flex-row items-center justify-center gap-4 text-white font-bold mb-6">
          <span className="text-5xl md:text-7xl">商业与你</span>
          <span className="text-4xl md:text-6xl font-light opacity-80 italic">Business & You</span>
        </h1>
        <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
        <p className="text-brand-gold text-lg md:text-xl font-medium tracking-[0.2em]">商业与人生的操作系统</p>
      </div>

      <div className="p-10 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-4">信念原型图谱</h2>
        <p className="text-slate-400 text-lg md:text-xl mb-12">（心智模式的底层逻辑）</p>

        <div className="max-w-2xl mx-auto bg-slate-50 p-8 rounded-2xl text-left border border-slate-100 mb-12 relative">
          <div className="absolute top-0 left-8 w-1 h-full bg-slate-200"></div>
          <div className="pl-6 space-y-6">
            <p className="text-slate-600 leading-relaxed text-lg">
              这份测试旨在帮你看见压力下真实的<strong>“信念+应对模式”</strong>。了解底层逻辑，是进化的第一步。
            </p>
            <div className="space-y-3">
              <p className="flex items-center gap-3 text-slate-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                请凭<strong>第一直觉</strong>选择
              </p>
              <p className="flex items-center gap-3 text-slate-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                回答<strong>真实的自己</strong>，而非理想中的自己
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="px-16 py-5 bg-brand-purple text-white text-xl font-bold rounded-full shadow-xl hover:bg-opacity-95 transform hover:scale-105 transition-all"
        >
          开始探索
        </button>
      </div>
    </div>
  );
};

export default IntroView;
