import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroVisual({ isReading }: { isReading: boolean }) {
    const wheelRef = useRef<SVGGElement>(null);
    const manRef = useRef<SVGGElement>(null);
    const coreRef = useRef<SVGGElement>(null);
    const osTitleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Continuous wheel rotation (simulating running)
        gsap.to(wheelRef.current, {
            rotation: 360,
            transformOrigin: "200px 200px",
            repeat: -1,
            duration: 8,
            ease: "none"
        });

        if (isReading) {
            // Core transitions from dim to bright gold
            if (coreRef.current) gsap.to(coreRef.current, {
                stroke: '#FFD700',
                opacity: 1,
                filter: 'drop-shadow(0 0 25px rgba(255, 215, 0, 1))',
                duration: 1.5
            });

            // Fade out the rat race wheel to focus on the core
            if (wheelRef.current) gsap.to(wheelRef.current, {
                opacity: 0.1,
                timeScale: 0.1, // Slow down the wheel
                duration: 1.5
            });

            // Stop the man running
            if (manRef.current) gsap.to(manRef.current, {
                opacity: 0.1,
                duration: 1.5
            });

            // "Wealth OS V2.0" title emerges
            if (osTitleRef.current) gsap.to(osTitleRef.current, { opacity: 1, duration: 1.5, ease: "power2.out" });
        }
    }, [isReading]);

    return (
        <div className="flex flex-col items-center justify-center w-full relative">
            <div className="aspect-square w-full max-w-[400px] border border-white/5 rounded-3xl overflow-hidden relative group flex flex-col items-center justify-center transition-all duration-700 hover:border-[#D4AF37]/20 bg-background-dark/20 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent mix-blend-screen pointer-events-none group-hover:from-[#D4AF37]/10 transition-colors duration-700"></div>

                <svg className="w-5/6 h-5/6 system-svg z-10" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Background Static Wheel Stand */}
                    <g stroke="#555" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" className="transition-opacity duration-700 group-hover:opacity-20">
                        {/* Base */}
                        <path d="M 120 360 L 280 360 C 300 360, 310 350, 310 330 L 310 300" />
                        <path d="M 120 360 C 100 360, 90 350, 90 330 L 90 300" />
                        {/* Support Arms */}
                        <path d="M 90 330 L 180 200" />
                        <path d="M 310 330 L 220 200" />
                    </g>


                    {/* 3D Hamster Wheel (Rotates) */}
                    <g className="transition-all duration-700 group-hover:opacity-30">
                        <g ref={wheelRef}>
                            {/* Back Rim */}
                            <ellipse cx="200" cy="200" rx="130" ry="170" fill="none" stroke="#444" strokeWidth="4" />

                            {/* Wheel Spokes (Connecting Back to Front) - Abstracted as lines across the ellipse */}
                            {Array.from({ length: 12 }).map((_, i) => {
                                const angle = (i * 30 * Math.PI) / 180;
                                const x1 = 200 + 130 * Math.cos(angle);
                                const y1 = 200 + 170 * Math.sin(angle);
                                // The front rim is offset visually to create depth
                                const x2 = 200 + 150 * Math.cos(angle) + 20;
                                const y2 = 200 + 180 * Math.sin(angle) + 10;

                                return (
                                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#666" strokeWidth="3" opacity="0.5" />
                                );
                            })}

                            {/* Center Hub */}
                            <circle cx="200" cy="200" r="10" fill="#666" />
                            {Array.from({ length: 8 }).map((_, i) => {
                                const angle = (i * 45 * Math.PI) / 180;
                                const x = 200 + 130 * Math.cos(angle);
                                const y = 200 + 170 * Math.sin(angle);
                                return <line key={i} x1="200" y1="200" x2={x} y2={y} stroke="#555" strokeWidth="2" opacity="0.6" />;
                            })}
                        </g>

                        {/* Front Rim (Static overlay for 3D effect, covering the bottom parts) */}
                        <ellipse cx="220" cy="210" rx="150" ry="180" fill="none" stroke="#888" strokeWidth="6" opacity="0.8" />
                    </g>


                    {/* Running Gold Stick Figure */}
                    <g ref={manRef} className="transition-opacity duration-700 group-hover:opacity-50">
                        <style>{`
                            @keyframes runLeg1 {
                                0%, 100% { transform: rotate(-30deg); }
                                50% { transform: rotate(40deg); }
                            }
                            @keyframes runLeg2 {
                                0%, 100% { transform: rotate(40deg); }
                                50% { transform: rotate(-30deg); }
                            }
                            @keyframes runArm1 {
                                0%, 100% { transform: rotate(40deg); }
                                50% { transform: rotate(-40deg); }
                            }
                            @keyframes runArm2 {
                                0%, 100% { transform: rotate(-40deg); }
                                50% { transform: rotate(40deg); }
                            }
                            @keyframes bodyBounce {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(-5px); }
                            }
                            .leg1 { transform-origin: 200px 240px; animation: runLeg1 0.6s linear infinite; }
                            .leg2 { transform-origin: 200px 240px; animation: runLeg2 0.6s linear infinite; }
                            .arm1 { transform-origin: 200px 180px; animation: runArm1 0.6s linear infinite; }
                            .arm2 { transform-origin: 200px 180px; animation: runArm2 0.6s linear infinite; }
                            .body-bounce { animation: bodyBounce 0.3s ease-in-out infinite; }
                        `}</style>

                        {/* Whole figure bounce */}
                        <g className="body-bounce">
                            {/* Head */}
                            <circle cx="215" cy="140" r="16" fill="#FACC15" filter="url(#glow-gold)" />

                            {/* Torso (Leaning forward) */}
                            <line x1="210" y1="156" x2="200" y2="240" stroke="#FACC15" strokeWidth="12" strokeLinecap="round" filter="url(#glow-gold)" />

                            {/* Back Arm (Arm 2) */}
                            <g className="arm2">
                                <line x1="200" y1="180" x2="160" y2="200" stroke="#EAB308" strokeWidth="10" strokeLinecap="round" />
                                <line x1="160" y1="200" x2="170" y2="160" stroke="#EAB308" strokeWidth="9" strokeLinecap="round" />
                            </g>

                            {/* Back Leg (Leg 2) */}
                            <g className="leg2">
                                <line x1="200" y1="240" x2="170" y2="290" stroke="#EAB308" strokeWidth="12" strokeLinecap="round" />
                                <line x1="170" y1="290" x2="150" y2="280" stroke="#EAB308" strokeWidth="10" strokeLinecap="round" />
                            </g>

                            {/* Front Arm (Arm 1) */}
                            <g className="arm1">
                                <line x1="200" y1="180" x2="250" y2="200" stroke="#FDE047" strokeWidth="10" strokeLinecap="round" filter="url(#glow-gold)" />
                                <line x1="250" y1="200" x2="260" y2="160" stroke="#FDE047" strokeWidth="9" strokeLinecap="round" filter="url(#glow-gold)" />
                            </g>

                            {/* Front Leg (Leg 1) */}
                            <g className="leg1">
                                <line x1="200" y1="240" x2="230" y2="290" stroke="#FDE047" strokeWidth="12" strokeLinecap="round" filter="url(#glow-gold)" />
                                <line x1="230" y1="290" x2="260" y2="280" stroke="#FDE047" strokeWidth="10" strokeLinecap="round" filter="url(#glow-gold)" />
                            </g>
                        </g>
                    </g>


                    {/* Central Wealth System Core - Emerges on isReading */}
                    <g ref={coreRef} className="transition-all duration-700" opacity="0">
                        {/* Only visible/active when 'isReading' state is triggered, acting as the system replacing the wheel */}
                        <g className="core-pulse-anim">
                            <polygon points="200,150 240,170 240,210 200,230 160,210 160,170" fill="none" stroke="#D4AF37" strokeWidth="2" />
                            <circle cx="200" cy="200" r="10" fill="#FDE047" filter="url(#glow-gold)" />
                        </g>
                    </g>
                </svg>

                {/* Secret Emergent Title underneath the layers */}
                <div ref={osTitleRef} className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 z-20">
                    <h3 className="text-xl md:text-2xl font-black text-[#FFD700] tracking-widest drop-shadow-[0_0_15px_rgba(255,215,0,1)] uppercase bg-background-dark/80 px-4 py-2 rounded-xl backdrop-blur-sm">
                        Wealth System Activated
                    </h3>
                </div>
            </div>

            {/* Rat Race Subtitle */}
            <div className="text-center mt-6 z-10 w-full animate-reveal" style={{ animationDelay: '2.5s' }}>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500 font-sans tracking-widest text-sm md:text-base leading-relaxed">
                    你的朝九晚五<br />
                    其实是人生的财务陷阱
                </p>
            </div>
        </div>
    );
}
