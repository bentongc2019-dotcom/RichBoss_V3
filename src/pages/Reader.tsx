import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import { motion, AnimatePresence } from 'framer-motion'
import InviteCodeForm from '../components/InviteCodeForm';
import EBookNarrator from '../components/EBookNarrator';
import { isAuthenticated } from '../utils/inviteCodeValidator'

// 内容分界点文字（解锁前只显示此文字之前的内容）
const CONTENT_BREAK_POINT = '音乐继续流动着，给他们留了一点缓冲的空间。'

// 目錄項目類型
interface TocItem {
    id: string
    text: string
    level: number
}

// 主題類型
type Theme = 'dark' | 'light' | 'eyecare'

// 主題配色
const THEMES = {
    dark: {
        bg: 'bg-black',
        headerBg: 'bg-royal-purple-900/90',
        sidebarBg: 'bg-gray-900/95',
        text: 'text-gray-200',
        textMuted: 'text-gray-400',
        heading: 'text-gold-400',
        border: 'border-gray-800',
        cardBg: 'bg-gray-800/50',
        contentBg: 'rgba(0,0,0,0.3)',
    },
    light: {
        bg: 'bg-white',
        headerBg: 'bg-royal-purple-600/95',
        sidebarBg: 'bg-gray-100/95',
        text: 'text-black',
        textMuted: 'text-gray-600',
        heading: 'text-royal-purple-800',
        border: 'border-gray-200',
        cardBg: 'bg-gray-100/50',
        contentBg: 'rgba(106,27,154,0.1)',
    },
    eyecare: {
        bg: 'bg-[#C8E6C9]',
        headerBg: 'bg-[#4CAF50]/95',
        sidebarBg: 'bg-[#E8F5E9]/95',
        text: 'text-[#1B5E20]',
        textMuted: 'text-[#2E7D32]',
        heading: 'text-[#1B5E20]',
        border: 'border-[#A5D6A7]',
        cardBg: 'bg-[#E8F5E9]/50',
        contentBg: 'rgba(200,230,201,0.5)',
    },
}

// LocalStorage 鍵名
const STORAGE_KEYS = {
    SCROLL_POSITION: 'richboss_reader_scroll',
    FONT_SIZE: 'richboss_reader_fontsize',
    THEME: 'richboss_reader_theme',
}

/**
 * 專業電子書閱讀器組件
 * 功能：響應式目錄、主題切換、閱讀進度條、邀请码解锁
 */
function Reader() {
    // 基本狀態
    const [content, setContent] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // 邀请码解锁状态
    const [isUnlocked, setIsUnlocked] = useState<boolean>(false)

    // E-Reader 功能狀態
    const [tocItems, setTocItems] = useState<TocItem[]>([])
    const [activeTocId, setActiveTocId] = useState<string>('')
    const [showMobileToc, setShowMobileToc] = useState<boolean>(false)
    const [fontSize, setFontSize] = useState<number>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.FONT_SIZE)
        return saved ? parseInt(saved) : 18
    })
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.THEME)
        return (saved as Theme) || 'dark'
    })
    const [hasReadingProgress, setHasReadingProgress] = useState<boolean>(false)
    const [savedScrollPosition, setSavedScrollPosition] = useState<number>(0)
    const [readProgress, setReadProgress] = useState<number>(0)
    const [isUiVisible, setIsUiVisible] = useState<boolean>(true)


    // 目录容器 ref（桌面端 + 移动端），用于自动滚动到高亮项
    const tocDesktopRef = useRef<HTMLElement>(null)
    const tocMobileRef = useRef<HTMLElement>(null)
    const currentTheme = THEMES[theme]

    // 检查解锁状态
    useEffect(() => {
        setIsUnlocked(isAuthenticated())
    }, [])

    // 處理沉浸式閱讀UI自動隱藏
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>
        let throttleTimer: ReturnType<typeof setTimeout> | null = null

        const handleUserActivity = () => {
            if (!throttleTimer) {
                setIsUiVisible(true)
                throttleTimer = setTimeout(() => {
                    throttleTimer = null
                }, 200)
            }
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                setIsUiVisible(false)
            }, 3000)
        }

        handleUserActivity()

        window.addEventListener('mousemove', handleUserActivity)
        window.addEventListener('touchstart', handleUserActivity)
        window.addEventListener('scroll', handleUserActivity, { passive: true })
        window.addEventListener('keydown', handleUserActivity)

        return () => {
            clearTimeout(timeout)
            if (throttleTimer) clearTimeout(throttleTimer)
            window.removeEventListener('mousemove', handleUserActivity)
            window.removeEventListener('touchstart', handleUserActivity)
            window.removeEventListener('scroll', handleUserActivity)
            window.removeEventListener('keydown', handleUserActivity)
        }
    }, [])

    // 处理解锁成功
    const handleUnlockSuccess = () => {
        setIsUnlocked(true)
    }

    // 根据解锁状态获取显示内容
    const getDisplayContent = (fullContent: string): string => {
        if (isUnlocked) {
            return fullContent
        }

        // 查找分界点位置
        const breakIndex = fullContent.indexOf(CONTENT_BREAK_POINT)
        if (breakIndex === -1) {
            // 如果找不到分界点，显示前30%内容
            const previewLength = Math.floor(fullContent.length * 0.3)
            return fullContent.substring(0, previewLength)
        }

        // 返回分界点之前的内容（包含分界点文字）
        return fullContent.substring(0, breakIndex + CONTENT_BREAK_POINT.length)
    }

    // 加載 Markdown 文件
    useEffect(() => {
        const loadContent = async () => {
            try {
                setIsLoading(true)
                // Add a cache-buster query parameter to force fetching the latest version
                const cacheBuster = `?v=${new Date().getTime()}`
                const response = await fetch(import.meta.env.BASE_URL + 'book.md' + cacheBuster)

                if (!response.ok) {
                    throw new Error(`無法加載書籍內容 (HTTP ${response.status})`)
                }

                const arrayBuffer = await response.arrayBuffer()
                const text = new TextDecoder('utf-8').decode(arrayBuffer)
                setContent(text)

                const headingRegex = /^(#{1,3})\s+(.+)$/gm
                const items: TocItem[] = []
                let match

                while ((match = headingRegex.exec(text)) !== null) {
                    const level = match[1].length
                    const rawText = match[2]
                    const id = rawText
                        .toLowerCase()
                        .replace(/[^\w\u4e00-\u9fff]+/g, '-')
                        .replace(/^-|-$/g, '')

                    items.push({ id, text: rawText, level })
                }

                setTocItems(items)
            } catch (err) {
                console.error('加載內容失敗:', err)
                setError(err instanceof Error ? err.message : '加載失敗')
            } finally {
                setIsLoading(false)
            }
        }

        loadContent()
    }, [])

    // 檢查保存的閱讀進度
    useEffect(() => {
        const savedPosition = localStorage.getItem(STORAGE_KEYS.SCROLL_POSITION)
        if (savedPosition) {
            const position = parseInt(savedPosition)
            if (position > 100) {
                setHasReadingProgress(true)
                setSavedScrollPosition(position)
            }
        }
    }, [])

    // 保存滾動進度和計算閱讀進度百分比
    const saveScrollProgress = useCallback(() => {
        const scrollY = window.scrollY
        if (scrollY > 100) {
            localStorage.setItem(STORAGE_KEYS.SCROLL_POSITION, scrollY.toString())
        }

        // 計算閱讀進度百分比
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0
        setReadProgress(progress)
    }, [])

    // ====== IntersectionObserver：监听章节标题，自动更新高亮 ======
    useEffect(() => {
        if (isLoading || !content) return

        // 等 DOM 渲染完再绑定
        const timer = setTimeout(() => {
            const headings = document.querySelectorAll('.chapter-heading[id]')
            if (headings.length === 0) return

            // 初始状态检查：找到最后一个已经在视口上方（或接近顶部）的标题
            // 这样即便刷新页面停留在文章中间，也能正确高亮对应的目录
            let initialActiveId = ''
            for (let i = headings.length - 1; i >= 0; i--) {
                const rect = headings[i].getBoundingClientRect()
                // 150px 是一个缓冲区，确保标题滑上去之后才切换
                if (rect.top < 150) {
                    initialActiveId = headings[i].id
                    break
                }
            }
            if (!initialActiveId && headings.length > 0) {
                initialActiveId = headings[0].id
            }
            if (initialActiveId) {
                setActiveTocId(initialActiveId)
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    const visibleEntries = entries.filter((e) => e.isIntersecting)
                    if (visibleEntries.length > 0) {
                        // 取最靠近视口顶部的那个
                        const closest = visibleEntries.reduce((prev, curr) =>
                            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
                        )
                        setActiveTocId(closest.target.id)
                    }
                },
                { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
            )

            headings.forEach((h) => observer.observe(h))
            return () => observer.disconnect()
        }, 300)

        return () => clearTimeout(timer)
    }, [isLoading, content, isUnlocked])

    // ====== 高亮项变化时，目录容器自动滚动到可见 ======
    useEffect(() => {
        if (!activeTocId) return
            ;[tocDesktopRef, tocMobileRef].forEach((ref) => {
                if (!ref.current) return
                const activeEl = ref.current.querySelector(`[data-toc-id="${activeTocId}"]`)
                if (activeEl) {
                    activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
                }
            })
    }, [activeTocId])

    // ====== 滚动进度条 + 保存阅读位置 ======
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>
        let rafId: number
        let lastProgress = 0

        const handleScroll = () => {
            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight
                const progress = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0
                if (Math.abs(progress - lastProgress) > 0.5) {
                    lastProgress = progress
                    setReadProgress(progress)
                }
            })
            clearTimeout(timeoutId)
            timeoutId = setTimeout(saveScrollProgress, 200)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(timeoutId)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [saveScrollProgress])

    // 保存偏好設置
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.FONT_SIZE, fontSize.toString())
    }, [fontSize])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.THEME, theme)
    }, [theme])

    // 繼續閱讀
    const handleContinueReading = () => {
        window.scrollTo({ top: savedScrollPosition, behavior: 'smooth' })
        setHasReadingProgress(false)
    }

    // 跳轉到目錄項目
    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setShowMobileToc(false)
        }
    }

    // 切換主題
    const cycleTheme = () => {
        setTheme((prev) => {
            if (prev === 'dark') return 'light'
            if (prev === 'light') return 'eyecare'
            return 'dark'
        })
    }

    // 獲取主題圖標
    const getThemeIcon = () => {
        if (theme === 'dark') return '🌙'
        if (theme === 'light') return '☀️'
        return '🌿'
    }

    // 上一章/下一章導航
    const navigateChapter = (direction: 'prev' | 'next') => {
        const currentIndex = tocItems.findIndex((item) => item.id === activeTocId)
        const targetIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1

        if (targetIndex >= 0 && targetIndex < tocItems.length) {
            scrollToHeading(tocItems[targetIndex].id)
        }
    }

    // 調整字體大小
    const adjustFontSize = (delta: number) => {
        setFontSize((prev) => Math.min(32, Math.max(14, prev + delta)))
    }

    const currentChapterIndex = tocItems.findIndex((item) => item.id === activeTocId)

    // 获取要显示的内容
    const displayContent = getDisplayContent(content)

    // Memoize the markdown components to prevent creating new objects on every render
    const markdownComponents = useMemo(() => ({
        img: ({ src, alt }: any) => {
            const imageSrc = src?.startsWith('http')
                ? src
                : `${import.meta.env.BASE_URL}images/${src?.replace(/^\.?\/?images\//, '')}`

            return (
                <img
                    src={imageSrc}
                    alt={alt || ''}
                    className="block w-full max-w-2xl mx-auto rounded-xl shadow-2xl shadow-black/50 my-10"
                    loading="lazy"
                    decoding="async"
                />
            )
        },
        p: ({ children, node }: any) => {
            const hasImage = node?.children?.some((child: any) =>
                child?.tagName === 'img' || (child?.type === 'element' && child?.tagName === 'img')
            )

            if (hasImage) {
                return <div className="my-6">{children}</div>
            }

            // 针对开头的副标题文字（原本会因 text-justify 而被拉大间距）取消首行缩进及强行两端对齐
            const rawText = node?.children?.map((c: any) => c.value || '').join('') || ''
            if (rawText.includes('RICH BOSS, POOR BOSS') || rawText.includes('重新定义｜Reframed')) {
                return (
                    <p className={`${currentTheme.heading} text-center leading-relaxed mb-6 font-medium`} style={{ textIndent: '0', textAlign: 'center' }}>
                        {children}
                    </p>
                )
            }

            return (
                <p className={`${currentTheme.text} leading-relaxed mb-6 ebook-paragraph`}>
                    {children}
                </p>
            )
        },
        h1: ({ children }: any) => {
            const text = String(children)
            const id = text
                .toLowerCase()
                .replace(/[^\w\u4e00-\u9fff]+/g, '-')
                .replace(/^-|-$/g, '')

            return (
                <h1
                    id={id}
                    className={`chapter-heading ${theme === 'dark' ? 'text-gradient-gold' : currentTheme.heading
                        } text-4xl md:text-5xl font-bold mb-8 mt-16 first:mt-0`}
                >
                    {children}
                </h1>
            )
        },
        h2: ({ children }: any) => {
            const text = String(children)
            const id = text
                .toLowerCase()
                .replace(/[^\w\u4e00-\u9fff]+/g, '-')
                .replace(/^-|-$/g, '')

            return (
                <h2
                    id={id}
                    className={`chapter-heading ${currentTheme.heading} text-2xl md:text-3xl font-semibold mb-6 mt-14 pb-3 border-b ${currentTheme.border}`}
                >
                    {children}
                </h2>
            )
        },
        h3: ({ children }: any) => {
            const text = String(children)
            const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '')
            return (
                <h3 id={id} className={`chapter-heading ${currentTheme.heading} text-xl md:text-2xl font-medium mb-4 mt-10`}>
                    {children}
                </h3>
            )
        },
        blockquote: ({ children }: any) => (
            <blockquote className={`border-l-4 border-royal-purple-600 ${currentTheme.cardBg} pl-6 pr-4 py-4 my-8 italic ${currentTheme.textMuted} rounded-r-lg`}>
                {children}
            </blockquote>
        ),
        strong: ({ children }: any) => (
            <strong className={`${theme === 'dark' ? 'text-gold-400' : currentTheme.heading} font-semibold`}>
                {children}
            </strong>
        ),
    }), [theme, currentTheme]) // 依賴主題

    // Memoize the rendered markdown so it doesn't re-render on scroll progress updates
    const renderedMarkdown = useMemo(() => (
        <ReactMarkdown
            remarkPlugins={[remarkUnwrapImages]}
            components={markdownComponents as any}
        >
            {displayContent}
        </ReactMarkdown>
    ), [displayContent, markdownComponents])

    // 目錄內容組件
    // 根据主题动态生成目录文字颜色，避免浅色主题下文字看不清
    const tocItemColor = theme === 'dark'
        ? 'text-gray-400 hover:text-yellow-400'
        : theme === 'light'
        ? 'text-gray-700 hover:text-royal-purple-700'
        : 'text-[#1B5E20] hover:text-[#2E7D32]'

    const tocActiveColor = theme === 'dark'
        ? ''
        : theme === 'light'
        ? '!text-royal-purple-700 !border-l-royal-purple-600 !bg-royal-purple-100/50'
        : '!text-[#1B5E20] !border-l-[#2E7D32] !bg-[#C8E6C9]/50'

    const TocContent = ({ containerRef }: { containerRef?: React.Ref<HTMLElement> }) => (
        <nav ref={containerRef} className="flex-1 overflow-y-auto toc-sidebar p-4 space-y-1">
            {tocItems.map((item, index) => (
                <button
                    key={`${item.id}-${index}`}
                    data-toc-id={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`toc-item ${item.level === 1 ? 'toc-item-h1' : item.level === 2 ? 'toc-item-h2' : 'toc-item-h3'} ${
                        activeTocId === item.id ? `active ${tocActiveColor}` : tocItemColor
                    } w-full text-left`}
                >
                    {item.text}
                </button>
            ))}
        </nav>
    )

    return (
        <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-300`}>
            {/* 頂部導航欄 */}
            <header className={`sticky top-0 z-50 ${currentTheme.headerBg} backdrop-blur-md border-b ${currentTheme.border} transition-opacity duration-500 ${isUiVisible || showMobileToc ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link
                        to="/"
                        className={`flex items-center gap-2 ${currentTheme.textMuted} hover:text-gold-400 transition-colors`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="hidden sm:inline">返回</span>
                    </Link>

                    <h1 className={`text-lg font-semibold ${currentTheme.heading}`}>富老板 · 窮老板</h1>

                    {/* 移動端目錄按鈕 */}
                    <button
                        onClick={() => setShowMobileToc(true)}
                        className={`md:hidden flex items-center gap-2 ${currentTheme.textMuted} hover:text-gold-400 transition-colors`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* 主體佈局容器 */}
            <div className="flex">
                {/* 桌面端固定目錄側邊欄 */}
                <aside className={`hidden md:flex md:flex-col md:w-72 lg:w-80 fixed left-0 top-[57px] bottom-0 ${currentTheme.sidebarBg} border-r ${currentTheme.border} z-30 transition-opacity duration-500 ${isUiVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className={`p-4 border-b ${currentTheme.border}`}>
                        <h2 className={`text-lg font-semibold ${currentTheme.heading} ${
                            theme !== 'dark' ? 'text-gray-800' : ''
                        }`}>📚 目錄</h2>
                    </div>
                    <TocContent containerRef={tocDesktopRef} />
                </aside>

                {/* 主內容區域 - 居中顯示 */}
                <main className="flex-1 md:ml-72 lg:ml-80 px-2 sm:px-6 py-4 sm:py-12 pb-32">
                    {/* 內容容器 - 居中，最大宽度800px */}
                    <div
                        className="max-w-[1000px] mx-auto rounded-xl sm:rounded-2xl px-5 sm:px-12 py-6 sm:py-10"
                        style={{ background: currentTheme.contentBg }}
                    >
                        {/* 加載狀態 */}
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-32"
                            >
                                <div className="relative w-16 h-16">
                                    <div className="absolute inset-0 border-4 border-royal-purple-600/30 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-transparent border-t-gold-400 rounded-full animate-spin" />
                                </div>
                                <p className={`mt-6 ${currentTheme.textMuted} text-lg`}>正在加載書籍內容...</p>
                            </motion.div>
                        )}

                        {/* 錯誤狀態 */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-32"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-900/20 rounded-full mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-red-400 mb-3">加載失敗</h2>
                                <p className={`${currentTheme.textMuted} mb-6`}>{error}</p>
                                <button onClick={() => window.location.reload()} className="btn-primary">
                                    重試
                                </button>
                            </motion.div>
                        )}

                        {/* 內容渲染 */}
                        {!isLoading && !error && content && (
                            <>
                                <EBookNarrator theme={theme} currentTheme={currentTheme} />
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className={`prose max-w-none ereader-content ${theme === 'dark' ? 'prose-invert' : ''} text-lg leading-loose`}
                                    onContextMenu={(e) => e.preventDefault()}
                                    style={{
                                        fontSize: `${fontSize}px`,
                                        lineHeight: '1.75',
                                        fontFamily: '"Georgia", "Merriweather", -apple-system, "PingFang SC", sans-serif',
                                        // 根据主题动态设置颜色，避免切换主题时文字看不清
                                        color: theme === 'dark' ? '#e5e5e5' : theme === 'light' ? '#111111' : '#1B5E20',
                                        // 禁止文字选中，保护内容不被一键复制
                                        userSelect: 'none',
                                        WebkitUserSelect: 'none',
                                    }}
                                >
                                    {/* Force Inherit 樣式 - 讓子元素繼承字體大小和顏色，消除缩进并增加段间距 */}
                                    <style>{`
                                        .ereader-content p,
                                        .ereader-content li,
                                        .ereader-content blockquote,
                                        .ereader-content span {
                                            font-size: inherit !important;
                                            line-height: inherit !important;
                                            color: inherit !important;
                                            letter-spacing: 0.02em;
                                        }
                                        .ereader-content p {
                                            text-indent: 0 !important;
                                            text-align: justify;
                                            margin-bottom: 2em !important;
                                        }
                                        /* 禁止全文选中与复制 */
                                        .ereader-content {
                                            -webkit-user-select: none !important;
                                            -moz-user-select: none !important;
                                            -ms-user-select: none !important;
                                            user-select: none !important;
                                        }
                                    `}</style>

                                    {/* 淺色/護眼模式：金色標題添加黑色陰影增強對比度 */}
                                    {theme !== 'dark' && (
                                        <style>{`
                                            .ereader-content h1,
                                            .ereader-content h2,
                                            .ereader-content h3,
                                            .ereader-content strong {
                                                text-shadow: 
                                                    1px 1px 2px rgba(0, 0, 0, 0.9),
                                                    -1px -1px 0 rgba(0, 0, 0, 0.3),
                                                    0 0 8px rgba(0, 0, 0, 0.3) !important;
                                            }
                                        `}</style>
                                    )}
                                    {renderedMarkdown}
                                </motion.article>

                                {/* 未解锁状态：显示邀请码表单 */}
                                {!isUnlocked && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="mt-12"
                                    >
                                        <InviteCodeForm onSuccess={handleUnlockSuccess} />
                                    </motion.div>
                                )}
                            </>
                        )}

                        {/* 底部留白和返回頂部 - 仅在解锁后显示 */}
                        {!isLoading && !error && content && isUnlocked && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className={`mt-20 pt-10 border-t ${currentTheme.border} text-center`}
                            >
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className={`inline-flex items-center gap-2 px-6 py-3 ${currentTheme.cardBg} hover:bg-royal-purple-900/50 
                                               border ${currentTheme.border} hover:border-royal-purple-600/50 
                                               rounded-xl ${currentTheme.textMuted} hover:text-gold-400 transition-all`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    返回頂部
                                </button>

                                <p className={`mt-8 ${currentTheme.textMuted} text-sm`}>
                                    感謝閱讀 · © 2026 RichBoss Reader
                                </p>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>

            {/* 移動端目錄抽屜 */}
            <AnimatePresence>
                {showMobileToc && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                            onClick={() => setShowMobileToc(false)}
                        />

                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className={`md:hidden fixed left-0 top-0 bottom-0 w-[85vw] max-w-80 ${currentTheme.sidebarBg} border-r ${currentTheme.border} z-[70] flex flex-col`}
                        >
                            <div className={`p-4 border-b ${currentTheme.border} flex items-center justify-between ${currentTheme.headerBg}`}>
                                <h2 className="text-lg font-semibold text-gold-400">📚 目錄</h2>
                                <button
                                    onClick={() => setShowMobileToc(false)}
                                    className={`${currentTheme.textMuted} hover:text-white transition-colors p-1`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <TocContent containerRef={tocMobileRef} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* 繼續閱讀按鈕 */}
            <AnimatePresence>
                {hasReadingProgress && !isLoading && (
                    <motion.button
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        onClick={handleContinueReading}
                        className="continue-reading-btn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        繼續閱讀
                    </motion.button>
                )}
            </AnimatePresence>

            {/* 閱讀進度條 - 固定在底部工具欄上方 */}
            {!isLoading && !error && content && (
                <div className={`fixed bottom-[60px] left-0 right-0 z-50 h-1 bg-gray-800/50 transition-opacity duration-500 ${isUiVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div
                        className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-150 ease-out"
                        style={{ width: `${readProgress}%` }}
                    />
                </div>
            )}

            {/* 底部導航工具欄 */}
            {!isLoading && !error && content && (
                <div className={`reader-toolbar ${theme !== 'dark' ? 'bg-white/95 border-gray-200' : ''} transition-opacity duration-500 ${isUiVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 md:gap-4">
                        {/* 移動端目錄按鈕 */}
                        <button
                            onClick={() => setShowMobileToc(true)}
                            className="md:hidden toolbar-btn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </button>

                        {/* 上一章 */}
                        <button
                            onClick={() => navigateChapter('prev')}
                            disabled={currentChapterIndex <= 0}
                            className="toolbar-btn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="hidden sm:inline">上一章</span>
                        </button>

                        {/* 外觀設置區：字體大小 + 主題切換 */}
                        <div className="flex items-center gap-2 md:gap-3">
                            {/* 字體大小調節 */}
                            <button onClick={() => adjustFontSize(-2)} className="font-size-btn">
                                A-
                            </button>
                            <span className={`${currentTheme.textMuted} text-xs md:text-sm w-8 md:w-10 text-center`}>{fontSize}px</span>
                            <button onClick={() => adjustFontSize(2)} className="font-size-btn">
                                A+
                            </button>

                            {/* 分隔線 */}
                            <div className="w-px h-6 bg-gray-600/50" />

                            {/* 主題切換按鈕 */}
                            <button
                                onClick={cycleTheme}
                                className="toolbar-btn text-lg"
                                title={`切換主題 (${theme === 'dark' ? '深色' : theme === 'light' ? '淺色' : '護眼'})`}
                            >
                                {getThemeIcon()}
                            </button>
                        </div>

                        {/* 下一章 */}
                        <button
                            onClick={() => navigateChapter('next')}
                            disabled={currentChapterIndex >= tocItems.length - 1}
                            className="toolbar-btn"
                        >
                            <span className="hidden sm:inline">下一章</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Reader
