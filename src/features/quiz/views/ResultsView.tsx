import React, { useState } from 'react';
import { FinalReport, PrototypeResult } from '../types';
import { QUESTIONS, AXIS_MAP } from '../constants';

interface Props {
  report: FinalReport;
  onReset: () => void;
}

const BRAND_YELLOW = '#EAB308'; // Tailwind yellow-500
const BRAND_PURPLE = '#1A103C';

const PROTO_COLORS: Record<string, string> = {
  V1: '#EAB308', V2: '#EAB308', V3: '#EAB308', // Gold
  R1: '#ec4899', R2: '#ec4899', R3: '#ec4899', // Pink
  S1: '#3b82f6', S2: '#3b82f6', S3: '#3b82f6', // Blue
  A1: '#a855f7', A2: '#a855f7', A3: '#a855f7'  // Purple
};

const ResultsView: React.FC<Props> = ({ report, onReset }) => {
  const [showRaw, setShowRaw] = useState(false);

  const radarData = report.axes.map(axis => ({
    subject: axis.name.split(' ')[0] + ' (' + axis.id + ')',
    score: axis.rawScore,
    fullMark: 45,
  }));

  const barData = report.prototypes.map(p => ({
    name: p.id,
    score: p.rawScore,
    id: p.id
  }));

  const highTriggers = QUESTIONS.filter(q => report.answers[q.id] >= 4)
    .sort((a, b) => (report.answers[b.id] || 0) - (report.answers[a.id] || 0));

  const handlePrint = () => {
    window.print();
  };

  const WeChatID = "BusinessAI2026";

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-fadeIn relative">
      {/* Background Ambient Lights */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-yellow-500/10 via-[#1A103C]/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="bg-[#1A103C]/80 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/10 overflow-hidden relative z-10" id="report-content">
        
        {/* Simple Header */}
        <div className="flex justify-between items-end p-10 border-b border-white/5">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">信念原型图谱</h1>
            <p className="text-yellow-500 text-sm tracking-widest uppercase">Business & You Profile</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{report.profile.name}</p>
            <p className="text-slate-500 text-xs font-mono">{report.profile.contact || "USER_ID"}</p>
          </div>
        </div>

        {/* Top Charts Section */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Radar Column - Replaced with Axis Bars */}
          <div className="bg-white/5 backdrop-blur border border-white/10 p-8 rounded-3xl shadow-sm flex flex-col justify-center">
            <h3 className="text-center font-bold text-white text-xl mb-8 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-yellow-500">radar</span>
              信念模式总览
            </h3>
            <div className="space-y-6">
              {radarData.map((data, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 font-bold text-sm">{data.subject}</span>
                    <span className="text-yellow-500 font-mono font-bold text-sm">{data.score} / {data.fullMark}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 border border-white/10 overflow-hidden">
                    <div 
                      className="bg-yellow-500 h-full rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all duration-1000"
                      style={{ width: `${(data.score / data.fullMark) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Column */}
          <div className="bg-white/5 backdrop-blur border border-white/10 p-8 rounded-3xl shadow-sm flex flex-col">
            <h3 className="font-bold text-white text-xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-500">psychology</span>
              主要模式解析
            </h3>
            {report.primaryAxes.length > 0 && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
                    <span className="text-2xl font-bold text-white">
                      主要模式：<span className="text-yellow-500">{report.primaryAxes[0].name.split(' ')[0]}</span> <span className="text-slate-400 text-lg">({report.primaryAxes[0].id})</span>
                    </span>
                  </div>
                  <p className="text-slate-300 text-base leading-relaxed mb-8">
                    核心恐惧：失控。倾向微观管理，担忧资源匮乏，过度承担责任。
                  </p>
                </div>
                
                {/* Advice Box */}
                <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/10 border border-yellow-500/20 p-8 rounded-[32px] shadow-lg relative mt-auto">
                  <div className="absolute top-6 left-6 opacity-20 material-symbols-outlined text-6xl text-yellow-500">format_quote</div>
                  <p className="text-white font-bold text-base md:text-lg leading-loose relative z-10 pl-4">
                    当您觉察到自己处于{report.primaryAxes[0].id}模式时，试着停下来问问自己：我是不是正在被过去的恐惧所驱动？这个当下，最真实、最有利于长远发展的选择是什么？
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Bar Chart - Replaced with custom HTML bars */}
        <div className="px-10 pb-10">
          <div className="bg-white/5 backdrop-blur border border-white/10 p-8 rounded-3xl shadow-sm">
            <h3 className="font-bold text-white text-xl mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-500">bar_chart</span>
              细分维度透视
            </h3>
            <div className="flex items-end justify-between h-48 w-full gap-2 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                {[0, 1, 2, 3].map(line => (
                  <div key={line} className="w-full border-b border-white" style={{ height: '25%' }}></div>
                ))}
              </div>
              
              {barData.map((entry, index) => (
                <div key={index} className="flex flex-col items-center flex-1 h-full justify-end group">
                  <div className="relative w-full max-w-[40px] flex flex-col justify-end h-full">
                    <div 
                      className="w-full rounded-t-md transition-all duration-700 opacity-80 group-hover:opacity-100"
                      style={{ 
                        height: `${(entry.score / 15) * 100}%`, 
                        backgroundColor: PROTO_COLORS[entry.id] || BRAND_YELLOW 
                      }}
                    >
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#130B2A] text-white text-xs font-bold py-1 px-2 rounded border border-white/20 whitespace-nowrap z-20 pointer-events-none transition-opacity">
                        {entry.score} 分
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 mt-3">{entry.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* High Triggers List */}
        <div className="px-10 pb-20">
          <h3 className="font-bold text-white text-xl mb-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-400">warning</span>
            高分触发点 <span className="text-slate-500 text-sm font-normal uppercase">(High Impact Triggers)</span>
          </h3>
          <div className="space-y-4">
            {highTriggers.slice(0, 12).map((q, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur p-5 rounded-xl border border-white/10 flex items-center justify-between group hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-start gap-4 flex-1">
                  <span className={`text-[11px] font-bold px-3 py-1.5 rounded bg-opacity-20 min-w-[55px] text-center mt-1 border border-opacity-30
                    ${q.axis === 'V' ? 'bg-yellow-500 text-yellow-500 border-yellow-500' : 
                      q.axis === 'R' ? 'bg-pink-500 text-pink-400 border-pink-500' : 
                      q.axis === 'S' ? 'bg-blue-500 text-blue-400 border-blue-500' : 'bg-purple-500 text-purple-400 border-purple-500'}`}
                  >
                    {q.code}
                  </span>
                  <p className="text-slate-300 font-medium text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">{q.text}</p>
                </div>
                <div className="flex items-center gap-3 ml-6 shrink-0">
                  <span className="text-xl font-bold text-yellow-500">{report.answers[q.id]}</span>
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">分</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Footer */}
        <div className="bg-[#130B2A] border-t border-white/10 p-16 text-white rounded-br-[40px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 relative z-10">
            <div className="shrink-0">
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-yellow-500 text-4xl">local_fire_department</span>
                商业与你
              </h2>
              <p className="text-yellow-500 text-sm font-medium tracking-[0.2em] uppercase">Business & You</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-16 gap-y-10 border-l-0 md:border-l border-white/10 md:pl-16">
              <div className="space-y-2">
                <div className="text-lg font-bold text-white">瓶颈思维</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">物理世界的运行规则</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-bold text-white">MPI 进化罗盘</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">创业者的导航系统</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-bold text-white">信念原型图谱</div>
                <div className="text-xs text-yellow-500 uppercase tracking-widest">心智模式的底层逻辑</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-bold text-white">AI 赋能实践</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">隐形之足：做中学</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-16 flex flex-col items-center gap-12 no-print relative z-10">
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
          <button 
            onClick={handlePrint}
            className="flex-1 py-6 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 shadow-sm backdrop-blur-sm"
          >
            <span className="material-symbols-outlined">download</span>
            <span>保存图谱快照</span>
          </button>
          <button 
            onClick={() => alert(`请添加微信号预约 MPI 深度解读：${WeChatID}`)}
            className="flex-1 py-6 bg-gradient-to-r from-yellow-500 to-amber-400 hover:to-yellow-400 text-[#130B2A] font-bold text-lg rounded-2xl hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all flex items-center justify-center gap-3 shadow-xl transform hover:scale-[1.02]"
          >
            <span className="material-symbols-outlined text-2xl font-bold">event</span>
            <span>预约 MPI 深度解读</span>
          </button>
        </div>

        <div className="text-center w-full">
          <button 
            onClick={() => setShowRaw(!showRaw)} 
            className="text-slate-400 font-bold text-sm flex items-center gap-2 mx-auto mb-10 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">{showRaw ? 'expand_less' : 'expand_more'}</span>
            <span className="tracking-widest uppercase">{showRaw ? '收起原始作答明细' : '查看原始作答明细'}</span>
          </button>

          {showRaw && (
            <div className="bg-[#1A103C]/90 backdrop-blur-md p-10 rounded-[32px] shadow-2xl border border-white/10 text-left w-full max-w-5xl mx-auto mb-12 animate-slideDown overflow-x-auto">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-500">database</span>
                原始数据矩阵
              </h3>
              <table className="w-full text-base border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 uppercase tracking-widest text-xs font-bold border-b border-white/10">
                    <th className="p-5 text-left w-16">编号</th>
                    <th className="p-5 text-left w-24">分类</th>
                    <th className="p-5 text-left">题目内容</th>
                    <th className="p-5 text-right w-24">评分</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {QUESTIONS.map((q) => (
                    <tr key={q.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-5 text-slate-500 font-mono text-sm">{q.id}</td>
                      <td className="p-5">
                        <span className="text-[10px] font-bold px-2 py-1 bg-white/10 rounded text-slate-300 border border-white/10">{q.code}</span>
                      </td>
                      <td className="p-5 text-slate-300 font-medium">{q.text}</td>
                      <td className="p-5 text-right font-bold text-yellow-500">{report.answers[q.id] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button 
            onClick={onReset} 
            className="text-slate-500 hover:text-white transition-colors font-semibold text-sm py-4 flex items-center gap-2 mx-auto"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            重新测试
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
