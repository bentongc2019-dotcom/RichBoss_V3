import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroVisual({ isReading }: { isReading: boolean }) {
    const systemRef = useRef<SVGSVGElement>(null);
    const ringsRef = useRef<SVGGElement>(null);
    const coreRef = useRef<SVGGElement>(null);
    const osTitleRef = useRef<HTMLDivElement>(null);

    const orbits = [
        { name: '现金流', rx: 210, ry: 60, rotation: -20, labelX: 100, labelY: 100, dur: 7, color: '#FFD700', reverse: false },
        { name: '计划经营', rx: 210, ry: 60, rotation: 25, labelX: 400, labelY: 100, dur: 9, color: '#FDE047', reverse: true },
        { name: '团队共创', rx: 210, ry: 60, rotation: 70, labelX: 400, labelY: 400, dur: 11, color: '#FFE88A', reverse: false },
        { name: '瓶颈思维', rx: 210, ry: 60, rotation: 115, labelX: 100, labelY: 400, dur: 13, color: '#D4AF37', reverse: true }
    ];

    useEffect(() => {
        // Subtle floating movement of the whole system
        if (systemRef.current) {
            gsap.to(systemRef.current, {
                y: -10,
                duration: 4,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });
        }

        if (isReading) {
            // 核心爆发金光
            if (coreRef.current) gsap.to(coreRef.current, {
                opacity: 1,
                scale: 1.15,
                transformOrigin: '250px 250px',
                duration: 1.5,
                ease: 'power2.out',
            });
            // 光环阵列淡出
            if (ringsRef.current) gsap.to(ringsRef.current, {
                opacity: 0.1,
                scale: 0.95,
                transformOrigin: '250px 250px',
                duration: 1.5,
                ease: 'power2.out',
            });
            // 标题出现
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
            <div className="aspect-square w-full max-w-[500px] relative flex items-center justify-center mt-4">

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
                            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="particle-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* === 原子轨道系统 === */}
                    <g ref={ringsRef}>
                        {orbits.map((orbit, idx) => {
                            const perimeter = 900; // rough perimeter size

                            return (
                                <g key={idx}>
                                    <g transform={`rotate(${orbit.rotation} 250 250)`}>
                                        {/* 弱化的轨道底线 */}
                                        <ellipse cx="250" cy="250" rx={orbit.rx} ry={orbit.ry} fill="none" stroke="#FFFFFF" opacity="0.06" strokeWidth="1" />

                                        {/* 发光粒子尾迹 */}
                                        <ellipse
                                            cx="250" cy="250" rx={orbit.rx} ry={orbit.ry}
                                            fill="none"
                                            stroke={orbit.color}
                                            strokeWidth="2.5"
                                            strokeDasharray={`40 ${perimeter - 40}`}
                                            strokeLinecap="round"
                                            filter="url(#particle-glow)"
                                            opacity="0.8"
                                        >
                                            <animate
                                                attributeName="stroke-dashoffset"
                                                from={orbit.reverse ? 0 : perimeter}
                                                to={orbit.reverse ? perimeter : 0}
                                                dur={`${orbit.dur}s`}
                                                repeatCount="indefinite"
                                                calcMode="linear"
                                            />
                                        </ellipse>

                                        {/* 亮色的粒子高光头部 */}
                                        <ellipse
                                            cx="250" cy="250" rx={orbit.rx} ry={orbit.ry}
                                            fill="none"
                                            stroke="#FFFFFF"
                                            strokeWidth="1.5"
                                            strokeDasharray={`10 ${perimeter - 10}`}
                                            strokeLinecap="round"
                                        >
                                            <animate
                                                attributeName="stroke-dashoffset"
                                                from={orbit.reverse ? 0 : perimeter}
                                                to={orbit.reverse ? perimeter : 0}
                                                dur={`${orbit.dur}s`}
                                                repeatCount="indefinite"
                                                calcMode="linear"
                                            />
                                        </ellipse>
                                    </g>

                                    {/* 固定位置的文本标签 */}
                                    <text
                                        x={orbit.labelX} y={orbit.labelY}
                                        fill={orbit.color}
                                        fontSize="15"
                                        fontWeight="600"
                                        letterSpacing="1.5"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        opacity="0.85"
                                    >
                                        {orbit.name}
                                    </text>
                                </g>
                            )
                        })}
                    </g>

                    {/* === 中心太阳核心系统 === */}
                    <g ref={coreRef} className="cursor-pointer transition-transform hover:scale-[1.03]">
                        {/* 星体外围波动环 */}
                        <circle cx="250" cy="250" r="75" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.25" />
                        <circle cx="250" cy="250" r="60" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.15">
                            <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="20s" repeatCount="indefinite" />
                        </circle>

                        {/* 科技感十字准星 */}
                        <line x1="250" y1="165" x2="250" y2="185" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        <line x1="250" y1="315" x2="250" y2="335" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        <line x1="165" y1="250" x2="185" y2="250" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                        <line x1="315" y1="250" x2="335" y2="250" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />

                        {/* 核心基座底色 */}
                        <circle cx="250" cy="250" r="45" fill="#111" stroke="#FFD700" strokeWidth="1.5" filter="url(#core-glow)" opacity="0.9" />
                        <circle cx="250" cy="250" r="45" fill="#FFD700" opacity="0.15" />

                        {/* 中心标签 */}
                        <text x="250" y="244" textAnchor="middle" fill="#FFD700" fontSize="16" fontWeight="900" letterSpacing="1" filter="url(#core-glow)" opacity="0.8">富老板</text>
                        <text x="250" y="244" textAnchor="middle" fill="#FFD700" fontSize="16" fontWeight="900" letterSpacing="1">富老板</text>
                        <text x="250" y="264" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="600" letterSpacing="3" opacity="0.8">系统</text>
                    </g>
                </svg>

                {/* 点击阅读后显示激活标题 */}
                <div
                    ref={osTitleRef}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 z-20"
                >
                    <h3 className="text-2xl md:text-3xl font-black text-[#FFD700] tracking-widest uppercase bg-black/80 border border-[#FFD700]/30 px-8 py-4 rounded-xl backdrop-blur-md drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]">
                        财富引擎已激活
                    </h3>
                </div>
            </div>

            {/* 副标题 */}
            <div className="text-center mt-6 z-10 w-full">
                <p className="font-sans tracking-widest text-sm md:text-base leading-relaxed opacity-80">
                    <span className="text-slate-400">90%的人在老鼠赛跑</span>
                    <span className="mx-3 text-slate-600">·</span>
                    <span className="text-[#FFD700] font-semibold drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">10%的人在设计财富系统</span>
                </p>
            </div>
        </div>
    );
}
