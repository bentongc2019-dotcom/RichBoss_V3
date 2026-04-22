import React, { useState, useEffect } from 'react';
import { getSubmissions, clearSubmissions, QuizSubmission } from '../utils/storage';

interface Props {
  onBack: () => void;
}

const AdminDashboard: React.FC<Props> = ({ onBack }) => {
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      setSubmissions(getSubmissions());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple password for now
      setIsAuthenticated(true);
    } else {
      alert('密码错误');
    }
  };

  const handleClear = () => {
    if (window.confirm('确定要清空所有数据吗？此操作不可恢复。')) {
      clearSubmissions();
      setSubmissions([]);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-[#1A103C]/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[40px] pointer-events-none" />
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-yellow-500">lock</span>
          导师后台登录
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">管理密码</label>
            <input 
              type="password" 
              className="w-full p-4 bg-[#130B2A] border border-white/10 rounded-xl focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-400 hover:to-yellow-400 text-[#130B2A] font-bold rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all"
          >
            登录控制台
          </button>
        </form>
        <button onClick={onBack} className="mt-6 text-slate-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span> 返回
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fadeIn relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-[#1A103C]/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-500">admin_panel_settings</span>
            导师数据控制台
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-lg text-sm font-bold tracking-widest">
            共 {submissions.length} 份报告
          </span>
          <button onClick={handleClear} className="text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 px-4 py-2 rounded-lg transition-colors text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">delete</span>
            清空数据
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1A103C]/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#130B2A]/50 border-b border-white/5">
              <tr>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">提交时间</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">姓名</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">微信/联系方式</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">主要模式</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setSelectedSubmission(sub)}>
                  <td className="p-5 text-sm text-slate-400 font-mono">{new Date(sub.timestamp).toLocaleString()}</td>
                  <td className="p-5 font-bold text-white">{sub.profile.name}</td>
                  <td className="p-5 text-sm text-slate-300">{sub.profile.contact || '-'}</td>
                  <td className="p-5">
                    <span className="inline-flex items-center px-3 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-xs font-bold text-yellow-500">
                      {sub.report.primaryAxes[0]?.name || '未知'}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-yellow-500 hover:text-yellow-400 text-sm font-bold flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                      <span className="material-symbols-outlined text-sm">visibility</span> 查看详情
                    </button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <span className="material-symbols-outlined text-4xl mb-4 opacity-50">inbox</span>
                      <p>暂无测验数据</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Mentor Guide */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1A103C] w-full max-w-4xl rounded-3xl shadow-2xl border border-white/10 my-8">
            <div className="sticky top-0 bg-[#1A103C] border-b border-white/10 px-8 py-6 flex justify-between items-center rounded-t-3xl z-10">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-yellow-500">psychology</span>
                  导师专属解读报告
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  对象：<span className="text-yellow-500 font-bold">{selectedSubmission.profile.name}</span> | 联系：{selectedSubmission.profile.contact || '-'}
                </p>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Report Structure */}
              <div>
                <h3 className="text-xl font-bold text-yellow-500 mb-4 border-b border-yellow-500/20 pb-2">一、{selectedSubmission.profile.name} 的信念原型结构概览（导师视角）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedSubmission.report.axes.map(axis => (
                    <div key={axis.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                        {axis.name} ({axis.id}) <span className="text-yellow-500 ml-auto">{axis.rawScore} 分</span>
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        此维度的基础得分体现了用户在应对该方面挑战时的底层反应模式。分数越高说明该模式激活越强。
                      </p>
                      <div className="bg-[#130B2A] rounded-lg p-3 text-sm text-slate-400 border border-white/5">
                        <strong className="text-white block mb-1">导师结论：</strong>
                        根据当前分值，需特别关注其“{axis.id}”相关触发场景，可能存在潜在的{axis.rawScore > 20 ? '高阻力' : '平稳'}状态。
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentoring Guide */}
              <div>
                <h3 className="text-xl font-bold text-amber-500 mb-4 border-b border-amber-500/20 pb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">forum</span>
                  二、现场可直接使用的引导话术
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 p-5 rounded-r-xl">
                    <h5 className="font-bold text-white mb-2 text-lg">💡 破冰话术（建议首发）</h5>
                    <p className="text-slate-300 leading-relaxed italic text-lg">
                      “{selectedSubmission.profile.name}，很高兴看到你的图谱。从这份数据里，我能感觉到你是一个对{selectedSubmission.report.primaryAxes[0]?.name.split(' ')[0] || '事业'}有着极高要求的人。特别是在{selectedSubmission.report.primaryAxes[0]?.id || '核心'}维度上，你承担了很多本不需要你独自扛下的压力。这一定很辛苦吧？”
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-transparent border-l-4 border-blue-500 p-5 rounded-r-xl">
                    <h5 className="font-bold text-white mb-2 text-lg">💡 深入挖掘话术（痛点切入）</h5>
                    <p className="text-slate-300 leading-relaxed italic text-lg">
                      “当我们看到你在‘{selectedSubmission.report.primaryAxes[0]?.id || '主要模式'}’上得分特别突出时，往往意味着在过去的某个阶段，这种模式保护了你。但现在，我们要一起看看，是不是这个曾经的保护伞，变成了限制你进一步扩张商业版图的‘天花板’？”
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-transparent border-l-4 border-green-500 p-5 rounded-r-xl">
                    <h5 className="font-bold text-white mb-2 text-lg">💡 闭环升单话术（行动号召）</h5>
                    <p className="text-slate-300 leading-relaxed italic text-lg">
                      “你看，信念图谱就像是你内在商业操作系统的诊断书。现在我们已经找到了系统里最耗费内存的那个程序。接下来，通过 MPI 的深度梳理，我们可以一起把这个程序重构。你准备好跨出这一步了吗？”
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
