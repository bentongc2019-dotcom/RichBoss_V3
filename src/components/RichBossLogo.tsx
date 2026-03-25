import React from 'react';

const RichBossLogo = ({ className = 'h-10', variant = 'light' }: { className?: string; variant?: 'light' | 'dark' }) => {
  const textColor = variant === 'light' ? '#FFFFFF' : '#390A63';
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <svg viewBox="0 0 100 100" className="h-full w-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5C1B98" />
            <stop offset="100%" stopColor="#3C0E68" />
          </linearGradient>
          <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="15%" stopColor="#FFDE59" />
            <stop offset="60%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#CC8400" />
          </linearGradient>
        </defs>
        
        {/* Gap is 8 units: left pieces are width 46, right pieces start at 54 */}
        <rect x="0" y="0" width="46" height="46" fill="url(#purpleGrad)" />
        <rect x="0" y="54" width="46" height="46" fill="url(#purpleGrad)" />
        <path d="M54,46 L54,0 A46,46 0 0,1 100,46 Z" fill="url(#yellowGrad)" />
        <polygon points="54,54 82,54 100,100 54,100" fill="url(#purpleGrad)" />
      </svg>
      {/* Text */}
      <span 
        className="font-black tracking-tight" 
        style={{ 
          color: textColor, 
          fontSize: '2em', // Adjusted dynamically relative to container height
          lineHeight: '1',
          fontFamily: "'Montserrat', 'Inter', 'SF Pro Display', sans-serif" 
        }}
      >
        RICHBOSS
      </span>
    </div>
  );
};

export default RichBossLogo;
