import { useState, useEffect, useRef } from 'react';

interface EBookNarratorProps {
  theme: string;
  currentTheme: {
    bg: string;
    text: string;
    textMuted: string;
    border: string;
    cardBg: string;
    heading: string;
    [key: string]: string;
  };
}

export default function EBookNarrator({ theme, currentTheme }: EBookNarratorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const paragraphsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    paragraphsRef.current = document.querySelectorAll('.ebook-paragraph');
    
    // Stop reading when unmounted
    return () => {
      window.speechSynthesis.cancel();
      removeHighlight();
    };
  }, []);

  // Update DOM highlights
  const applyHighlight = (index: number) => {
    removeHighlight();
    if (!paragraphsRef.current || !paragraphsRef.current[index]) return;
    const el = paragraphsRef.current[index];
    
    // Add glowing/highlight class based on theme
    el.classList.add('transition-all', 'duration-500');
    if (theme === 'dark') {
      el.classList.add('text-gold-400', 'drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]');
    } else {
      el.classList.add('text-royal-purple-700', 'drop-shadow-[0_0_8px_rgba(88,28,135,0.2)]', 'font-semibold');
    }

    // Scroll smoothly to center
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const removeHighlight = () => {
    if (!paragraphsRef.current) return;
    paragraphsRef.current.forEach(el => {
      el.classList.remove(
        'transition-all', 'duration-500', 
        'text-gold-400', 'drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]',
        'text-royal-purple-700', 'drop-shadow-[0_0_8px_rgba(88,28,135,0.2)]', 'font-semibold'
      );
    });
  };

  const speakParagraph = (index: number) => {
    if (!paragraphsRef.current) return;
    const el = paragraphsRef.current[index];
    if (!el) return;
    
    const text = el.innerText.trim();
    if (!text) {
      nextParagraph();
      return;
    }

    applyHighlight(index);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 1.0;
    
    utterance.onend = () => {
      setTimeout(nextParagraph, 300);
    };
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const nextParagraph = () => {
    if (!paragraphsRef.current) return;
    currentIndexRef.current += 1;
    if (currentIndexRef.current < paragraphsRef.current.length) {
      speakParagraph(currentIndexRef.current);
    } else {
      setIsPlaying(false);
      currentIndexRef.current = 0;
      removeHighlight();
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        currentIndexRef.current = 0;
        speakParagraph(0);
        setIsPlaying(true);
      }
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    currentIndexRef.current = 0;
    removeHighlight();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {/* Expanded Controls Overlay */}
      <div 
        className={`transition-all duration-300 transform origin-bottom-right flex flex-col items-end gap-2 ${
          isExpanded ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-75 opacity-0 pointer-events-none'
        }`}
      >
        <div className={`p-4 rounded-2xl border shadow-xl flex items-center gap-4 ${currentTheme.cardBg} ${currentTheme.border} backdrop-blur-xl`}>
            <div className={`flex flex-col ${currentTheme.text}`}>
                <span className="text-sm font-bold">AI 智能伴读</span>
                <span className={`text-xs ${currentTheme.textMuted}`}>
                    {isPlaying ? '正在为您朗读中...' : '暂停中'}
                </span>
            </div>
            
            <div className="flex items-center gap-2">
                <button
                    onClick={handleStop}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-500/10 hover:bg-slate-500/20 transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">stop</span>
                </button>
                <button
                    onClick={handlePlayPause}
                    className={`w-12 h-12 flex items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                        theme === 'dark' ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-black' : 'bg-royal-purple-600'
                    }`}
                >
                    <span className="material-symbols-outlined ml-0.5">
                        {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                </button>
            </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 z-50 ${
          isExpanded 
            ? 'bg-slate-800 text-white hover:bg-slate-700' 
            : theme === 'dark' 
                ? 'bg-gradient-to-br from-gold-500 to-amber-600 text-black animate-pulse-slow' 
                : 'bg-gradient-to-br from-royal-purple-500 to-royal-purple-700 text-white'
        }`}
      >
        {isExpanded ? (
          <span className="material-symbols-outlined">close</span>
        ) : (
          <span className="material-symbols-outlined">headset</span>
        )}
      </button>
    </div>
  );
}
