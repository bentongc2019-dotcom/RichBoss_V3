import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { quizQuestionsV3, archetypeInfoV3, ArchetypeV3 } from '../data/quizData'

type QuizPhase = 'intro' | 'quiz' | 'saving' | 'result'

export default function QuizPage() {
    const navigate = useNavigate()
    const [phase, setPhase] = useState<QuizPhase>('intro')
    const [currentQ, setCurrentQ] = useState(0)
    // 记录每道题的分数 (1-5)
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [result, setResult] = useState<{ archetype: ArchetypeV3; scores: Record<ArchetypeV3, number> } | null>(null)
    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string | null>(null)

    // 检查登录状态
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUserEmail(data.user?.email ?? null)
        })
    }, [])

    // 计算原型
    const calculateResult = (ans: Record<number, number>) => {
        const scores: Record<ArchetypeV3, number> = { V: 0, R: 0, S: 0, A: 0 }
        
        quizQuestionsV3.forEach((q, index) => {
            const score = ans[index] || 0
            scores[q.category] += score
        })

        // 找出最高分的原型
        const archetype = (Object.keys(scores) as ArchetypeV3[]).reduce(
            (a, b) => (scores[a] >= scores[b] ? a : b)
        )

        return { archetype, scores }
    }

    // 选择答案
    const handleAnswer = async (score: number) => {
        const newAnswers = { ...answers, [currentQ]: score }
        setAnswers(newAnswers)

        if (currentQ < quizQuestionsV3.length - 1) {
            // 延迟一点点跳转下一题，让用户看到选中状态
            setTimeout(() => {
                setCurrentQ(prev => prev + 1)
            }, 300)
        } else {
            // 全部答完
            const res = calculateResult(newAnswers)
            setResult(res)
            setPhase('saving')

            // 保存到 Supabase (如果有必要)
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                // TODO: 适配新的数据结构存储
                try {
                    await supabase.from('test_results').insert({
                        user_id: user.id,
                        archetype_type: res.archetype,
                        score: res.scores,
                        user_name: userName
                    })
                } catch (e) {
                    console.error('Save failed', e)
                }
            }
            
            setTimeout(() => {
                setPhase('result')
            }, 1000)
        }
    }

    const progress = ((currentQ) / quizQuestionsV3.length) * 100

    // ===== 引导页 (V3.09 截图还原) =====
    if (phase === 'intro') {
        return (
            <div className="min-h-screen bg-[#130B2A] flex items-center justify-center px-4 relative overflow-hidden font-sans">
                {/* 背景光晕 */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
                    {/* 顶部 Logo 与标题 */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 relative">
                            <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-30 rounded-full"></div>
                            <span className="material-symbols-outlined text-yellow-500 text-6xl relative z-10 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">local_fire_department</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-wide">
                            商业与你 <span className="text-yellow-500">Business&You</span>
                        </h1>
                        <p className="text-slate-400 text-sm tracking-[0.3em] uppercase">BELIEF ARCHETYPE MAP</p>
                    </div>

                    {/* 卡片区 */}
                    <div className="bg-[#1A103C]/80 backdrop-blur-md border-t-4 border-t-yellow-500 border border-white/5 rounded-2xl p-8 lg:p-12 w-full text-center shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">信念原型图谱测验</h2>
                        <div className="text-slate-300 text-sm leading-relaxed space-y-4 mb-10">
                            <p>这不是一个给人贴标签的性格测试，而是一份「内在运作地图」。</p>
                            <p>它将帮助你看见：在压力与关键决策下，是什么样的信念模式<br className="hidden md:block"/>在驱动或限制你的商业与人生表现。</p>
                        </div>

                        <div className="space-y-6">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="请输入您的称呼" 
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full bg-[#130B2A] border border-white/10 focus:border-yellow-500/50 rounded-xl px-6 py-4 text-center text-white placeholder-slate-500 outline-none transition-all"
                                />
                            </div>
                            
                            <button
                                onClick={() => {
                                    if (!userName.trim()) {
                                        alert('请输入您的称呼')
                                        return
                                    }
                                    setPhase('quiz')
                                }}
                                className="w-full bg-gradient-to-r from-yellow-500 to-amber-400 hover:to-yellow-400 text-[#130B2A] font-bold text-lg rounded-xl px-6 py-4 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2"
                            >
                                开始探索内在地图 <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </div>

                        <div className="mt-8 text-slate-500 text-sm flex items-center justify-center gap-1 hover:text-slate-400 cursor-pointer transition-colors">
                            <span className="material-symbols-outlined text-sm">lock</span> 管理入口
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // ===== 保存中 =====
    if (phase === 'saving') {
        return (
            <div className="min-h-screen bg-[#130B2A] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mx-auto mb-6" />
                    <p className="text-white font-bold text-xl">正在生成你的内在运作地图...</p>
                    <p className="text-slate-400 text-sm mt-2">{userName}，请稍候</p>
                </div>
            </div>
        )
    }

    // ===== 答题页 =====
    if (phase === 'quiz') {
        const q = quizQuestionsV3[currentQ]
        const currentAnswer = answers[currentQ]

        return (
            <div className="min-h-screen bg-[#130B2A] flex flex-col font-sans relative">
                {/* 顶部进度条 */}
                <div className="w-full h-1.5 bg-white/5 fixed top-0 z-50">
                    <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 max-w-3xl mx-auto w-full">
                    {/* 题号与称呼 */}
                    <div className="flex items-center justify-between w-full mb-12">
                        <span className="text-yellow-500 font-bold text-sm tracking-widest uppercase bg-yellow-500/10 px-4 py-1.5 rounded-full border border-yellow-500/20">
                            {currentQ + 1} / {quizQuestionsV3.length}
                        </span>
                        <span className="text-slate-400 text-sm">
                            答卷人: {userName}
                        </span>
                    </div>

                    {/* 题目内容 */}
                    <div className="min-h-[120px] flex items-center mb-16 w-full">
                        <h2 className="text-2xl lg:text-3xl font-bold text-white leading-relaxed text-center w-full">
                            "{q.text}"
                        </h2>
                    </div>

                    {/* 1-5分量表区 */}
                    <div className="w-full space-y-8">
                        <div className="flex justify-between text-xs lg:text-sm text-slate-500 font-medium px-2">
                            <span>极度不同意</span>
                            <span>极度同意</span>
                        </div>
                        <div className="grid grid-cols-5 gap-3 lg:gap-4">
                            {[1, 2, 3, 4, 5].map((score) => (
                                <button
                                    key={score}
                                    onClick={() => handleAnswer(score)}
                                    className={`relative h-16 lg:h-20 rounded-xl lg:rounded-2xl border-2 transition-all duration-200 flex items-center justify-center text-xl lg:text-2xl font-bold
                                        ${currentAnswer === score 
                                            ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500 scale-105 shadow-[0_0_20px_rgba(234,179,8,0.2)]' 
                                            : 'bg-white/5 border-white/10 text-slate-400 hover:border-yellow-500/50 hover:bg-white/10 hover:text-white'
                                        }
                                    `}
                                >
                                    {score}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between px-2">
                            <span className="text-slate-500 text-xs">1分</span>
                            <span className="text-slate-500 text-xs">2分</span>
                            <span className="text-slate-500 text-xs">3分</span>
                            <span className="text-slate-500 text-xs">4分</span>
                            <span className="text-slate-500 text-xs">5分</span>
                        </div>
                    </div>

                    {/* 底部控制栏 */}
                    <div className="mt-20 w-full flex justify-between items-center border-t border-white/5 pt-8">
                        {currentQ > 0 ? (
                            <button
                                onClick={() => setCurrentQ(prev => prev - 1)}
                                className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span> 上一题
                            </button>
                        ) : <div/>}
                        
                        <button
                            onClick={() => {
                                if(window.confirm('确定要退出当前测验吗？进度将会丢失。')) {
                                    navigate('/')
                                }
                            }}
                            className="text-slate-600 hover:text-red-400 transition-colors text-sm"
                        >
                            退出测验
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // ===== 结果页 =====
    if (phase === 'result' && result) {
        const info = archetypeInfoV3[result.archetype]
        // 满分是 每题5分 * 9题 = 45分。转换成百分比方便展示
        const maxScorePerCategory = 45

        return (
            <div className="min-h-screen bg-[#130B2A] font-sans pb-20">
                {/* 头部结果宣告 */}
                <div className="relative pt-20 pb-16 px-6 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-b ${info.gradient} opacity-10`} />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="max-w-3xl mx-auto text-center relative z-10">
                        <div className="inline-block text-6xl mb-6 drop-shadow-2xl">{info.emoji}</div>
                        <p className="text-yellow-500 font-bold tracking-widest text-sm mb-4 uppercase">
                            {userName} 的主导信念模式
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-black text-white mb-6">
                            {info.name}
                        </h1>
                        <p className="text-xl text-slate-300">
                            "{info.tagline}"
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 space-y-8">
                    {/* 分数雷达或条形图 */}
                    <div className="bg-[#1A103C] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-xl">
                        <h2 className="text-white font-bold text-xl mb-8 flex items-center gap-3">
                            <span className="material-symbols-outlined text-yellow-500">monitoring</span>
                            你的信念图谱分布
                        </h2>
                        
                        <div className="space-y-6">
                            {(Object.keys(result.scores) as ArchetypeV3[]).map(type => {
                                const score = result.scores[type]
                                const pct = Math.round((score / maxScorePerCategory) * 100)
                                const isMain = type === result.archetype
                                const typeInfo = archetypeInfoV3[type]

                                return (
                                    <div key={type} className="relative">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className={`font-bold ${isMain ? 'text-yellow-500' : 'text-slate-300'}`}>
                                                {typeInfo.emoji} {typeInfo.name}
                                            </span>
                                            <span className="text-slate-400">
                                                {score} 分 / {pct}%
                                            </span>
                                        </div>
                                        <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ease-out ${isMain ? 'bg-gradient-to-r from-yellow-500 to-amber-400' : 'bg-slate-600'}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 详细解读卡片 */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#1A103C] border border-white/5 rounded-3xl p-8">
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-purple-400">psychology</span>
                                模式解析
                            </h3>
                            <p className="text-slate-400 leading-relaxed">{info.description}</p>
                        </div>
                        
                        <div className="bg-[#1A103C] border border-white/5 rounded-3xl p-8">
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-400">verified</span>
                                你的优势
                            </h3>
                            <ul className="space-y-3">
                                {info.strengths.map((s, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-400">
                                        <span className="material-symbols-outlined text-green-400 text-sm mt-0.5">check_circle</span>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#1A103C] border border-white/5 rounded-3xl p-8">
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-400">warning</span>
                                潜在盲点
                            </h3>
                            <ul className="space-y-3">
                                {info.blindspots.map((s, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-400">
                                        <span className="material-symbols-outlined text-red-400 text-sm mt-0.5">error</span>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-3xl p-8">
                            <h3 className="text-yellow-500 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">lightbulb</span>
                                破局建议
                            </h3>
                            <p className="text-slate-300 leading-relaxed">{info.advice}</p>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <button
                            onClick={() => navigate('/')}
                            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-8 py-4 transition-all"
                        >
                            返回首页
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return null
}
