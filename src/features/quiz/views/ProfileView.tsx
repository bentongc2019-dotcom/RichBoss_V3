
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
    <div className="max-w-xl mx-auto animate-fadeIn py-10">
      <div className="bg-white p-12 md:p-16 rounded-[40px] shadow-soft border border-slate-100 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-4xl font-bold text-brand-purple mb-4">测试完成</h2>
        <p className="text-slate-400 text-lg mb-12">生成您的专属信念图谱报告</p>

        <form onSubmit={handleSubmit} className="space-y-8 text-left max-w-sm mx-auto">
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">姓名</label>
            <input 
              type="text" 
              required
              placeholder="您的称呼"
              className="w-full p-5 bg-white border border-slate-200 rounded-2xl focus:border-brand-purple focus:ring-4 focus:ring-brand-purple focus:ring-opacity-10 outline-none transition-all text-lg text-slate-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">微信 ID</label>
            <input 
              type="text" 
              placeholder="用于深度解读联系"
              className="w-full p-5 bg-white border border-slate-200 rounded-2xl focus:border-brand-purple focus:ring-4 focus:ring-brand-purple focus:ring-opacity-10 outline-none transition-all text-lg text-slate-800"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          
          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-5 bg-brand-purple text-white text-xl font-bold rounded-2xl shadow-xl hover:bg-opacity-90 transform hover:scale-[1.02] transition-all"
            >
              生成报告
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileView;
