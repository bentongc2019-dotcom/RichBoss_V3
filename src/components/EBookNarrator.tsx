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

/**
 * 简易有声书朗读器，使用浏览器原生 SpeechSynthesis。
 * 支持播放/暂停，自动遍历页面中的段落（className="ebook-paragraph"）。
 */
export default function EBookNarrator({ theme, currentTheme }: EBookNarratorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const paragraphsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // 获取所有段落元素
    paragraphsRef.current = document.querySelectorAll('.ebook-paragraph');
    // 当页面离开时停止朗读
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakParagraph = (index: number) => {
    if (!paragraphsRef.current) return;
    const el = paragraphsRef.current[index];
    if (!el) return;
    const text = el.innerText.trim();
    if (!text) {
      // 跳过空段落
      nextParagraph();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    // 强制使用中文语言
    utterance.lang = 'zh-CN';
    utterance.onend = () => {
      // 在 Safari 等浏览器中有时会出现触发多次，这里简单延时一下跳下一段
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
      // 完成朗读
      setIsPlaying(false);
      currentIndexRef.current = 0;
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
        // 从头开始朗读
        currentIndexRef.current = 0;
        speakParagraph(0);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 mb-8 rounded-xl border ${currentTheme.border} ${currentTheme.cardBg}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlayPause}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-300
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-black hover:shadow-[0_0_15px_rgba(251,191,36,0.4)]' 
              : 'bg-royal-purple-600 text-white hover:bg-royal-purple-700 shadow-md'}`}
        >
          {isPlaying ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
              </svg>
              <span>暂停朗读</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
              <span>{window.speechSynthesis.paused ? '继续朗读' : '开始朗读'}</span>
            </>
          )}
        </button>
        <span className={`${currentTheme.textMuted} text-sm hidden sm:inline-block`}>AI 语音朗读伴读</span>
      </div>
      <div className={`${currentTheme.textMuted} text-xs md:text-sm`}>
        {isPlaying && (
          <span className="flex items-center gap-1.5 text-gold-500 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            正在朗读中
          </span>
        )}
      </div>
    </div>
  );
}
