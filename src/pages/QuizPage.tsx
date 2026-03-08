import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, ArchetypeType, ArchetypeScore } from '../utils/supabase'
import { quizQuestions, archetypeInfo } from '../data/quizData'

type QuizPhase = 'intro' | 'quiz' | 'saving' | 'result'

export default function QuizPage() {
    const navigate = useNavigate()
    const [phase, setPhase] = useState<QuizPhase>('intro')
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState<Record<number, ArchetypeType>>({})
    const [result, setResult] = useState<{ archetype: ArchetypeType; score: ArchetypeScore } | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)

    // 检查登录状态
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUserEmail(data.user?.email ?? null)
        })
    }, [])

    // 计算原型
    const calculateResult = (ans: Record<number, ArchetypeType>) => {
        const score: ArchetypeScore = { entrepreneur: 0, investor: 0, stability: 0, explorer: 0 }
        Object.values(ans).forEach(archetype => { score[archetype]++ })
        const archetype = (Object.keys(score) as ArchetypeType[]).reduce(
            (a, b) => (score[a] >= score[b] ? a : b)
        )
        return { archetype, score }
    }

    // 选择答案
    const handleAnswer = async (archetype: ArchetypeType) => {
        const newAnswers = { ...answers, [currentQ]: archetype }
        setAnswers(newAnswers)

        if (currentQ < quizQuestions.length - 1) {
            setCurrentQ(prev => prev + 1)
        } else {
            // 全部答完
            const res = calculateResult(newAnswers)
            setResult(res)
            setPhase('saving')

            // 保存到 Supabase
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                await supabase.from('test_results').insert({
                    user_id: user.id,
                    archetype_type: res.archetype,
                    score: res.score,
                })
            }
            setPhase('result')
        }
    }

    const progress = ((currentQ) / quizQuestions.length) * 100

    // ===== 引导页 =====
    if (phase === 'intro') {
        return (
            <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center px-4">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 max-w-2xl w-full text-center">
                    <div className="inline-block text-6xl mb-6">🧠</div>
                    <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                        信念原型<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FDE047]">测验</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-3 leading-relaxed">
                        通过 20 道精心设计的问题，揭开你潜意识中的财富信念模式。
                    </p>
                    <p className="text-slate-500 text-sm mb-10">
                        预计约 3-5 分钟完成 · 请根据直觉作答，无对错之分
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {(Object.keys(archetypeInfo) as ArchetypeType[]).map(type => {
                            const info = archetypeInfo[type]
                            return (
                                <div key={type} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                    <div className="text-3xl mb-2">{info.emoji}</div>
                                    <div className="text-white text-sm font-bold">{info.name}</div>
                                </div>
                            )
                        })}
                    </div>

                    {userEmail ? (
                        <button
                            onClick={() => setPhase('quiz')}
                            className="bg-gradient-to-r from-[#D4AF37] to-[#FDE047] text-[#0F0F12] font-black px-12 py-5 rounded-2xl text-xl hover:brightness-110 transition-all hover:-translate-y-1 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                        >
                            开始测验 →
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-slate-500 text-sm">登录后即可保存你的测验结果</p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/auth?redirect=/quiz')}
                                    className="bg-gradient-to-r from-[#D4AF37] to-[#FDE047] text-[#0F0F12] font-black px-8 py-4 rounded-xl hover:brightness-110 transition-all"
                                >
                                    登录 / 注册
                                </button>
                                <button
                                    onClick={() => setPhase('quiz')}
                                    className="border border-white/20 text-white px-8 py-4 rounded-xl hover:border-white/40 transition-all"
                                >
                                    游客模式测验
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // ===== 保存中 =====
    if (phase === 'saving') {
        return (
            <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-6" />
                    <p className="text-white font-bold text-xl">正在分析你的财富原型...</p>
                    <p className="text-slate-400 text-sm mt-2">保存结果中</p>
                </div>
            </div>
        )
    }

    // ===== 答题页 =====
    if (phase === 'quiz') {
        const q = quizQuestions[currentQ]
        return (
            <div className="min-h-screen bg-[#0F0F12] flex flex-col">
                {/* 顶部进度条 */}
                <div className="w-full h-1 bg-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FDE047] transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex-1 flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-2xl">
                        {/* 题号 */}
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">
                                问题 {currentQ + 1} / {quizQuestions.length}
                            </span>
                            <button
                                onClick={() => navigate('/')}
                                className="text-slate-600 hover:text-slate-400 transition-colors text-sm"
                            >
                                退出测验
                            </button>
                        </div>

                        {/* 题目 */}
                        <h2 className="text-2xl lg:text-3xl font-black text-white mb-10 leading-snug">
                            {q.question}
                        </h2>

                        {/* 选项 */}
                        <div className="space-y-4">
                            {q.options.map(opt => (
                                <button
                                    key={opt.label}
                                    onClick={() => handleAnswer(opt.archetype)}
                                    className="w-full text-left bg-white/[0.04] hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl px-6 py-5 transition-all duration-200 group active:scale-[0.98]"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#D4AF37]/60 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-[#D4AF37] transition-colors flex-shrink-0">
                                            {opt.label}
                                        </span>
                                        <span className="text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                                            {opt.text}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* 返回上一题 */}
                        {currentQ > 0 && (
                            <button
                                onClick={() => setCurrentQ(prev => prev - 1)}
                                className="mt-8 text-slate-600 hover:text-slate-400 transition-colors text-sm flex items-center gap-1"
                            >
                                ← 返回上一题
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // ===== 结果页 =====
    if (phase === 'result' && result) {
        const info = archetypeInfo[result.archetype]
        const totalQuestions = quizQuestions.length

        return (
            <div className="min-h-screen bg-[#0F0F12]">
                {/* 头部英雄区 */}
                <div className="relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-10`} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
                        style={{ backgroundColor: info.color }} />

                    <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
                        <p className="text-slate-400 text-sm uppercase tracking-widest mb-4">你的信念原型</p>
                        <div className="text-8xl mb-6">{info.emoji}</div>
                        <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">
                            {info.name}
                        </h1>
                        <p className="text-xl text-slate-300 font-medium mb-2" style={{ color: info.color }}>
                            "{info.tagline}"
                        </p>
                    </div>
                </div>

                {/* 内容区 */}
                <div className="max-w-4xl mx-auto px-6 pb-20">
                    {/* 得分条 */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                        <h2 className="text-white font-bold text-lg mb-6">你的原型分布</h2>
                        <div className="space-y-4">
                            {(Object.keys(result.score) as ArchetypeType[])
                                .sort((a, b) => result.score[b] - result.score[a])
                                .map(type => {
                                    const pct = Math.round((result.score[type] / totalQuestions) * 100)
                                    const isMain = type === result.archetype
                                    return (
                                        <div key={type}>
                                            <div className="flex justify-between text-sm mb-1.5">
                                                <span className={`font-medium ${isMain ? 'text-white' : 'text-slate-400'}`}>
                                                    {archetypeInfo[type].emoji} {archetypeInfo[type].name}
                                                </span>
                                                <span className={isMain ? 'text-[#D4AF37] font-bold' : 'text-slate-500'}>
                                                    {pct}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-700"
                                                    style={{
                                                        width: `${pct}%`,
                                                        backgroundColor: isMain ? info.color : '#374151',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>

                    {/* 详细解读 */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#D4AF37]">psychology</span>
                                人格解读
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm">{info.description}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-400">verified</span>
                                你的优势
                            </h3>
                            <ul className="space-y-2">
                                {info.strengths.map((s, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                        <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-400">warning</span>
                                潜在盲点
                            </h3>
                            <ul className="space-y-2">
                                {info.blindspots.map((s, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                        <span className="text-amber-400 mt-0.5 flex-shrink-0">!</span>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined" style={{ color: info.color }}>lightbulb</span>
                                专属建议
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm">{info.advice}</p>
                        </div>
                    </div>

                    {/* 会员 CTA */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 p-10 text-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full px-4 py-1 text-xs text-[#D4AF37] font-bold uppercase tracking-widest mb-6">
                                <span className="material-symbols-outlined text-sm">workspace_premium</span>
                                限时优惠
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                                加入富老板年度会员
                            </h2>
                            <p className="text-slate-400 mb-3 max-w-xl mx-auto leading-relaxed">
                                基于你的<span className="text-[#D4AF37] font-bold">{info.name}</span>特质，
                                富老板会员系统将为你定制专属的财富进阶路径。
                                解锁深度课程、私密社群和实战工具箱。
                            </p>
                            <p className="text-slate-500 text-sm mb-8">
                                加入后即可获得针对 {info.name} 的专属学习计划
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-gradient-to-r from-[#D4AF37] to-[#FDE047] text-[#0F0F12] font-black px-10 py-4 rounded-xl text-lg hover:brightness-110 transition-all hover:-translate-y-1 shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-[0.98]">
                                    🌟 加入年度会员计划
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="border border-white/20 text-white px-8 py-4 rounded-xl hover:border-white/40 transition-all"
                                >
                                    返回首页
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 再测一次 */}
                    <div className="text-center mt-8">
                        <button
                            onClick={() => {
                                setPhase('intro')
                                setCurrentQ(0)
                                setAnswers({})
                                setResult(null)
                            }}
                            className="text-slate-500 hover:text-slate-300 transition-colors text-sm"
                        >
                            重新测验
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return null
}
