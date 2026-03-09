import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroVisual({ isReading }: { isReading: boolean }) {
    const systemRef = useRef<SVGSVGElement>(null);
    const ringsRef = useRef<SVGGElement>(null);
    const coreRef = useRef<SVGGElement>(null);
    const osTitleRef = useRef<HTMLDivElement>(null);

    const orbits = [
        { name: '现金流', r: 85, dur: 6, color: '#FFD700', reverse: false, labelAngle: -55 },
        { name: '计划经营', r: 135, dur: 10, color: '#FDE047', reverse: true, labelAngle: -195 },
        { name: '团队共创', r: 185, dur: 15, color: '#FFE88A', reverse: false, labelAngle: 35 },
        { name: '瓶颈思维', r: 235, dur: 22, color: '#D4AF37', reverse: true, labelAngle: 145 }
    ];

    useEffect(() => {
        // Subtle floating movement of the whole system
        if (systemRef.current) {
            gsap.to(systemRef.current, {
                y: -15,
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
                scale: 1.1,
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
            <div className="aspect-square w-full max-w-[500px] relative flex items-center justify-center">

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

                    {/* === 轨道系统 === */}
                    <g ref={ringsRef}>
                        {orbits.map((orbit, idx) => {
                            const c = 2 * Math.PI * orbit.r;
                            const rad = (orbit.labelAngle * Math.PI) / 180;
                            // 增大标签距离，避免拥挤
                            const textR = orbit.r + 14;
                            const tx = 250 + textR * Math.cos(rad);
                            const ty = 250 + textR * Math.sin(rad);

                            const tAnchor = tx > 250 ? "start" : "end";

                            const fromOffset = orbit.reverse ? 0 : c;
                            const toOffset = orbit.reverse ? c : 0;

                            return (
                                <g key={idx}>
                                    {/* 弱化的轨道底线 */}
                                    <circle cx="250" cy="250" r={orbit.r} fill="none" stroke="#FFFFFF" opacity="0.04" strokeWidth="1" />

                                    {/* 长的粒子尾迹 */}
                                    <circle
                                        cx="250" cy="250" r={orbit.r}
                                        fill="none"
                                        stroke={orbit.color}
                                        strokeWidth="1.5"
                                        strokeDasharray={`${orbit.r * 1.2} ${c}`}
                                        strokeLinecap="round"
                                        filter="url(#particle-glow)"
                                        opacity="0.6"
                                    >
                                        <animate
                                            attributeName="stroke-dashoffset"
                                            from={fromOffset}
                                            to={toOffset}
                                            dur={`${orbit.dur}s`}
                                            repeatCount="indefinite"
                                            calcMode="linear"
                                        />
                                    </circle>

                                    {/* 亮色的粒子头部 */}
                                    <circle
                                        cx="250" cy="250" r={orbit.r}
                                        fill="none"
                                        stroke="#FFFFFF"
                                        strokeWidth="3"
                                        strokeDasharray={`1 ${c}`}
                                        strokeLinecap="round"
                                        filter="url(#core-glow)"
                                    >
                                        <animate
                                            attributeName="stroke-dashoffset"
                                            from={fromOffset}
                                            to={toOffset}
                                            dur={`${orbit.dur}s`}
                                            repeatCount="indefinite"
                                            calcMode="linear"
                                        />
                                    </circle>

                                    {/* 标签与连接点 */}
                                    <circle cx={250 + orbit.r * Math.cos(rad)} cy={250 + orbit.r * Math.sin(rad)} r="2.5" fill={orbit.color} opacity="0.8" />
                                    <text
                                        x={tx} y={ty}
                                        fill={orbit.color}
                                        fontSize="11"
                                        fontWeight="500"
                                        letterSpacing="2"
                                        textAnchor={tAnchor}
                                        dominantBaseline="middle"
                                        opacity="0.9"
                                    >
                                        {orbit.name}
                                    </text>
                                </g>
                            )
                        })}
                    </g>

                    {/* === 中心核心系统 === */}
                    <g ref={coreRef} className="cursor-pointer transition-transform hover:scale-[1.02]">
                        {/* 脉冲波纹 */}
                        <circle cx="250" cy="250" r="55" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 6" opacity="0.3">
                            <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="20s" repeatCount="indefinite" />
                        </circle>
                        {/* 核心基座底色 */}
                        <circle cx="250" cy="250" r="48" fill="#0A0A0A" stroke="#FFD700" strokeWidth="1.5" filter="url(#core-glow)" opacity="0.9" />
                        <circle cx="250" cy="250" r="48" fill="#FFD700" opacity="0.1" />
                        {/* 中心标签 */}
                        <text x="250" y="246" textAnchor="middle" fill="#FFD700" fontSize="15" fontWeight="900" letterSpacing="1.5" filter="url(#core-glow)">富老板</text>
                        <text x="250" y="266" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" letterSpacing="3" opacity="0.6">SYSTEM</text>
                    </g>
                </svg>

                {/* 点击阅读后显示激活标题 */}
                <div
                    ref={osTitleRef}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 z-20"
                >
                    <h3 className="text-xl md:text-2xl font-black text-[#FFD700] tracking-widest uppercase bg-black/80 border border-[#FFD700]/30 px-6 py-3 rounded-lg backdrop-blur-md drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]">
                        Wealth System Activated
                    </h3>
                </div>
            </div>

            {/* 副标题 */}
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
