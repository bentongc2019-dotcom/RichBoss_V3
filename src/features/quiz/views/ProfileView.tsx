import React, { useState } from 'react';
import { Profile } from '../types';

interface Props {
  onSubmit: (profile: Profile) => void;
}

const ProfileView: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name, contact });
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-fadeIn py-10 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="bg-[#1A103C]/80 backdrop-blur-md p-12 md:p-16 rounded-[40px] shadow-2xl border border-white/10 text-center relative z-10">
        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-yellow-500/20">
          <span className="material-symbols-outlined text-4xl text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">check_circle</span>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4">测试完成</h2>
        <p className="text-slate-400 text-lg mb-12">即将为您生成专属信念图谱报告</p>

        <form onSubmit={handleSubmit} className="space-y-8 text-left max-w-sm mx-auto">
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">您的称呼</label>
            <input 
              type="text" 
              required
              placeholder="请输入姓名或昵称"
              className="w-full p-5 bg-[#130B2A] border border-white/10 rounded-2xl focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all text-lg text-white placeholder-slate-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">微信 ID (选填)</label>
            <input 
              type="text" 
              placeholder="如需后续深度解读可预留"
              className="w-full p-5 bg-[#130B2A] border border-white/10 rounded-2xl focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all text-lg text-white placeholder-slate-600"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          
          <div className="pt-8">
            <button 
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-yellow-500 to-amber-400 hover:to-yellow-400 text-[#130B2A] text-xl font-bold rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              生成专属报告 <span className="material-symbols-outlined font-bold text-xl">auto_awesome</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileView;
