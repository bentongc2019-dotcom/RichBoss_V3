
import React, { useState } from 'react';
import { FinalReport } from '../types';

interface Props {
  submissions: FinalReport[];
  onBack: () => void;
}

const AdminDashboard: React.FC<Props> = ({ submissions, onBack }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'rich' && password === 'Rich0628') {
      setIsLoggedIn(true);
    } else {
      alert('账号或密码错误');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto animate-fadeIn py-20">
        <div className="bg-white p-12 rounded-[32px] shadow-soft border border-slate-100">
          <h2 className="text-2xl font-bold text-brand-purple mb-8 text-center">管理员登录</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="text" 
              placeholder="账号" 
              className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-brand-purple"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="密码" 
              className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-brand-purple"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="w-full py-4 bg-brand-purple text-white font-bold rounded-xl shadow-lg">登录</button>
          </form>
          <button onClick={onBack} className="mt-6 w-full text-slate-400 text-sm">返回首页</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-brand-purple">数据管理后台</h2>
        <button onClick={onBack} className="px-6 py-2 bg-slate-100 rounded-lg font-bold text-slate-600">退出后台</button>
      </div>

      <div className="bg-white rounded-3xl shadow-soft overflow-hidden border border-slate-100">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              <th className="p-6">提交时间</th>
              <th className="p-6">姓名</th>
              <th className="p-6">联系方式</th>
              <th className="p-6">主要轴</th>
              <th className="p-6">主原型</th>
              <th className="p-6">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-20 text-center text-slate-300 italic">暂无测试提交记录</td>
              </tr>
            ) : (
              submissions.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 text-sm text-slate-500 font-mono">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="p-6 font-bold text-slate-800">{s.profile.name}</td>
                  <td className="p-6 text-sm text-slate-500">{s.profile.contact || '-'}</td>
                  <td className="p-6">
                    {s.primaryAxes.map(a => (
                      <span key={a.id} className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded mr-1">
                        {a.id}
                      </span>
                    ))}
                  </td>
                  <td className="p-6">
                    {s.primaryPrototypes.map(p => (
                      <span key={p.id} className="text-[10px] font-bold px-2 py-1 bg-brand-purple bg-opacity-10 text-brand-purple rounded mr-1">
                        {p.name}
                      </span>
                    ))}
                  </td>
                  <td className="p-6">
                    <button 
                      className="text-brand-purple font-bold text-xs hover:underline"
                      onClick={() => alert('详细报告数据导出功能正在维护中...')}
                    >
                      导出详情
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
