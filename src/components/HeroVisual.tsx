import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroVisual({ isReading }: { isReading: boolean }) {
    const ring1Ref = useRef<SVGCircleElement>(null);
    const ring2Ref = useRef<SVGCircleElement>(null);
    const ring3Ref = useRef<SVGCircleElement>(null);
    const coreRef = useRef<SVGGElement>(null);
    const osTitleRef = useRef<HTMLDivElement>(null);

    // Initial Tweens so we can slow them down gracefully
    const tweensRef = useRef<gsap.core.Tween[]>([]);

    useEffect(() => {
        // High speed async rotations for 3 Rat Race rings
        const t1 = gsap.to(ring1Ref.current, { rotation: 360, transformOrigin: "50% 50%", repeat: -1, duration: 2.5, ease: "none" });
        const t2 = gsap.to(ring2Ref.current, { rotation: -360, transformOrigin: "50% 50%", repeat: -1, duration: 3.2, ease: "none" });
        const t3 = gsap.to(ring3Ref.current, { rotation: 360, transformOrigin: "50% 50%", repeat: -1, duration: 4.8, ease: "none" });

        tweensRef.current = [t1, t2, t3];

        return () => {
            t1.kill();
            t2.kill();
            t3.kill();
        };
    }, []);

    useEffect(() => {
        if (isReading) {
            // Speed drops to zero over 1.5 seconds smoothly
            gsap.to(tweensRef.current, { timeScale: 0, duration: 1.5, ease: "power2.out" });

            // Core cube transitions from dim to bright #FFD700
            gsap.to(coreRef.current, {
                stroke: '#FFD700',
                opacity: 1,
                filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.8))',
                duration: 1.5
            });

            // "Wealth OS V2.0" title emerges
            gsap.to(osTitleRef.current, { opacity: 1, duration: 1.5, ease: "power2.out" });
        }
    }, [isReading]);

    return (
        <div className="flex flex-col items-center justify-center w-full relative">
            <div className="aspect-square w-full max-w-[400px] border border-white/5 rounded-3xl overflow-hidden relative group flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent mix-blend-screen pointer-events-none"></div>

                <svg className="w-4/5 h-4/5 system-svg z-10" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    {/* Dark Grey #333333 Rat Race Rings */}
                    <circle ref={ring1Ref} cx="200" cy="200" r="160" fill="none" stroke="#333333" strokeWidth="2" strokeDasharray="10 30 60 40 5 15" />
                    <circle ref={ring2Ref} cx="200" cy="200" r="120" fill="none" stroke="#333333" strokeWidth="1.5" strokeDasharray="50 40 20 60" />
                    <circle ref={ring3Ref} cx="200" cy="200" r="80" fill="none" stroke="#333333" strokeWidth="1" strokeDasharray="80 20" />

                    {/* Central Cube - Initially dimly lit, waiting to be activated */}
                    <g ref={coreRef} opacity="0.4" stroke="#D4AF37" strokeWidth="0.5">
                        <polygon points="200,140 250,165 250,215 200,240 150,215 150,165" fill="none" />
                        <polygon points="200,160 230,175 230,205 200,220 170,205 170,175" fill="none" />
                        <line x1="200" y1="140" x2="200" y2="160" />
                        <line x1="250" y1="165" x2="230" y2="175" />
                        <line x1="250" y1="215" x2="230" y2="205" />
                        <line x1="200" y1="240" x2="200" y2="220" />
                        <line x1="150" y1="215" x2="170" y2="205" />
                        <line x1="150" y1="165" x2="170" y2="175" />
                        <line x1="200" y1="190" x2="200" y2="160" />
                        <line x1="200" y1="190" x2="230" y2="205" />
                        <line x1="200" y1="190" x2="170" y2="205" />
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
            <div className="text-center mt-6 z-10">
                <p className="text-slate-400 font-sans tracking-widest text-sm md:text-base leading-relaxed opacity-80">
                    90%的人在老鼠赛跑<br />
                    10%的人在建立财富系统
                </p>
            </div>
        </div>
    );
}
