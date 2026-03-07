import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <header
                className="fixed top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4">
                <nav className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
                        <h2 className="text-xl font-bold tracking-tight text-white uppercase">富老板 <span
                            className="text-primary">Rich Boss</span></h2>
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
                        <button className="hidden sm:block text-sm font-semibold text-white px-4 py-2">登录</button>
                        <button
                            className="bg-primary text-background-dark px-6 py-2 text-sm font-bold rounded-lg hover:brightness-110 transition-all">
                            加入会员
                        </button>
                    </div>
                </nav>
            </header>
            <main className="flex-grow pt-24">
                <section className="relative px-6 lg:px-20 py-20 lg:py-32 overflow-hidden">
                    <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
                        <div className="z-10">
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span
                                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-xs font-bold text-primary tracking-widest uppercase">Wealth OS v2.0</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight text-white">
                                富老板不是赚更多钱 <br /><span className="text-primary">而是设计让钱自动流动的系统</span>
                            </h1>
                            <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                                90%的人努力赚钱<br />10%的人设计财富系统
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    className="bg-primary text-background-dark px-8 py-4 text-base font-bold rounded-xl hover:scale-[1.02] transition-transform">
                                    阅读书籍
                                </button>
                                <button
                                    className="bg-white/5 border border-white/10 text-white px-8 py-4 text-base font-bold rounded-xl hover:bg-white/10 transition-colors">
                                    财富测验
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div
                                className="aspect-square w-full bg-surface-dark border border-white/5 rounded-3xl overflow-hidden relative group flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent mix-blend-screen pointer-events-none">
                                </div>


                                <svg className="w-4/5 h-4/5 system-svg z-10 transition-transform duration-700 group-hover:scale-105"
                                    viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                                    <style>{`
                                    .system-svg {
                                        filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.1));
                                    }

                                    .orbit-outer {
                                        transform-origin: 200px 200px;
                                        animation: spin-cw 16s linear infinite;
                                    }

                                    .orbit-inner {
                                        transform-origin: 200px 200px;
                                        animation: spin-ccw 16s linear infinite;
                                    }

                                    .cube-layer {
                                        transform-origin: 200px 200px;
                                        animation: spin-cw 12s linear infinite;
                                    }

                                    .core-glow {
                                        transform-origin: 200px 200px;
                                        animation: pulse-core 3s ease-in-out infinite;
                                    }

                                    .particle-cw {
                                        stroke-dasharray: 4 80;
                                        animation: flow-dash 8s linear infinite;
                                    }

                                    .particle-ccw {
                                        stroke-dasharray: 4 60;
                                        animation: flow-dash-reverse 8s linear infinite;
                                    }

                                    @keyframes spin-cw {
                                        from {
                                            transform: rotate(0deg);
                                        }

                                        to {
                                            transform: rotate(360deg);
                                        }
                                    }

                                    @keyframes spin-ccw {
                                        from {
                                            transform: rotate(0deg);
                                        }

                                        to {
                                            transform: rotate(-360deg);
                                        }
                                    }

                                    @keyframes pulse-core {

                                        0%,
                                        100% {
                                            transform: scale(1);
                                            filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
                                        }

                                        50% {
                                            transform: scale(1.08);
                                            filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.8));
                                        }
                                    }

                                    @keyframes flow-dash {
                                        from {
                                            stroke-dashoffset: 168;
                                        }

                                        to {
                                            stroke-dashoffset: 0;
                                        }
                                    }

                                    @keyframes flow-dash-reverse {
                                        from {
                                            stroke-dashoffset: 0;
                                        }

                                        to {
                                            stroke-dashoffset: 128;
                                        }
                                    }

                                    .group:hover .orbit-outer,
                                    .group:hover .orbit-inner {
                                        animation-duration: 8s;
                                    }

                                    .group:hover .cube-layer {
                                        animation-duration: 6s;
                                    }

                                    .group:hover .particle-cw,
                                    .group:hover .particle-ccw {
                                        animation-duration: 4s;
                                    }

                                    .group:hover .core-glow {
                                        animation-duration: 1.5s;
                                        filter: drop-shadow(0 0 40px rgba(212, 175, 55, 1));
                                    }
                                `}</style>

                                    <rect x="50" y="50" width="300" height="300" rx="30" fill="none" stroke="#D4AF37"
                                        strokeWidth="0.5" strokeOpacity="0.1" />

                                    <g className="orbit-outer">
                                        <circle cx="200" cy="200" r="140" fill="none" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.25" />
                                        <circle cx="200" cy="200" r="140" fill="none" stroke="#D4AF37" strokeWidth="2"
                                            strokeLinecap="round" className="particle-cw" />
                                        <path
                                            d="M 200 55 L 200 65 M 200 335 L 200 345 M 55 200 L 65 200 M 335 200 L 345 200"
                                            fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
                                    </g>

                                    <g className="orbit-inner">
                                        <circle cx="200" cy="200" r="100" fill="none" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.3" />
                                        <circle cx="200" cy="200" r="100" fill="none" stroke="#D4AF37" strokeWidth="1.5"
                                            strokeLinecap="round" className="particle-ccw" />
                                        <circle cx="200" cy="100" r="3" fill="#D4AF37" stroke="none" />
                                        <circle cx="200" cy="300" r="3" fill="#D4AF37" stroke="none" />
                                    </g>

                                    <g className="cube-layer">
                                        <polygon points="200,120 270,160 270,240 200,280 130,240 130,160" fill="none"
                                            stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.6" />
                                        <polygon points="200,140 250,170 250,230 200,260 150,230 150,170" fill="none"
                                            stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.8" />
                                        <line x1="200" y1="120" x2="200" y2="140" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.5" />
                                        <line x1="270" y1="160" x2="250" y2="170" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.5" />
                                        <line x1="270" y1="240" x2="250" y2="230" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.5" />
                                        <line x1="200" y1="280" x2="200" y2="260" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.5" />
                                        <line x1="130" y1="240" x2="150" y2="230" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.5" />
                                        <line x1="130" y1="160" x2="150" y2="170" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.5" />
                                        <line x1="200" y1="200" x2="200" y2="140" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.4" />
                                        <line x1="200" y1="200" x2="250" y2="230" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.4" />
                                        <line x1="200" y1="200" x2="150" y2="230" stroke="#D4AF37" strokeWidth="0.5"
                                            strokeOpacity="0.4" />
                                        <rect x="175" y="175" width="50" height="50" fill="none" stroke="#D4AF37"
                                            strokeWidth="0.5" strokeOpacity="0.3" transform="rotate(45 200 200)" />
                                    </g>

                                    <g className="core-glow">
                                        <circle cx="200" cy="200" r="30" fill="#D4AF37" fillOpacity="0.05" />
                                        <path d="M 180 208 L 192 195 L 205 205 L 220 188" fill="none" stroke="#D4AF37"
                                            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="180" cy="208" r="3" fill="#D4AF37" stroke="none" />
                                        <circle cx="192" cy="195" r="3" fill="#D4AF37" stroke="none" />
                                        <circle cx="205" cy="205" r="3" fill="#D4AF37" stroke="none" />
                                        <circle cx="220" cy="188" r="3" fill="#D4AF37" stroke="none" />
                                        <path
                                            d="M 210 180 Q 215 180 215 175 Q 215 180 220 180 Q 215 180 215 185 Q 215 180 210 180"
                                            fill="#D4AF37" stroke="none" />
                                        <path
                                            d="M 225 198 Q 228 198 228 195 Q 228 198 231 198 Q 228 198 228 201 Q 228 198 225 198"
                                            fill="#D4AF37" stroke="none" />
                                    </g>
                                </svg>
                            </div>
                            <div
                                className="absolute -bottom-6 -left-6 bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-2xl hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/20 rounded-lg">
                                        <span className="material-symbols-outlined text-primary">trending_up</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider">系统效能</p>
                                        <p className="text-lg font-bold text-white">+312% 增长率</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="relative py-24 px-6 lg:px-20 overflow-hidden border-y border-white/5" id="concept"
                    style={{ "backgroundColor": "#0F0F12" }}>

                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
                        style={{ "backgroundImage": "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)", "backgroundSize": "32px 32px", "backgroundPosition": "-19px -19px" }}>
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl text-center mb-20">
                        <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4 tracking-wide"
                            style={{ "fontFamily": "'Noto Serif SC', 'Songti SC', serif" }}>『钱 × 闲』餐巾纸地图</h2>
                        <p
                            className="text-slate-400 max-w-2xl mx-auto font-sans tracking-[0.2em] text-xs md:text-sm uppercase opacity-70 mb-6">
                            识别你真实的财务象限，突破认知的玻璃天花板</p>
                        <div className="inline-block bg-white/5 border border-white/10 rounded-xl px-8 py-4 backdrop-blur-sm">
                            <p className="text-slate-300 text-sm md:text-base tracking-widest mb-2 font-medium">
                                <span className="text-primary">财富的本质</span>只有两个维度：
                            </p>
                            <p className="text-white font-bold tracking-widest text-lg">
                                钱（Money）<span className="mx-4 text-white/20 font-light">×</span>闲（Freedom）
                            </p>
                        </div>
                    </div>

                    <div
                        className="relative z-10 mx-auto max-w-5xl rounded-[2rem] overflow-hidden border-[0.5px] border-white/10 shadow-2xl">

                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#7C3AED] opacity-50 blur-[60px] rounded-full pointer-events-none z-0">
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">

                            <div
                                className="relative bg-white/[0.05] backdrop-blur-xl p-10 lg:p-14 border-b-[0.5px] border-white/10 md:border-r-[0.5px] group hover:bg-white/[0.07] transition duration-700 h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="text-2xl font-serif text-white/90 group-hover:text-white transition-colors tracking-widest"
                                        style={{ "fontFamily": "'Noto Serif SC', 'Songti SC', serif" }}>没钱<span
                                            className="text-white/20 font-light mx-3">×</span>有闲</h3>
                                    <span
                                        className="material-symbols-outlined text-white/20 group-hover:text-white/50 text-3xl font-light transition-colors">hourglass_empty</span>
                                </div>
                                <p className="font-sans text-[13px] text-slate-400 tracking-[0.08em] leading-loose">
                                    空有时间却无资产杠杆。生活节奏缓慢，但也缺乏抵御风险波动的财务护城河。</p>
                            </div>


                            <div
                                className="relative bg-white/[0.05] backdrop-blur-xl p-10 lg:p-14 border-b-[0.5px] border-white/10 group hover:bg-white/[0.07] transition duration-700 h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="text-2xl font-serif text-white/90 group-hover:text-white transition-colors tracking-widest"
                                        style={{ "fontFamily": "'Noto Serif SC', 'Songti SC', serif" }}>有钱<span
                                            className="text-primary font-light mx-3">×</span>有闲</h3>
                                    <span
                                        className="material-symbols-outlined text-primary/40 group-hover:text-primary text-3xl font-light transition-colors">diamond</span>
                                </div>
                                <p className="font-sans text-[13px] text-slate-400 tracking-[0.08em] leading-loose"><span
                                    className="text-primary tracking-[0.1em] block mb-1">富老板的终极蓝图。</span>金钱为你工作。系统自动创造丰沛现金流，完全掌控人生的绝对自由。
                                </p>
                            </div>


                            <div
                                className="relative bg-white/[0.05] backdrop-blur-xl p-10 lg:p-14 border-b-[0.5px] border-white/10 md:border-b-0 md:border-r-[0.5px] group hover:bg-white/[0.07] transition duration-700 h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="text-2xl font-serif text-white/90 group-hover:text-white transition-colors tracking-widest"
                                        style={{ "fontFamily": "'Noto Serif SC', 'Songti SC', serif" }}>没钱<span
                                            className="text-white/20 font-light mx-3">×</span>没闲</h3>
                                    <span
                                        className="material-symbols-outlined text-red-500/20 group-hover:text-red-500/60 text-3xl font-light transition-colors">warning</span>
                                </div>
                                <p className="font-sans text-[13px] text-slate-400 tracking-[0.08em] leading-loose">
                                    深陷“老鼠赛跑”。不断用时间换取微薄薪水，同时被负债与高消费逐渐掏空资产框架。</p>
                            </div>


                            <div
                                className="relative bg-white/[0.05] backdrop-blur-xl p-10 lg:p-14 group hover:bg-white/[0.07] transition duration-700 h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="text-2xl font-serif text-white/90 group-hover:text-white transition-colors tracking-widest"
                                        style={{ "fontFamily": "'Noto Serif SC', 'Songti SC', serif" }}>有钱<span
                                            className="text-white/20 font-light mx-3">×</span>没闲</h3>
                                    <span
                                        className="material-symbols-outlined text-white/20 group-hover:text-white/50 text-3xl font-light transition-colors">business_center</span>
                                </div>
                                <p className="font-sans text-[13px] text-slate-400 tracking-[0.08em] leading-loose">
                                    高薪的隐形枷锁。现金流庞大但系统高度依赖你的个人时间，一旦停下，运转即刻瘫痪。</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-24 px-6 lg:px-20 overflow-hidden" id="book">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="w-full lg:w-1/2 order-2 lg:order-1">
                                <h4 className="text-primary font-bold tracking-widest uppercase mb-4">Core Literature</h4>
                                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                                    《富老板，穷老板》<br />Wealth System Manifesto</h2>
                                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
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
                                    <Link to="/reader"
                                        className="group relative inline-flex items-center justify-center gap-3 bg-[#EAB308] text-[#0F0F12] px-8 py-3.5 font-bold rounded-xl transition-all hover:bg-[#FACC15] shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(250,204,21,0.3)]"><span className="material-symbols-outlined text-xl">menu_book</span><span className="text-base tracking-widest">开始阅读</span></Link>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
                                <div className="relative group">
                                    <div
                                        className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform">
                                    </div>
                                    <div
                                        className="relative w-72 lg:w-96 aspect-[3/4] bg-surface-dark border-4 border-white/10 rounded-2xl shadow-2xl overflow-hidden transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                        <img className="w-full h-full object-cover" data-alt="富老板，穷老板 书籍封面"
                                            src="./public/images/cover.jpg" />
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
                                className="bg-background-dark text-white px-10 py-4 font-black rounded-xl hover:scale-105 transition-transform flex items-center gap-3">
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
                                className="bg-primary text-background-dark px-12 py-5 text-lg font-black rounded-full hover:brightness-110 shadow-xl shadow-primary/20">
                                申请加入年度会员计划
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-background-dark py-16 px-6 lg:px-20 border-t border-white/10">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
                            <h2 className="text-xl font-bold tracking-tight text-white uppercase">富老板 <span
                                className="text-primary">Rich Boss</span></h2>
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
                    © 2024 Rich Boss (富老板) Wealth Systems. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default Home;