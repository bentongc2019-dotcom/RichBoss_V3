import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroVisual({ isReading }: { isReading: boolean }) {
    const ringsRef = useRef<SVGGElement>(null);
    const coreRef = useRef<SVGGElement>(null);
    const osTitleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 慢速自转，营造系统运转感
        gsap.to(ringsRef.current, {
            rotation: 360,
            transformOrigin: '200px 200px',
            repeat: -1,
            duration: 30,
            ease: 'none',
        });

        if (isReading) {
            // 核心爆发金光
            if (coreRef.current) gsap.to(coreRef.current, {
                opacity: 1,
                scale: 1.1,
                transformOrigin: '200px 200px',
                duration: 1.5,
                ease: 'power2.out',
            });
            // 光环淡出
            if (ringsRef.current) gsap.to(ringsRef.current, {
                opacity: 0.15,
                duration: 1.5,
            });
            // 标题出现
            if (osTitleRef.current) gsap.to(osTitleRef.current, {
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out',
            });
        }
    }, [isReading]);

    return (
        <div className="flex flex-col items-center justify-center w-full relative">
            {/* 主容器 */}
            <div className="aspect-square w-full max-w-[420px] relative flex items-center justify-center">
                {/* 外圈辉光背景 */}
                <div className="absolute inset-0 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

                <svg
                    className="w-full h-full"
                    viewBox="0 0 400 400"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        {/* 粒子发光滤镜 */}
                        <filter id="hv-glow-sm" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="hv-glow-lg" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* 粒子流动渐变 */}
                        <linearGradient id="hv-grad-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                            <stop offset="50%" stopColor="#FDE047" stopOpacity="1" />
                            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* === 3D 同心光环组（整体缓慢自转） === */}
                    <g ref={ringsRef}>
                        {/* Ring 1 — 最外层，倾斜 20deg（用椭圆模拟 3D） */}
                        <ellipse
                            cx="200" cy="200" rx="168" ry="56"
                            fill="none" stroke="#2a2a2a" strokeWidth="1.5"
                            transform="rotate(-20 200 200)"
                        />
                        {/* Ring 1 粒子流 */}
                        <ellipse
                            cx="200" cy="200" rx="168" ry="56"
                            fill="none"
                            stroke="#D4AF37"
                            strokeWidth="2.5"
                            strokeDasharray="22 320"
                            strokeLinecap="round"
                            filter="url(#hv-glow-sm)"
                            transform="rotate(-20 200 200)"
                            opacity="0.95"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="0" to="-342"
                                dur="2.2s"
                                repeatCount="indefinite"
                            />
                        </ellipse>
                        {/* Ring 1 第二颗粒子（相位差） */}
                        <ellipse
                            cx="200" cy="200" rx="168" ry="56"
                            fill="none"
                            stroke="#FDE047"
                            strokeWidth="2"
                            strokeDasharray="12 330"
                            strokeLinecap="round"
                            filter="url(#hv-glow-sm)"
                            transform="rotate(-20 200 200)"
                            opacity="0.7"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="-171" to="-513"
                                dur="2.2s"
                                repeatCount="indefinite"
                            />
                        </ellipse>

                        {/* Ring 2 — 中层，倾斜 15deg */}
                        <ellipse
                            cx="200" cy="200" rx="128" ry="44"
                            fill="none" stroke="#2a2a2a" strokeWidth="1.5"
                            transform="rotate(15 200 200)"
                        />
                        <ellipse
                            cx="200" cy="200" rx="128" ry="44"
                            fill="none"
                            stroke="#C9A227"
                            strokeWidth="2.5"
                            strokeDasharray="18 246"
                            strokeLinecap="round"
                            filter="url(#hv-glow-sm)"
                            transform="rotate(15 200 200)"
                            opacity="0.9"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="0" to="264"
                                dur="1.6s"
                                repeatCount="indefinite"
                            />
                        </ellipse>

                        {/* Ring 3 — 内层，倾斜 -30deg */}
                        <ellipse
                            cx="200" cy="200" rx="90" ry="30"
                            fill="none" stroke="#333333" strokeWidth="1"
                            transform="rotate(-30 200 200)"
                        />
                        <ellipse
                            cx="200" cy="200" rx="90" ry="30"
                            fill="none"
                            stroke="#FFE88A"
                            strokeWidth="3"
                            strokeDasharray="14 176"
                            strokeLinecap="round"
                            filter="url(#hv-glow-sm)"
                            transform="rotate(-30 200 200)"
                            opacity="0.85"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="0" to="-190"
                                dur="1.1s"
                                repeatCount="indefinite"
                            />
                        </ellipse>

                        {/* Ring 4 — 竖直圆（垂直面，参考色浅灰） */}
                        <ellipse
                            cx="200" cy="200" rx="30" ry="155"
                            fill="none" stroke="#1e1e1e" strokeWidth="1"
                        />
                        <ellipse
                            cx="200" cy="200" rx="30" ry="155"
                            fill="none"
                            stroke="#D4AF37"
                            strokeWidth="1.5"
                            strokeDasharray="10 300"
                            strokeLinecap="round"
                            filter="url(#hv-glow-sm)"
                            opacity="0.5"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="0" to="310"
                                dur="3.5s"
                                repeatCount="indefinite"
                            />
                        </ellipse>
                    </g>

                    {/* === 中心脉动核心 === */}
                    <g ref={coreRef} opacity="0.8">
                        <style>{`
                            @keyframes hv-pulse {
                                0%, 100% { opacity: 0.7; r: 12; }
                                50%        { opacity: 1;   r: 16; }
                            }
                            @keyframes hv-ring-pulse {
                                0%, 100% { opacity: 0.15; }
                                50%       { opacity: 0.35; }
                            }
                            .hv-core-dot { animation: hv-pulse 3s ease-in-out infinite; }
                            .hv-core-ring { animation: hv-ring-pulse 3s ease-in-out infinite; }
                        `}</style>

                        {/* 外圈光晕 */}
                        <circle
                            className="hv-core-ring"
                            cx="200" cy="200" r="36"
                            fill="none" stroke="#D4AF37" strokeWidth="1"
                            filter="url(#hv-glow-lg)"
                        />
                        {/* 中圈 */}
                        <circle
                            cx="200" cy="200" r="22"
                            fill="none" stroke="#D4AF37" strokeWidth="1"
                            opacity="0.3"
                        />
                        {/* 核心点 */}
                        <circle
                            className="hv-core-dot"
                            cx="200" cy="200" r="12"
                            fill="#FDE047"
                            filter="url(#hv-glow-lg)"
                        />
                        {/* 十字准星 */}
                        <line x1="200" y1="172" x2="200" y2="183" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
                        <line x1="200" y1="217" x2="200" y2="228" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
                        <line x1="172" y1="200" x2="183" y2="200" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
                        <line x1="217" y1="200" x2="228" y2="200" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
                    </g>
                </svg>

                {/* 点击阅读后显示标题 */}
                <div
                    ref={osTitleRef}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 z-20"
                >
                    <h3 className="text-xl md:text-2xl font-black text-[#FFD700] tracking-widest uppercase bg-black/70 px-5 py-2.5 rounded-xl backdrop-blur-sm drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">
                        Wealth System Activated
                    </h3>
                </div>
            </div>

            {/* 副标题：90% / 10% */}
            <div className="text-center mt-5 z-10 w-full">
                <p className="font-sans tracking-widest text-sm md:text-base leading-relaxed">
                    <span className="text-slate-400">90%的人在老鼠赛跑</span>
                    <span className="mx-3 text-slate-600">·</span>
                    <span className="text-[#D4AF37] font-semibold">10%的人在设计财富系统</span>
                </p>
            </div>
        </div>
    );
}
