import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroVisual({ isReading }: { isReading: boolean }) {
    const systemRef = useRef<SVGSVGElement>(null);
    const coreRef = useRef<SVGGElement>(null);
    const osTitleRef = useRef<HTMLDivElement>(null);

    const rx = 220;
    const ry = 65;
    const perimeter = 920;

    // 4轨道完全遵循图2原子结构布局，文字绑定跟随
    const orbits = [
        { name: '现金流', rotation: 20, dur: 12, color: '#FFD700' },
        { name: '计划经营', rotation: 65, dur: 16, color: '#FDE047' },
        { name: '团队共创', rotation: 110, dur: 14, color: '#FFE88A' },
        { name: '瓶颈思维', rotation: 155, dur: 18, color: '#D4AF37' }
    ];

    useEffect(() => {
        if (systemRef.current) {
            gsap.to(systemRef.current, {
                y: -12,
                duration: 4,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });
        }
        if (isReading) {
            if (coreRef.current) gsap.to(coreRef.current, {
                scale: 1.15,
                transformOrigin: '250px 250px',
                duration: 1.5,
                ease: 'power2.out',
            });
            if (osTitleRef.current) gsap.to(osTitleRef.current, {
                opacity: 1,
                y: -20,
                duration: 1.5,
                ease: 'power2.out',
            });
        }
    }, [isReading]);

    return (
        <div className="flex flex-col items-center justify-center w-full relative">
            <div className="aspect-square w-full max-w-[540px] relative flex items-center justify-center mt-6">

                {/* 动态背景光晕 */}
                <div className="absolute inset-0 rounded-full bg-[#FFD700]/5 blur-[60px] pointer-events-none" />

                <svg
                    ref={systemRef}
                    className="w-full h-full"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* 共享的基础原子轨道路径 (完整的椭圆曲线) */}
                        <path
                            id="orbit-path"
                            d={`M ${250 - rx} 250 A ${rx} ${ry} 0 1 1 ${250 + rx} 250 A ${rx} ${ry} 0 1 1 ${250 - rx} 250`}
                        />
                    </defs>

                    {/* === 原子轨道系统 === */}
                    <g>
                        {orbits.map((orbit, idx) => (
                            <g key={idx} transform={`rotate(${orbit.rotation} 250 250)`}>
                                {/* 完整呈现如附图2的交叉静态底线圈，加深颜色 */}
                                <use href="#orbit-path" fill="none" stroke="#D4AF37" opacity="0.45" strokeWidth="1" />

                                {/* 跟随跑动的辉光长尾迹 */}
                                <use
                                    href="#orbit-path"
                                    fill="none"
                                    stroke={orbit.color}
                                    strokeWidth="2"
                                    strokeDasharray={`100 ${perimeter - 100}`}
                                    strokeLinecap="round"
                                    opacity="0.5"
                                >
                                    <animate
                                        attributeName="stroke-dashoffset"
                                        from={perimeter}
                                        to="0"
                                        dur={`${orbit.dur}s`}
                                        repeatCount="indefinite"
                                        calcMode="linear"
                                    />
                                </use>

                                {/* !!!核心要求1：跟着轨道无休止跑动的文本与光球!!! */}
                                <g>
                                    <animateMotion dur={`${orbit.dur}s`} repeatCount="indefinite" calcMode="linear">
                                        <mpath href="#orbit-path" />
                                    </animateMotion>

                                    {/* 抵消整个轨道的倾斜角度，让文字始终保持绝对水平向正！ */}
                                    <g transform={`rotate(${-orbit.rotation})`}>
                                        {/* 跑在最前面的能量光点 (彗尾头部) */}
                                        <circle cx="0" cy="0" r="4" fill="#FFFFFF" filter="url(#core-glow)" />
                                        <circle cx="0" cy="0" r="2" fill="#FFFFFF" />

                                        {/* 文字底下的薄遮罩层：防止运行到深色重叠处看不清 */}
                                        <rect x="-35" y="-30" width="70" height="22" fill="#0A0A0A" rx="4" opacity="0.65" />

                                        {/* 真正的跟跑文字 */}
                                        <text
                                            x="0" y="-18"
                                            fill={orbit.color}
                                            fontSize="13"
                                            fontWeight="700"
                                            letterSpacing="1.5"
                                            textAnchor="middle"
                                        >
                                            {orbit.name}
                                        </text>
                                    </g>
                                </g>
                            </g>
                        ))}
                    </g>

                    {/* === 中心太阳 ("富老板系统") === */}
                    <g ref={coreRef} className="cursor-pointer transition-transform hover:scale-[1.03]">
                        {/* 辐射波动圈 */}
                        <circle cx="250" cy="250" r="75" fill="none" stroke="#FFD700" strokeWidth="1" strokeDasharray="3 6" opacity="0.2">
                            <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="25s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="250" cy="250" r="60" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.25" />

                        {/* 科技感十字准星与圆规盘 */}
                        <line x1="250" y1="165" x2="250" y2="185" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        <line x1="250" y1="315" x2="250" y2="335" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        <line x1="165" y1="250" x2="185" y2="250" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        <line x1="315" y1="250" x2="335" y2="250" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />

                        {/* 太阳恒星核心发光能量体 */}
                        <circle cx="250" cy="250" r="48" fill="#111" stroke="#FFD700" strokeWidth="2" filter="url(#core-glow)" opacity="0.9" />
                        <circle cx="250" cy="250" r="48" fill="#FFD700" opacity="0.15" />

                        {/* 中心系统标题：富老板系统 */}
                        <text x="250" y="244" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" letterSpacing="1" filter="url(#core-glow)" opacity="0.7">富老板</text>
                        <text x="250" y="244" textAnchor="middle" fill="#FFD700" fontSize="16" fontWeight="900" letterSpacing="1">富老板</text>
                        <text x="250" y="266" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="600" letterSpacing="4" opacity="0.9">系统</text>
                    </g>
                </svg>

                {/* 阅读后提示横幅 */}
                <div
                    ref={osTitleRef}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 z-20"
                >
                    <h3 className="text-xl md:text-2xl font-black text-[#FFD700] tracking-widest uppercase bg-black/80 border border-[#FFD700]/30 px-6 py-3 rounded-lg backdrop-blur-md drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]">
                        财富引擎已激活
                    </h3>
                </div>
            </div>

            {/* 底部文案 */}
            <div className="text-center mt-8 z-10 w-full">
                <p className="font-sans tracking-widest text-sm md:text-base leading-relaxed opacity-80">
                    <span className="text-slate-400">90%的人在老鼠赛跑</span>
                    <span className="mx-3 text-slate-600">·</span>
                    <span className="text-[#FFD700] font-semibold drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">10%的人在设计财富系统</span>
                </p>
            </div>
        </div>
    );
}
