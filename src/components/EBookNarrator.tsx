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

  const originalHtmlRef = useRef<{ el: HTMLElement, html: string } | null>(null);

  const restoreHtml = () => {
    if (originalHtmlRef.current) {
      originalHtmlRef.current.el.innerHTML = originalHtmlRef.current.html;
      originalHtmlRef.current.el.classList.remove('transition-all', 'duration-500', 'border-l-4', 'border-gold-400', 'border-royal-purple-700', 'pl-4');
      originalHtmlRef.current = null;
    }
  };

  // Update DOM highlights
  const applyHighlight = (index: number) => {
    restoreHtml();
    if (!paragraphsRef.current || !paragraphsRef.current[index]) return;
    const el = paragraphsRef.current[index];
    
    originalHtmlRef.current = { el, html: el.innerHTML };
    
    // Base active paragraph styling
    el.classList.add('transition-all', 'duration-500', 'pl-4', 'border-l-4');
    if (theme === 'dark') {
      el.classList.add('border-gold-400');
    } else {
      el.classList.add('border-royal-purple-700');
    }

    // Scroll smoothly to center
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const removeHighlight = () => {
    restoreHtml();
  };

  const getClauseBoundaries = (text: string, charIndex: number) => {
    const punctuations = /[，。！？；：,.!?;:\n\s]/;
    let start = 0;
    for (let i = charIndex - 1; i >= 0; i--) {
      if (punctuations.test(text[i])) {
        start = i + 1;
        break;
      }
    }
    let end = text.length;
    for (let i = charIndex; i < text.length; i++) {
      if (punctuations.test(text[i])) {
        end = i + 1;
        break;
      }
    }
    if (start > charIndex) start = charIndex;
    return { start, end };
  };

  // 获取更自然/更好的中文语音，特别是在 iOS 和 Windows 上
  const getBestVoice = () => {
    if (!window.speechSynthesis) return null;
    const availableVoices = window.speechSynthesis.getVoices();
    
    // 优先选择已知的高质量女声/自然语音
    const preferredNames = [
      'Tingting', 'Xiaoxiao', 'Meijia', 'Yunxi', 'Yunjian', 'Yu-shu', 'Li-mu', 'Siri', 'Premium'
    ];
    
    // 找出所有中文语音
    const zhVoices = availableVoices.filter(v => 
      v.lang.startsWith('zh') || v.lang.startsWith('cmn') || v.name.includes('Chinese')
    );
    
    if (zhVoices.length === 0) return null;

    // 优先匹配高质量语音
    for (const name of preferredNames) {
      const match = zhVoices.find(v => v.name.includes(name));
      if (match) return match;
    }
    
    return zhVoices[0]; // 退回到第一个找到的中文语音
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
    utterance.volume = 1.0; // 强制设置音量为最大，防静音
    
    const bestVoice = getBestVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    
    utterance.onboundary = (e) => {
      if (e.name !== 'word' && e.name !== 'sentence') return;
      
      const { start, end } = getClauseBoundaries(text, e.charIndex);
      if (start >= end) return;
      
      const before = text.substring(0, start);
      const highlight = text.substring(start, end);
      const after = text.substring(end);
      
      const bgClass = theme === 'dark' ? 'bg-blue-900/60' : 'bg-blue-200/80';
      const textClass = theme === 'dark' ? 'text-blue-100' : 'text-blue-900';
      
      el.innerHTML = `${before}<mark class="${bgClass} ${textClass} rounded px-1 transition-colors duration-200">${highlight}</mark>${after}`;
    };
    
    utterance.onend = () => {
      setTimeout(nextParagraph, 300);
    };
    
    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
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
    // 强制触发一次 getVoices 来解决 iOS 各种加载问题
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.getVoices();
    }
    
    // iOS Safari 语音解锁机制：必须在用户实际点击的事件循环内直接触发一次 speak
    if (!isPlaying && window.speechSynthesis.paused === false && currentIndexRef.current === 0) {
      const wakeUpUtterance = new SpeechSynthesisUtterance('');
      wakeUpUtterance.volume = 0;
      window.speechSynthesis.speak(wakeUpUtterance);
    }

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
    <div className="fixed bottom-6 right-4 sm:bottom-10 sm:right-8 z-[60] flex flex-col items-end gap-3">
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
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 z-50 opacity-70 hover:opacity-100 backdrop-blur-xl border border-white/20 dark:border-white/10 ${
          isExpanded 
            ? 'bg-slate-800/60 text-white' 
            : theme === 'dark' 
                ? 'bg-gold-400/20 text-gold-400 animate-pulse-slow' 
                : 'bg-royal-purple-600/20 text-royal-purple-700'
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
