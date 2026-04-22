
import React, { useState } from 'react';
import { FinalReport, PrototypeResult } from '../types';
import { QUESTIONS, AXIS_MAP } from '../constants';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface Props {
  report: FinalReport;
  onReset: () => void;
}

const BRAND_PURPLE = '#4527A0';

const PROTO_COLORS: Record<string, string> = {
  V1: '#8b5cf6', V2: '#8b5cf6', V3: '#8b5cf6',
  R1: '#ec4899', R2: '#ec4899', R3: '#ec4899',
  S1: '#3b82f6', S2: '#3b82f6', S3: '#3b82f6',
  A1: '#94a3b8', A2: '#94a3b8', A3: '#94a3b8'
};

const ResultsView: React.FC<Props> = ({ report, onReset }) => {
  const [showRaw, setShowRaw] = useState(false);

  const radarData = report.axes.map(axis => ({
    subject: axis.name.split(' ')[0] + ' (' + axis.id + ')',
    A: axis.rawScore,
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
    <div className="max-w-5xl mx-auto pb-20 animate-fadeIn">
      <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden" id="report-content">
        
        {/* Simple Header */}
        <div className="flex justify-between items-end p-10 border-b border-slate-50">
          <div>
            <h1 className="text-3xl font-bold text-brand-purple mb-1">信念原型图谱</h1>
            <p className="text-slate-400 text-sm tracking-widest uppercase">Business & You Profile</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-brand-purple">{report.profile.name}</p>
            <p className="text-slate-400 text-xs font-mono">{report.profile.contact || "USER_ID"}</p>
          </div>
        </div>

        {/* Top Charts Section */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Radar Column */}
          <div className="bg-white p-8 rounded-3xl border border-slate-50 shadow-sm">
            <h3 className="text-center font-bold text-brand-purple text-xl mb-8">信念模式总览</h3>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 45]} tick={false} axisLine={false} />
                  <Radar
                    dataKey="A"
                    stroke={BRAND_PURPLE}
                    fill={BRAND_PURPLE}
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Analysis Column */}
          <div className="bg-white p-8 rounded-3xl border border-slate-50 shadow-sm">
            <h3 className="font-bold text-slate-800 text-xl mb-6">主要模式解析</h3>
            {report.primaryAxes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-2xl font-bold text-brand-purple">主要模式：{report.primaryAxes[0].name.split(' ')[0]} ({report.primaryAxes[0].id})</span>
                </div>
                <p className="text-slate-600 text-base leading-relaxed mb-10">
                  核心恐惧：失控。倾向微观管理，担忧资源匮乏，过度承担责任。
                </p>
                
                {/* Advice Box - Updated per screenshot: Solid purple, white bold text */}
                <div className="bg-brand-purple p-8 rounded-[32px] shadow-lg relative">
                  <div className="mb-4 text-3xl">💡</div>
                  <p className="text-white font-bold text-base md:text-lg leading-loose italic">
                    当您觉察到自己处于{report.primaryAxes[0].id}模式时，试着停下来问问自己：我是不是正在被过去的恐惧所驱动？这个当下，最真实、最有利于长远发展的选择是什么？
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Bar Chart */}
        <div className="px-10 pb-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-50 shadow-sm">
            <h3 className="font-bold text-brand-purple text-xl mb-8">细分维度透视</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <XAxis 
                    dataKey="id" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} 
                  />
                  <YAxis hide domain={[0, 15]} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }} 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={24}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PROTO_COLORS[entry.id]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* High Triggers List */}
        <div className="px-10 pb-20">
          <h3 className="font-bold text-slate-800 text-xl mb-8">高分触发点 (High Impact Triggers)</h3>
          <div className="space-y-4">
            {highTriggers.slice(0, 12).map((q, idx) => (
              <div key={idx} className="bg-slate-50 bg-opacity-40 p-5 rounded-xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-start gap-4 flex-1">
                  <span className={`text-[11px] font-bold px-3 py-1.5 rounded bg-opacity-10 min-w-[55px] text-center mt-1
                    ${q.axis === 'V' ? 'bg-violet-500 text-violet-700' : 
                      q.axis === 'R' ? 'bg-pink-500 text-pink-700' : 
                      q.axis === 'S' ? 'bg-blue-500 text-blue-700' : 'bg-slate-500 text-slate-700'}`}
                  >
                    {q.code}
                  </span>
                  <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">{q.text}</p>
                </div>
                <div className="flex items-center gap-3 ml-6 shrink-0">
                  <span className="text-xl font-bold text-brand-purple">{report.answers[q.id]}</span>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">分</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Footer - Updated per screenshot grid */}
        <div className="bg-brand-purple p-16 text-white rounded-br-[40px] relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 relative z-10">
            <div className="shrink-0">
              <h2 className="text-3xl font-bold mb-3">商业与你 Business & You</h2>
              <p className="text-brand-gold text-base font-medium tracking-[0.2em]">商业与人生的操作系统</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-16 gap-y-10 border-l-0 md:border-l border-white border-opacity-20 md:pl-16">
              <div className="space-y-2">
                <div className="text-lg font-bold">瓶颈思维</div>
                <div className="text-sm opacity-60 font-medium">物理世界的运行规则</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-bold">MPI 进化罗盘</div>
                <div className="text-sm opacity-60 font-medium">创业者的导航系统</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-bold">信念原型图谱</div>
                <div className="text-sm opacity-60 font-medium">心智模式的底层逻辑</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-bold">AI 赋能实践</div>
                <div className="text-sm opacity-60 font-medium">隐形之足：做中学</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-16 flex flex-col items-center gap-12 no-print">
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
          <button 
            onClick={handlePrint}
            className="flex-1 py-6 border-2 border-brand-purple text-brand-purple font-bold text-lg rounded-2xl hover:bg-brand-purple hover:text-white transition-all flex items-center justify-center gap-3 shadow-sm bg-white"
          >
            <span>📥 下载完整报告</span>
          </button>
          <button 
            onClick={() => alert(`请添加微信号预约 MPI 深度解读：${WeChatID}`)}
            className="flex-1 py-6 bg-brand-purple text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:bg-opacity-95 transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            <span className="text-2xl">📅</span>
            <span>预约 MPI 深度解读</span>
          </button>
        </div>

        <div className="text-center w-full">
          <button 
            onClick={() => setShowRaw(!showRaw)} 
            className="text-brand-purple font-bold text-base flex items-center gap-2 mx-auto mb-10 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl">{showRaw ? '▲' : '▼'}</span>
            <span>{showRaw ? '收起原始报表数据' : '查看原始报表数据'}</span>
          </button>

          {showRaw && (
            <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-soft border border-slate-100 text-left w-full max-w-5xl mx-auto mb-12 animate-slideDown overflow-x-auto">
              <h3 className="text-2xl font-bold text-slate-800 mb-10 border-b border-slate-50 pb-6">原始作答数据明细</h3>
              <table className="w-full text-base border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 uppercase tracking-widest text-xs font-bold border-b border-slate-100">
                    <th className="p-5 text-left w-16">编号</th>
                    <th className="p-5 text-left w-24">分类</th>
                    <th className="p-5 text-left">题目内容</th>
                    <th className="p-5 text-right w-24">评分</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {QUESTIONS.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 text-slate-400 font-mono text-sm">{q.id}</td>
                      <td className="p-5">
                        <span className="text-[11px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">{q.code}</span>
                      </td>
                      <td className="p-5 text-slate-600 font-medium">{q.text}</td>
                      <td className="p-5 text-right font-bold text-slate-800">{report.answers[q.id] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button 
            onClick={onReset} 
            className="text-slate-400 hover:text-brand-purple transition-colors font-semibold text-base py-4"
          >
            重新测试
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
