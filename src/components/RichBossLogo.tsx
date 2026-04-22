
const RichBossLogo = ({ className = 'h-10' }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-[4%] ${className}`}>
      {/* Icon */}
      <svg viewBox="0 0 100 100" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4c1e87" />
            <stop offset="100%" stopColor="#28004f" />
          </linearGradient>
          <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe999" />
            <stop offset="25%" stopColor="#ffb800" />
            <stop offset="100%" stopColor="#d38200" />
          </linearGradient>
        </defs>
        
        {/* Gap is 8 units: left pieces are width 46, right pieces start at 54 */}
        <rect x="0" y="0" width="46" height="46" fill="url(#purpleGrad)" />
        <rect x="0" y="54" width="46" height="46" fill="url(#purpleGrad)" />
        <path d="M54,46 L54,0 A46,46 0 0,1 100,46 Z" fill="url(#yellowGrad)" />
        {/* Adjusted points for bottom-right to make the upper part narrower and slant exactly as the R leg in the design */}
        <polygon points="54,54 75,54 100,100 54,100" fill="url(#purpleGrad)" />
      </svg>
      {/* Text - original color with white stroke for dark background visibility */}
      <span 
        className="font-black tracking-tight drop-shadow-sm" 
        style={{ 
          color: '#4c1e87', // 恢复原版深紫
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.95)', // 添加白色描边
          fontSize: '2.5em', 
          lineHeight: '1',
          fontFamily: "'Segoe UI', 'Montserrat', 'Inter', 'SF Pro Display', sans-serif" 
        }}
      >
        RICHBOSS
      </span>
    </div>
  );
};

export default RichBossLogo;
