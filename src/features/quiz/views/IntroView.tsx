import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onStart: () => void;
  onAdmin: () => void;
  onViewHistory?: () => void;
  isLoggedIn?: boolean;
  hasHistory?: boolean;
  userName?: string;
}

const IntroView: React.FC<Props> = ({ onStart, onAdmin, onViewHistory, isLoggedIn, hasHistory, userName }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 顶部回到首页按钮 */}
      <div className="mb-6 flex justify-start relative z-20">
        <button 
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-sm">home</span> 回到网站首页
        </button>
      </div>

      <div className="bg-[#1A103C]/80 backdrop-blur-md rounded-[32px] shadow-2xl border border-white/10 overflow-hidden animate-fadeIn relative">
        {/* 登录状态指示 */}
        {isLoggedIn && (
        <div className="absolute top-4 right-6 z-20 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          已登录
        </div>
      )}
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Header */}
      <div className="pt-20 pb-16 px-8 text-center relative z-10">
        <h1 className="flex flex-col md:flex-row items-center justify-center gap-4 text-white font-bold mb-6">
          <span className="text-5xl md:text-7xl drop-shadow-lg">商业与你</span>
          <span className="text-4xl md:text-6xl font-light opacity-80 italic text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">Business & You</span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8"></div>
        <p className="text-yellow-500 text-lg md:text-xl font-medium tracking-[0.2em] uppercase">商业与人生的操作系统</p>
      </div>

      <div className="p-10 md:p-16 text-center relative z-10 border-t border-white/5 bg-[#130B2A]/50">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">信念原型图谱</h2>
        <p className="text-slate-400 text-lg md:text-xl mb-12">（心智模式的底层逻辑）</p>

        <div className="max-w-3xl mx-auto bg-[#0a0a0a]/40 p-8 md:p-12 rounded-3xl text-left border border-white/5 shadow-inner mb-12 relative">
          <div className="space-y-8 font-serif">
            <p className="text-slate-300 leading-[2.2] text-lg md:text-xl tracking-[0.08em] indent-8">
              这份测试旨在帮你看见压力下真实的<strong className="text-yellow-500 font-bold mx-1">"信念+应对模式"</strong>。了解底层逻辑，是进化的第一步。
            </p>
            <div className="space-y-6 pl-2 md:pl-8 text-slate-400 text-base md:text-lg tracking-[0.08em]">
              <p className="flex items-start gap-4">
                <span className="text-yellow-500/80 mt-2 text-sm">◆</span>
                <span className="flex-1 leading-[2.2]">请凭<strong className="text-white font-bold mx-1">第一直觉</strong>选择</span>
              </p>
              <p className="flex items-start gap-4">
                <span className="text-yellow-500/80 mt-2 text-sm">◆</span>
                <span className="flex-1 leading-[2.2]">回答<strong className="text-white font-bold mx-1">真实的自己</strong>，而非理想中的自己</span>
              </p>
            </div>
          </div>
        </div>

        {/* 主按钮区域 */}
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={onStart}
            className="px-16 py-5 bg-gradient-to-r from-yellow-500 to-amber-400 hover:to-yellow-400 text-[#130B2A] text-xl font-bold rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transform hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            开始探索 <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>

          {/* 已登录用户且有历史报表 → 查看我的报告 */}
          {isLoggedIn && hasHistory && (
            <button
              onClick={onViewHistory}
              className="mt-2 px-10 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:border-yellow-500/30 transition-all flex items-center justify-center gap-2 mx-auto text-sm"
            >
              <span className="material-symbols-outlined text-yellow-500 text-lg">description</span>
              {userName ? `${userName}，查看我的报告` : '查看我的历史报告'}
            </button>
          )}
        </div>

        {/* 底部导师入口 */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <button
            onClick={onAdmin}
            className="text-slate-500 hover:text-slate-300 transition-colors text-xs flex items-center gap-1.5 mx-auto opacity-60 hover:opacity-100"
          >
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            导师入口
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default IntroView;
