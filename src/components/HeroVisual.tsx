import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroVisual({ isReading }: { isReading: boolean }) {
    const orbitContainerRef = useRef<SVGGElement>(null);
    const outerOrbitGroupRef = useRef<SVGGElement>(null);
    const innerOrbitGroupRef = useRef<SVGGElement>(null);

    const outerRunnersRef = useRef<SVGGElement>(null);
    const innerRunnersRef = useRef<SVGGElement>(null);

    const coreRef = useRef<SVGGElement>(null);
    const osTitleRef = useRef<HTMLDivElement>(null);

    // Core tweens
    const tweensRef = useRef<gsap.core.Tween[]>([]);

    useEffect(() => {
        // Outer orbit track rotates slowly Clockwise (rat race track)
        const t1 = gsap.to(outerOrbitGroupRef.current, { rotation: 360, transformOrigin: "200px 200px", repeat: -1, duration: 25, ease: "none" });
        // Inner orbit track rotates slowly Counter-Clockwise
        const t2 = gsap.to(innerOrbitGroupRef.current, { rotation: -360, transformOrigin: "200px 200px", repeat: -1, duration: 30, ease: "none" });

        // Core cube rotates slowly Clockwise
        const t3 = gsap.to(coreRef.current, { rotation: 360, transformOrigin: "200px 200px", repeat: -1, duration: 12, ease: "none" });

        // Outer runners (mice + cheese) rotate clockwise (4s)
        const t4 = gsap.to(outerRunnersRef.current, { rotation: 360, transformOrigin: "200px 200px", repeat: -1, duration: 4, ease: "none" });

        // Inner runners rotate counter-clockwise (4.5s)
        const t5 = gsap.to(innerRunnersRef.current, { rotation: -360, transformOrigin: "200px 200px", repeat: -1, duration: 4.5, ease: "none" });

        // Pulsing glow on the cheese
        const cheeses = document.querySelectorAll('.cheese-glow');
        const t6 = gsap.to(cheeses, {
            opacity: 0.15,
            scale: 0.8,
            transformOrigin: "50% 50%",
            yoyo: true,
            repeat: -1,
            duration: 1,
            ease: "sine.inOut"
        });

        tweensRef.current = [t1, t2, t3, t4, t5, t6];

        return () => {
            tweensRef.current.forEach(t => t.kill());
        };
    }, []);

    useEffect(() => {
        if (isReading) {
            // Speed drops to zero over 1.5 seconds smoothly
            gsap.to(tweensRef.current, { timeScale: 0, duration: 1.5, ease: "power2.out" });

            // Core cube transitions from dim to bright gold
            gsap.to(coreRef.current, {
                stroke: '#FFD700',
                opacity: 1,
                filter: 'drop-shadow(0 0 25px rgba(255, 215, 0, 1))',
                duration: 1.5
            });

            // Fade out the rat race slightly to focus on the core
            gsap.to(orbitContainerRef.current, {
                opacity: 0.1,
                duration: 1.5
            });

            // "Wealth OS V2.0" title emerges
            gsap.to(osTitleRef.current, { opacity: 1, duration: 1.5, ease: "power2.out" });
        }
    }, [isReading]);

    // Simple line-art mouse component
    const MouseComponent = ({ angle, radius, direction = 1, color = "#D4AF37" }: { angle: number, radius: number, direction?: number, color?: string }) => {
        return (
            <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '200px 200px' }}>
                <g transform={`translate(200, ${200 - radius}) rotate(${direction === 1 ? 90 : -90})`}>
                    {/* Mouse body (minimalist teardrop/line art) */}
                    <path d="M-6 0 C-6 -2 -1 -2.5 4 -1 C6 -0.5 8 0 8 0 C8 0 6 0.5 4 1 C-1 2.5 -6 2 -6 0 Z" fill="none" stroke={color} strokeWidth="1" />
                    {/* Tail */}
                    <path d="M-6 0 Q-12 -3 -16 2" fill="none" stroke={color} strokeWidth="0.6" opacity="0.6" />
                    {/* Whiskers */}
                    <line x1="4" y1="-1.5" x2="6" y2="-4" stroke={color} strokeWidth="0.4" opacity="0.5" />
                    <line x1="4" y1="1.5" x2="6" y2="4" stroke={color} strokeWidth="0.4" opacity="0.5" />
                </g>
            </g>
        );
    };

    // Small cheese target component
    const CheeseComponent = ({ angle, radius }: { angle: number, radius: number }) => {
        return (
            <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '200px 200px' }}>
                <g transform={`translate(200, ${200 - radius}) rotate(90)`}>
                    {/* Glowing aura */}
                    <circle cx="0" cy="0" r="10" fill="#FACC15" className="cheese-glow" opacity="0.5" filter="blur(3px)" />
                    {/* Minimalist cheese wedge - geometric */}
                    <polygon points="-3,-2 3,0 -3,2" fill="none" stroke="#FFE066" strokeWidth="1" />
                    <circle cx="-1" cy="0" r="0.6" fill="#FFE066" />
                </g>
            </g>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full relative">
            {/* The group class handles the CSS hover state for fading rat race and glowing core */}
            <div className="aspect-square w-full max-w-[400px] border border-white/5 rounded-3xl overflow-hidden relative group flex flex-col items-center justify-center transition-all duration-700 hover:border-[#D4AF37]/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent mix-blend-screen pointer-events-none group-hover:from-[#D4AF37]/10 transition-colors duration-700"></div>

                <svg className="w-5/6 h-5/6 system-svg z-10" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">

                    {/* Rat Race Orbits - faded on hover */}
                    <g ref={orbitContainerRef} className="transition-opacity duration-700 group-hover:opacity-30">
                        {/* Outer Orbit */}
                        <g>
                            <g ref={outerOrbitGroupRef}>
                                <circle cx="200" cy="200" r="150" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
                            </g>
                            {/* Runners */}
                            <g ref={outerRunnersRef}>
                                <MouseComponent angle={0} radius={150} />
                                <MouseComponent angle={120} radius={150} />
                                <MouseComponent angle={240} radius={150} />
                                {/* Cheese slightly ahead */}
                                <CheeseComponent angle={30} radius={150} />
                            </g>
                        </g>

                        {/* Inner Orbit */}
                        <g>
                            <g ref={innerOrbitGroupRef}>
                                <circle cx="200" cy="200" r="110" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.3" />
                            </g>
                            <g ref={innerRunnersRef}>
                                <MouseComponent angle={0} radius={110} direction={-1} />
                                <MouseComponent angle={120} radius={110} direction={-1} />
                                <MouseComponent angle={240} radius={110} direction={-1} />
                                <CheeseComponent angle={-30} radius={110} />
                            </g>
                        </g>
                    </g>

                    {/* Central Wealth System Cube - lit faintly normally, glows brightly on hover */}
                    <g ref={coreRef} className="transition-all duration-700 group-hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]" opacity="0.5">
                        {/* Subtle glow behind the cube that intensifies on hover */}
                        <circle cx="200" cy="200" r="40" fill="#D4AF37" className="opacity-5 group-hover:opacity-20 transition-opacity duration-700" filter="blur(10px)" />

                        <g stroke="#D4AF37" strokeWidth="0.8">
                            <polygon points="200,150 240,170 240,210 200,230 160,210 160,170" fill="none" />
                            <polygon points="200,165 225,180 225,205 200,220 175,205 175,180" fill="none" strokeOpacity="0.6" />
                            <line x1="200" y1="150" x2="200" y2="165" opacity="0.6" />
                            <line x1="240" y1="170" x2="225" y2="180" opacity="0.6" />
                            <line x1="240" y1="210" x2="225" y2="205" opacity="0.6" />
                            <line x1="200" y1="230" x2="200" y2="220" opacity="0.6" />
                            <line x1="160" y1="210" x2="175" y2="205" opacity="0.6" />
                            <line x1="160" y1="170" x2="175" y2="180" opacity="0.6" />

                            <line x1="200" y1="192" x2="200" y2="165" opacity="0.4" />
                            <line x1="200" y1="192" x2="225" y2="205" opacity="0.4" />
                            <line x1="200" y1="192" x2="175" y2="205" opacity="0.4" />
                        </g>
                    </g>
                </svg>

                {/* Secret Emergent Title underneath the layers */}
                <div ref={osTitleRef} className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 z-20">
                    <h3 className="text-xl md:text-2xl font-black text-[#FFD700] tracking-widest drop-shadow-[0_0_15px_rgba(255,215,0,1)] uppercase">
                        Wealth OS V2.0
                    </h3>
                </div>
            </div>

            {/* Rat Race Subtitle */}
            <div className="text-center mt-6 z-10 w-full">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500 font-sans tracking-widest text-sm md:text-base leading-relaxed">
                    90%的人在老鼠赛跑<br />
                    10%的人在建立财富系统
                </p>
            </div>
        </div>
    );
}

