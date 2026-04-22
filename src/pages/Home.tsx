import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroVisual from '../components/HeroVisual';

function Home() {
    const navigate = useNavigate();
    const [isReadingAnim, setIsReadingAnim] = useState(false);

    const handleReadClick = (e: MouseEvent<Element>) => {
        e.preventDefault();
        setIsReadingAnim(true);
        setTimeout(() => navigate('/reader'), 1500);
    };
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <header
                className="fixed top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4">
                <nav className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src={`${import.meta.env.BASE_URL}images/logo.png`}
                            alt="Rich Boss Logo"
                            className="h-12 lg:h-14 w-auto object-contain"
                        />
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <a className="text-sm font-medium hover:text-primary transition-colors text-slate-300"
                            href="#concept">核心象限</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors text-slate-300"
                            href="#book">财富书籍</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors text-slate-300"
                            href="#learning">成长模块</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors text-slate-300"
                            href="#tools">原型测验</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/auth')}
                            className="hidden sm:block text-sm font-semibold text-white px-4 py-2 hover:text-primary transition-colors"
                        >
                            登录
                        </button>
                        <button
                            onClick={() => navigate('/auth')}
                            className="bg-primary text-background-dark px-6 py-2 text-sm font-bold rounded-lg hover:brightness-110 transition-all"
                        >
                            加入会员
                        </button>
                    </div>
                </nav>
            </header>
            <main className="flex-grow pt-24">
                <section className="relative px-6 lg:px-20 pt-8 pb-20 lg:pt-12 lg:pb-32 overflow-hidden">
                    <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="z-10">
                            <div
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/40 to-black border border-purple-500/30 mb-6 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span
                                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                                </span>
                                <span className="text-xs font-bold text-yellow-500 tracking-[0.2em] uppercase">Wealth OS v2.0</span>
                            </div>

                            <h1 className="flex flex-col gap-4 mb-10">
                                {/* 第一行 */}
                                <span className="block text-2xl lg:text-3xl font-medium text-white animate-reveal" style={{ animationDelay: '0s' }}>
                                    富老板不是赚更多钱
                                </span>

                                {/* 第二行 */}
                                <span className="block text-3xl lg:text-4xl font-bold text-white animate-reveal" style={{ animationDelay: '0.35s' }}>
                                    而是设计
                                </span>

                                {/* 第三行 */}
                                <span className="block text-[1.6rem] sm:text-4xl lg:text-5xl font-black leading-tight animate-reveal whitespace-nowrap tracking-tight sm:tracking-normal" style={{ animationDelay: '0.7s' }}>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FDE047] to-[#D4AF37]">
                                        让钱
                                    </span>
                                    {/* 自动流动 — 保留底部粒子流动 SVG */}
                                    <span className="relative inline-block mx-1">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE047] to-[#FFFBEB]">自动流动</span>
                                        <svg className="absolute -bottom-1 left-0 w-full h-4 overflow-visible" viewBox="0 0 100 16" preserveAspectRatio="none">
                                            <path id="fp2" d="M 0 8 Q 50 15 100 8" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.2" />
                                            <path d="M 0 8 Q 50 15 100 8" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="28 100" opacity="0.85">
                                                <animate attributeName="stroke-dashoffset" from="128" to="0" dur="1.8s" repeatCount="indefinite" />
                                            </path>
                                            <circle r="1.8" fill="#FFFBEB">
                                                <animateMotion dur="1.8s" repeatCount="indefinite"><mpath href="#fp2" /></animateMotion>
                                                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="1.8s" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                    </span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FDE047] to-[#D4AF37]">
                                        的系统
                                    </span>
                                </span>
                            </h1>

                            <div className="flex flex-wrap gap-4 animate-reveal" style={{ animationDelay: '1.1s' }}>
                                <button onClick={handleReadClick}
                                    className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#FDE047] text-[#0F0F12] px-10 py-5 font-black rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] border border-transparent hover:border-purple-500/50">
                                    <div className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <span className="material-symbols-outlined text-2xl relative z-10 group-hover:rotate-12 transition-transform duration-500">menu_book</span>
                                    <span className="text-lg lg:text-xl tracking-widest relative z-10">开始阅读</span>
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <HeroVisual isReading={isReadingAnim} />
                        </div>
                    </div>
                </section>
                <section className="relative py-24 px-6 lg:px-20 overflow-hidden border-y border-white/5" id="concept"
                    style={{ "backgroundColor": "#0F0F12" }}>

                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
                        style={{ "backgroundImage": "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)", "backgroundSize": "32px 32px", "backgroundPosition": "-19px -19px" }}>
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl text-center mb-20">
                        <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4 tracking-wide text-center"
                            style={{ "fontFamily": "'Noto Serif SC', 'Songti SC', serif" }}>
                            <span className="block mb-2 text-center">『钱 × 闲』</span>
                            <span className="block text-center">餐巾纸地图</span>
                        </h2>
                        <p
                            className="text-slate-400 max-w-2xl mx-auto font-sans tracking-[0.2em] text-xs md:text-sm uppercase opacity-70 mb-6">
                            识别你真实的财务象限，突破认知的玻璃天花板</p>
                        <div className="inline-block bg-white/5 border border-white/10 rounded-xl px-8 py-4 backdrop-blur-sm">
                            <p className="text-slate-300 text-sm md:text-base tracking-widest mb-2 font-medium">
                                <span className="text-primary">财富的本质</span>只有两个维度：
                            </p>
                            <div className="text-white font-bold tracking-widest text-[1.1rem] md:text-lg text-center leading-loose flex items-center justify-center gap-2 whitespace-nowrap">
                                <span className="inline-block">钱 (Money)</span>
                                <span className="text-white/20 font-light">×</span>
                                <span className="inline-block">闲 (Freedom)</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="relative z-10 mx-auto max-w-5xl rounded-[2rem] bg-[#0a0a0a] p-4 md:p-12 lg:p-16 border border-white/10 shadow-2xl overflow-hidden">

                        {/* Coordinate Axes Background (Visible on md and up) */}
                        <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
                            {/* Horizontal Axis */}
                            <div className="absolute inset-0 flex items-center justify-between px-2">
                                <div className="absolute left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                {/* Left Arrow */}
                                <div className="absolute left-4 w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] border-r-white/30"></div>
                                {/* Right Arrow */}
                                <div className="absolute right-4 w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white/30"></div>
                                
                                <span className="relative z-10 text-white/60 text-sm font-bold tracking-widest bg-[#0a0a0a] px-4 ml-6">没钱</span>
                                <span className="relative z-10 text-white/60 text-sm font-bold tracking-widest bg-[#0a0a0a] px-4 mr-6">有钱</span>
                            </div>

                            {/* Vertical Axis */}
                            <div className="absolute inset-0 flex flex-col items-center justify-between py-2">
                                <div className="absolute top-6 bottom-6 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                                {/* Top Arrow */}
                                <div className="absolute top-4 w-0 h-0 border-x-[6px] border-x-transparent border-b-[10px] border-b-white/30"></div>
                                {/* Bottom Arrow */}
                                <div className="absolute bottom-4 w-0 h-0 border-x-[6px] border-x-transparent border-t-[10px] border-t-white/30"></div>
                                
                                <span className="relative z-10 text-white/60 text-sm font-bold tracking-widest bg-[#0a0a0a] py-3 mt-6">有闲</span>
                                <span className="relative z-10 text-white/60 text-sm font-bold tracking-widest bg-[#0a0a0a] py-3 mb-6">没闲</span>
                            </div>
                        </div>

                        {/* Quadrants Grid */}
                        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 lg:gap-10 relative z-10 mt-8 mb-8">

                            {/* Top-Left: 没钱 × 有闲 */}
                            <div
                                className="order-2 md:order-1 relative bg-[#0a0a0a]/80 backdrop-blur-xl p-5 md:p-8 lg:p-10 rounded-2xl border border-[#3B82F6]/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] group transition-all duration-500 hover:scale-[1.02] hover:border-[#3B82F6]/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] flex flex-col h-full overflow-hidden z-10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_100%)] pointer-events-none group-hover:opacity-80 transition-opacity"></div>
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <h3 className="text-xl font-serif text-white/90 group-hover:text-white transition-colors tracking-widest"
                                        style={{ "fontFamily": "'Noto Serif SC', 'Songti SC', serif" }}>没钱<span className="text-white/20 font-light mx-3">×</span>有闲</h3>
                                    <span className="material-symbols-outlined text-[#3B82F6]/70 group-hover:text-[#3B82F6] text-3xl font-light transition-colors drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">hourglass_empty</span>
                                </div>
                                <p className="font-sans text-sm text-slate-300 tracking-[0.08em] leading-relaxed relative z-10">
                                    空有时间却无资产杠杆。生活节奏缓慢，但缺乏抵御风险的财务护城河。</p>
                            </div>

                            {/* Top-Right: 有钱 × 有闲 (Target State) */}
                            <div
                                className="order-1 md:order-2 relative bg-[#0a0a0a]/80 backdrop-blur-xl p-5 md:p-8 lg:p-10 rounded-2xl border border-[#7C3AED]/50 animate-quadrant-glow group transition-all duration-500 hover:scale-[1.02] flex flex-col h-full overflow-hidden z-20 ring-2 ring-primary shadow-xl">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.35)_0%,transparent_100%)] pointer-events-none animate-radial-pulse"></div>
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#FFD700] transition-colors tracking-widest"
                                        style={{ "fontFamily": "'Noto Serif SC', 'Songti SC', serif" }}>有钱<span className="text-white/20 font-light mx-3">×</span>有闲</h3>
                                    <span className="material-symbols-outlined text-[#FFD700] group-hover:text-[#FACC15] text-3xl font-light transition-colors animate-diamond drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">diamond</span>
                                </div>
                                <p className="font-sans text-sm text-white tracking-[0.08em] leading-relaxed relative z-10">
                                    <span className="text-[#FFD700] tracking-[0.1em] block mb-2 font-medium">富老板系统的终极状态。</span>
                                    金钱为你工作，系统自动创造现金流，实现真正的人生自由。</p>
                            </div>

                            {/* Bottom-Left: 没钱 × 没闲 */}
                            <div
                                className="order-3 md:order-3 relative bg-[#0a0a0a]/80 backdrop-blur-xl p-5 md:p-8 lg:p-10 rounded-2xl border border-[#EF4444]/30 shadow-[0_0_20px_rgba(239,68,68,0.1)] group transition-all duration-500 hover:scale-[1.02] hover:border-[#EF4444]/50 hover:shadow-[0_0_40px_rgba(239,68,68,0.3)] flex flex-col h-full overflow-hidden z-10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_100%)] pointer-events-none group-hover:opacity-80 transition-opacity"></div>
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <h3 className="text-xl font-serif text-white/90 group-hover:text-white transition-colors tracking-widest"
                                        style={{ "fontFamily": "'Noto Serif SC', 'Songti SC', serif" }}>没钱<span className="text-white/20 font-light mx-3">×</span>没闲</h3>
                                    <span className="material-symbols-outlined text-[#EF4444]/70 group-hover:text-[#EF4444] text-3xl font-light transition-colors drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">warning</span>
                                </div>
                                <p className="font-sans text-sm text-slate-300 tracking-[0.08em] leading-relaxed relative z-10">
                                    深陷“老鼠赛跑”。用时间换取微薄薪水，同时被负债与消费逐渐掏空资产框架。</p>
                            </div>

                            {/* Bottom-Right: 有钱 × 没闲 */}
                            <div
                                className="order-4 md:order-4 relative bg-[#0a0a0a]/80 backdrop-blur-xl p-5 md:p-8 lg:p-10 rounded-2xl border border-[#22C55E]/30 shadow-[0_0_20px_rgba(34,197,94,0.1)] group transition-all duration-500 hover:scale-[1.02] hover:border-[#22C55E]/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] flex flex-col h-full overflow-hidden z-10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_100%)] pointer-events-none group-hover:opacity-80 transition-opacity"></div>
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <h3 className="text-xl font-serif text-white/90 group-hover:text-white transition-colors tracking-widest"
                                        style={{ "fontFamily": "'Noto Serif SC', 'Songti SC', serif" }}>有钱<span className="text-white/20 font-light mx-3">×</span>没闲</h3>
                                    <span className="material-symbols-outlined text-[#22C55E]/70 group-hover:text-[#22C55E] text-3xl font-light transition-colors drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">business_center</span>
                                </div>
                                <p className="font-sans text-sm text-slate-300 tracking-[0.08em] leading-relaxed relative z-10">
                                    高薪的隐形枷锁。现金流庞大，但系统高度依赖个人时间，一旦停下，运转即刻停滞。</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-24 px-6 lg:px-20 overflow-hidden" id="book">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="w-full lg:w-1/2 order-2 lg:order-1">
                                <h4 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm md:text-base">Core Literature</h4>
                                <h2 className="flex flex-col gap-2 font-black text-white mb-6 leading-tight">
                                    <span className="block text-[1.6rem] md:text-4xl lg:text-5xl text-center">《富老板，穷老板》</span>
                                    <span className="block text-[1.3rem] md:text-4xl lg:text-5xl text-center">Wealth System Manifesto</span>
                                </h2>
                                <p className="text-base md:text-lg text-slate-400 mb-8 leading-relaxed">
                                    这不是一本教你省钱的书，这是一本教你如何构建资产大厦的蓝图。通过5个核心维度，重构你的财富认知底层代码。
                                </p>
                                <div className="space-y-4 mb-10">
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                        <div>
                                            <h5 className="font-bold text-white">资产 vs 负债</h5>
                                            <p className="text-sm text-slate-500">重新定义每一分钱的去向。</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                        <div>
                                            <h5 className="font-bold text-white">现金流三要素</h5>
                                            <p className="text-sm text-slate-500">理解流入、流出与存量的动态平衡。</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex mt-8">
                                    <a href="#/reader" onClick={handleReadClick}
                                        className="group relative inline-flex items-center justify-center gap-3 bg-[#EAB308] text-[#0F0F12] px-8 py-3.5 font-bold rounded-xl transition-all hover:bg-[#FACC15] shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(250,204,21,0.3)]"><span className="material-symbols-outlined text-xl">menu_book</span><span className="text-base tracking-widest">开始阅读</span></a>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:gap-8">
                                <div className="relative group">
                                    <div
                                        className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform">
                                    </div>
                                    <div
                                        className="relative w-72 lg:w-96 aspect-[3/4] bg-surface-dark border-4 border-white/10 rounded-2xl shadow-2xl overflow-hidden transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                        <img className="w-full h-full object-cover" alt="富老板，穷老板 书籍封面"
                                            src={`${import.meta.env.BASE_URL}images/cover.jpg`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-surface-dark py-24 px-6 lg:px-20" id="learning">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">进阶学习模块</h2>
                                <p className="text-slate-400">从心态到执行，全方位的财富体系构建指南</p>
                            </div>
                            <button className="hidden md:flex items-center gap-2 text-primary font-bold">
                                查看所有课程 <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div
                                className="bg-background-dark p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-all hover:-translate-y-1">
                                <span className="material-symbols-outlined text-primary text-4xl mb-6">psychology</span>
                                <h3 className="text-xl font-bold text-white mb-3">财富心态 (Mindset)</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">重构潜意识中的金钱信念，建立富人思维底层框架。</p>
                                <a className="text-primary text-sm font-bold uppercase tracking-widest" href="#">Explore →</a>
                            </div>
                            <div
                                className="bg-background-dark p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-all hover:-translate-y-1">
                                <span className="material-symbols-outlined text-primary text-4xl mb-6">hub</span>
                                <h3 className="text-xl font-bold text-white mb-3">系统思维 (Systems)</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">学习如何通过流程与工具，让资产实现自动化运转。</p>
                                <a className="text-primary text-sm font-bold uppercase tracking-widest" href="#">Explore →</a>
                            </div>
                            <div
                                className="bg-background-dark p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-all hover:-translate-y-1">
                                <span className="material-symbols-outlined text-primary text-4xl mb-6">rocket_launch</span>
                                <h3 className="text-xl font-bold text-white mb-3">创业实战 (Business)</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">从0到1构建可规模化的商业模式，跨越S象限进入B象限。</p>
                                <a className="text-primary text-sm font-bold uppercase tracking-widest" href="#">Explore →</a>
                            </div>
                            <div
                                className="bg-background-dark p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-all hover:-translate-y-1">
                                <span className="material-symbols-outlined text-primary text-4xl mb-6">query_stats</span>
                                <h3 className="text-xl font-bold text-white mb-3">投资策略 (Strategy)</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">宏观周期识别与资产配置，让每一分资本都为你效力。</p>
                                <a className="text-primary text-sm font-bold uppercase tracking-widest" href="#">Explore →</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-24 px-6 lg:px-20 relative overflow-hidden" id="tools">
                    <div className="mx-auto max-w-7xl bg-primary rounded-3xl p-10 lg:p-20 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-black/10 -skew-x-12 transform translate-x-1/2">
                        </div>
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-4xl lg:text-5xl font-black text-background-dark mb-6 leading-tight">信念原型测验</h2>
                            <p className="text-lg text-background-dark/80 mb-10">
                                你是“焦虑的储蓄者”还是“冒险的投机家”？通过20道专业心理测验，揭开阻碍你财富增长的潜意识枷锁，获取定制化的进阶建议。
                            </p>
                            <button
                                onClick={() => navigate('/quiz')}
                                className="bg-background-dark border border-transparent hover:border-purple-500/50 text-white px-10 py-4 font-black rounded-xl hover:scale-105 transition-all flex items-center gap-3 hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]">
                                开始免费测验 <span className="material-symbols-outlined">quiz</span>
                            </button>
                        </div>
                        <div className="absolute right-10 bottom-10 hidden lg:block opacity-20">
                            <span className="material-symbols-outlined text-[200px] text-background-dark">fingerprint</span>
                        </div>
                    </div>
                </section>
                <section className="bg-background-dark py-24 px-6 lg:px-20 border-t border-white/5">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">加入富老板私享会</h2>
                            <p className="text-slate-400">不仅是知识，更是高端的人脉圈层与实操工具集</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div
                                className="p-8 rounded-2xl bg-surface-dark border border-white/10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-primary text-3xl">library_books</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">独家深度资料库</h3>
                                <p className="text-slate-400 text-sm">每月更新财富白皮书、行业深度报告与私密读书会录影。</p>
                            </div>
                            <div
                                className="p-8 rounded-2xl bg-surface-dark border border-primary/40 flex flex-col items-center text-center relative">
                                <div
                                    className="absolute -top-4 bg-primary text-background-dark px-4 py-1 rounded-full text-xs font-black uppercase">
                                    Most Popular</div>
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-primary text-3xl">construction</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">财富策略工具箱</h3>
                                <p className="text-slate-400 text-sm">提供自动化资产配置模版、ROI计算器与系统运作SOP文档。</p>
                            </div>
                            <div
                                className="p-8 rounded-2xl bg-surface-dark border border-white/10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-primary text-3xl">groups</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">高净值私密社区</h3>
                                <p className="text-slate-400 text-sm">与同频的系统构建者共同成长，链接优质的线下投资合作机会。</p>
                            </div>
                        </div>
                        <div className="mt-16 text-center">
                            <button
                                onClick={() => navigate('/auth')}
                                className="bg-primary text-background-dark px-12 py-5 text-lg font-black rounded-full hover:brightness-110 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                                申请加入年度会员计划
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-background-dark py-16 px-6 lg:px-20 border-t border-white/10">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-6">
                            <img
                                src={`${import.meta.env.BASE_URL}images/logo.png`}
                                alt="Rich Boss Logo"
                                className="h-12 lg:h-14 w-auto object-contain"
                            />
                        </div>
                        <p className="text-slate-500 max-w-sm mb-6">旨在通过系统化思维，帮助人们摆脱时间换金钱的死循环，构建属于自己的财富操作系统。</p>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
                                href="#">
                                <span className="material-symbols-outlined text-lg">public</span>
                            </a>
                            <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
                                href="#">
                                <span className="material-symbols-outlined text-lg">chat</span>
                            </a>
                            <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
                                href="#">
                                <span className="material-symbols-outlined text-lg">mail</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">导航</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><a className="hover:text-primary" href="#">核心象限</a></li>
                            <li><a className="hover:text-primary" href="#">财富书籍</a></li>
                            <li><a className="hover:text-primary" href="#">成长课程</a></li>
                            <li><a className="hover:text-primary" href="#">工具中心</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">法律</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><a className="hover:text-primary" href="#">隐私政策</a></li>
                            <li><a className="hover:text-primary" href="#">服务条款</a></li>
                            <li><a className="hover:text-primary" href="#">会员协议</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-white/5 text-center text-slate-600 text-xs">
                    © 2005 Rich Boss (富老板) Wealth Systems. All rights reserved / 版权所有
                </div>
            </footer>
        </div>
    );
}

export default Home;