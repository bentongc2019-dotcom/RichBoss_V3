import React, { useState, useEffect } from 'react';
import { getCloudSubmissions, getSubmissions, clearSubmissions, QuizSubmission } from '../utils/storage';
import { generateMentorAnalysis, MentorAnalysis } from '../utils/mentorEngine';
import { supabase } from '../../../utils/supabase';

interface Props {
  onBack: () => void;
}

const AdminDashboard: React.FC<Props> = ({ onBack }) => {
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'cloud' | 'local'>('cloud');
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);
  const [mentorAnalysis, setMentorAnalysis] = useState<MentorAnalysis | null>(null);

  // 登录成功后，从云端加载数据
  const loadCloudData = async () => {
    setIsLoading(true);
    try {
      const cloudData = await getCloudSubmissions();
      if (cloudData.length > 0) {
        setSubmissions(cloudData);
        setDataSource('cloud');
      } else {
        // 云端没数据的话，回退到本地数据
        const localData = getSubmissions();
        setSubmissions(localData);
        setDataSource('local');
      }
    } catch {
      const localData = getSubmissions();
      setSubmissions(localData);
      setDataSource('local');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadCloudData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedSubmission) {
      setMentorAnalysis(generateMentorAnalysis(selectedSubmission.report));
    } else {
      setMentorAnalysis(null);
    }
  }, [selectedSubmission]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    // 模式 1：简单管理员密码（快速访问，仅本地数据）
    const ADMIN_PASSWORD = 'richboss2026';
    if (!email && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setDataSource('local');
      setIsLoading(false);
      return;
    }

    // 模式 2：Supabase Auth 登录（获取云端数据）
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // 如果 Supabase 登录失败，也尝试密码验证
        if (password === ADMIN_PASSWORD) {
          setIsAuthenticated(true);
          setDataSource('local');
        } else {
          setLoginError('登录失败：请检查邮箱和密码。如果只需要快速访问，可以留空邮箱直接输入管理员密码。');
        }
      } else {
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      // 网络错误时也支持密码登录
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setDataSource('local');
      } else {
        setLoginError('网络错误：' + err.message);
      }
    }
    setIsLoading(false);
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
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">管理员邮箱 <span className="text-slate-600 normal-case text-xs">(选填，留空可用密码快速登录)</span></label>
            <input 
              type="email" 
              className="w-full p-4 bg-[#130B2A] border border-white/10 rounded-xl focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱（选填）"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">密码</label>
            <input 
              type="password" 
              className="w-full p-4 bg-[#130B2A] border border-white/10 rounded-xl focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              required
            />
          </div>
          {loginError && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
              {loginError}
            </div>
          )}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-400 hover:to-yellow-400 text-[#130B2A] font-bold rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all disabled:opacity-50"
          >
            {isLoading ? '登录中...' : '登录控制台'}
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
        <div className="flex items-center gap-4 flex-wrap">
          <span className={`text-xs px-3 py-1.5 rounded-lg font-bold tracking-wide border ${
            dataSource === 'cloud' 
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
              : 'text-orange-400 bg-orange-500/10 border-orange-500/20'
          }`}>
            {dataSource === 'cloud' ? '☁️ 云端数据' : '💾 本地数据'}
          </span>
          <span className="text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-lg text-sm font-bold tracking-widest">
            共 {submissions.length} 份报告
          </span>
          <button onClick={loadCloudData} disabled={isLoading} className="text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 px-4 py-2 rounded-lg transition-colors text-sm font-bold flex items-center gap-2 disabled:opacity-50">
            <span className="material-symbols-outlined text-sm">refresh</span>
            {isLoading ? '加载中...' : '刷新'}
          </button>
          <button onClick={handleClear} className="text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 px-4 py-2 rounded-lg transition-colors text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">delete</span>
            清空本地
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
                  <td className="p-5 font-bold text-white">{sub.profile?.name || sub.report?.profile?.name || '未知'}</td>
                  <td className="p-5 text-sm text-slate-300">{sub.profile?.contact || sub.report?.profile?.contact || '-'}</td>
                  <td className="p-5">
                    <span className="inline-flex items-center px-3 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-xs font-bold text-yellow-500">
                      {sub.report?.primaryAxes?.[0]?.name || '未知'}
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
      {selectedSubmission && mentorAnalysis && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1A103C] w-full max-w-4xl rounded-3xl shadow-2xl border border-white/10 my-8">
            <div className="sticky top-0 bg-[#1A103C] border-b border-white/10 px-8 py-6 flex justify-between items-center rounded-t-3xl z-10">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-yellow-500">psychology</span>
                  导师专属动态解读
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  对象：<span className="text-yellow-500 font-bold">{selectedSubmission.profile?.name || '未知'}</span> | 联系：{selectedSubmission.profile?.contact || '-'} | {mentorAnalysis.oneLinePersona}
                </p>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-8 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              
              {/* 1. Prototype Structure */}
              <div>
                <h3 className="text-xl font-bold text-yellow-500 mb-6 border-b border-yellow-500/20 pb-2">一、{selectedSubmission.profile?.name || '未知'} 的信念原型结构概览</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {(selectedSubmission.report?.axes || []).map(axis => (
                    <div key={axis.id} className="bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden">
                      {axis.isPrimary && <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/20 blur-2xl rounded-full"></div>}
                      <h4 className="font-bold text-white mb-3 text-lg flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold text-yellow-500">
                            {axis.id}
                          </span>
                          {axis.name}
                        </span>
                        <span className="text-slate-400 font-mono text-sm">
                          总计点数: <span className="text-yellow-500 font-bold">{axis.tutorPoint}</span>
                        </span>
                      </h4>
                      <div className="space-y-3 mt-4">
                        {(selectedSubmission.report?.prototypes || [])
                          .filter(p => p.axis === axis.id)
                          .map(p => (
                            <div key={p.id} className="flex justify-between items-center bg-[#130B2A]/50 p-2 rounded-lg border border-white/5">
                              <span className="text-slate-300 text-sm flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${p.isPrimary ? 'bg-yellow-500' : p.isSecondary ? 'bg-blue-400' : 'bg-slate-600'}`}></span>
                                {p.id} {p.name.split(' ')[0]}
                              </span>
                              <span className="text-yellow-500 font-mono text-sm font-bold">{p.tutorPoint}</span>
                            </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Combined Prototype Conclusion */}
                <div className="bg-[#130B2A] rounded-xl p-6 border border-white/10">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-500 text-sm">psychology</span>
                    主要 / 次要 / 辅助原型（工作结论）
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3 border border-yellow-500/20">
                      <div className="text-xs text-yellow-500 font-bold mb-1">双主原型</div>
                      {(selectedSubmission.report?.primaryPrototypes || []).map(p => (
                        <div key={p.id} className="text-white text-sm">{p.id}「{p.name?.split(' ')[0] || '未知'}」</div>
                      ))}
                      {(selectedSubmission.report?.primaryPrototypes || []).length === 0 && <div className="text-slate-500 text-sm">-</div>}
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-blue-400/20">
                      <div className="text-xs text-blue-400 font-bold mb-1">重要辅轴原型</div>
                      {(selectedSubmission.report?.secondaryPrototypes || []).map(p => (
                        <div key={p.id} className="text-white text-sm">{p.id}「{p.name?.split(' ')[0] || '未知'}」</div>
                      ))}
                      {(selectedSubmission.report?.secondaryPrototypes || []).length === 0 && <div className="text-slate-500 text-sm">-</div>}
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-xs text-slate-400 font-bold mb-1">背景模式（轻度）</div>
                      {(selectedSubmission.report?.prototypes || []).filter(p => !p.isPrimary && !p.isSecondary && p.tutorPoint > 0).slice(0, 3).map(p => (
                        <div key={p.id} className="text-white text-sm">{p.id}「{p.name?.split(' ')[0] || '未知'}」</div>
                      ))}
                      {(selectedSubmission.report?.prototypes || []).filter(p => !p.isPrimary && !p.isSecondary && p.tutorPoint > 0).length === 0 && <div className="text-slate-500 text-sm">-</div>}
                    </div>
                  </div>
                  <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 rounded-r-lg">
                    <span className="text-xs text-yellow-500 font-bold block mb-1">一句话人物画像（导师内部用）：</span>
                    <p className="text-slate-300 italic text-sm">{mentorAnalysis.oneLinePersona}</p>
                  </div>
                </div>
              </div>

              {/* 2. Inner Script */}
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-4 border-b border-blue-400/20 pb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">account_tree</span>
                  二、内在运行剧本（动态链路）
                </h3>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                  <ul className="space-y-4">
                    {mentorAnalysis.dynamicScript.map((script, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-300 leading-relaxed text-base">
                        <span className="text-blue-400 font-bold">{idx + 1}.</span>
                        <span>{script}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3. Growth Direction */}
              <div>
                <h3 className="text-xl font-bold text-emerald-400 mb-4 border-b border-emerald-400/20 pb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">trending_up</span>
                  三、与四大成长性原型的连接
                </h3>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
                  <ul className="space-y-4">
                    {mentorAnalysis.growthDirection.map((direction, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-300 leading-relaxed text-base">
                        <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                        <span>{direction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4. Mentoring Scenarios */}
              <div>
                <h3 className="text-xl font-bold text-amber-500 mb-6 border-b border-amber-500/20 pb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">forum</span>
                  四、导师在不同场景中的引导词示例
                </h3>
                
                <div className="space-y-6">
                  {mentorAnalysis.scenarios.map((scenario, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 p-6 rounded-r-xl">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
                        <h5 className="font-bold text-white text-lg">{scenario.title}</h5>
                        <span className="text-xs text-amber-500/80 border border-amber-500/30 px-2 py-1 rounded bg-amber-500/10 whitespace-nowrap self-start">
                          目标: {scenario.goal}
                        </span>
                      </div>
                      <div className="text-slate-300 leading-relaxed italic text-base whitespace-pre-line bg-[#130B2A]/50 p-4 rounded-lg border border-white/5">
                        {scenario.script}
                      </div>
                    </div>
                  ))}
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
