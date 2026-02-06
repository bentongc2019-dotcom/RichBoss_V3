import { useState, useRef, useEffect, FormEvent, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat, ChatMessage } from '../hooks/useChat'

/**
 * 小林同学 - AI 聊天浮窗组件
 * 固定在右下角的浮动聊天机器人
 * 支持自动缩到边缘，不影响阅读
 */
export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [showSettings, setShowSettings] = useState(false)
    const [apiKeyInput, setApiKeyInput] = useState('')
    const [saveMessage, setSaveMessage] = useState('')

    // 自动隐藏到边缘的状态
    const [isMinimized, setIsMinimized] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const {
        messages,
        isLoading,
        isTyping,
        sendMessage,
        clearMessages,
        apiKey,
        updateApiKey,
        isBookLoaded
    } = useChat()

    // 自动隐藏逻辑：鼠标离开 2 秒后缩到边边
    const startHideTimer = useCallback(() => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current)
        }
        hideTimerRef.current = setTimeout(() => {
            if (!isOpen && !isHovering) {
                setIsMinimized(true)
            }
        }, 2000)
    }, [isOpen, isHovering])

    const cancelHideTimer = useCallback(() => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current)
            hideTimerRef.current = null
        }
    }, [])

    // 鼠标进入时展开
    const handleMouseEnter = () => {
        setIsHovering(true)
        setIsMinimized(false)
        cancelHideTimer()
    }

    // 鼠标离开时启动隐藏计时器
    const handleMouseLeave = () => {
        setIsHovering(false)
        if (!isOpen) {
            startHideTimer()
        }
    }

    // 聊天窗口关闭时启动隐藏计时器
    useEffect(() => {
        if (!isOpen) {
            startHideTimer()
        } else {
            cancelHideTimer()
            setIsMinimized(false)
        }
        return () => cancelHideTimer()
    }, [isOpen, startHideTimer, cancelHideTimer])

    // 自动滚动到最新消息
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isTyping])

    // 打开时自动聚焦输入框
    useEffect(() => {
        if (isOpen && inputRef.current && !showSettings) {
            setTimeout(() => inputRef.current?.focus(), 300)
        }
    }, [isOpen, showSettings])

    // 初始化 API Key 输入框
    useEffect(() => {
        if (showSettings && apiKey) {
            // 显示部分隐藏的密钥
            setApiKeyInput(apiKey.slice(0, 10) + '...' + apiKey.slice(-4))
        } else if (showSettings) {
            setApiKeyInput('')
        }
    }, [showSettings, apiKey])

    // 发送消息
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (inputValue.trim() && !isLoading) {
            sendMessage(inputValue)
            setInputValue('')
        }
    }

    // 保存 API Key
    const handleSaveApiKey = () => {
        if (apiKeyInput && !apiKeyInput.includes('...')) {
            updateApiKey(apiKeyInput)
            setSaveMessage('✅ API Key 已保存！')
            setTimeout(() => {
                setSaveMessage('')
                setShowSettings(false)
            }, 1500)
        } else if (!apiKeyInput) {
            updateApiKey('')
            setSaveMessage('🗑️ API Key 已清除')
            setTimeout(() => setSaveMessage(''), 1500)
        }
    }

    // 快捷问题
    const quickQuestions = [
        '什么是富老板思维？',
        '如何管理现金流？',
        '组织如何进化？',
    ]

    // 渲染消息内容（支持简单 Markdown 加粗）
    const renderMessageContent = (content: string) => {
        // 将 **text** 转换为 <strong>text</strong>
        const parts = content.split(/(\*\*[^*]+\*\*)/g)
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={index} className="text-gold-400 font-semibold">
                        {part.slice(2, -2)}
                    </strong>
                )
            }
            return <span key={index}>{part}</span>
        })
    }

    return (
        <>
            {/* ========== 浮动按钮 (支持自动隐藏到边缘) ========== */}
            <motion.button
                initial={{ scale: 0, opacity: 0, x: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    x: isMinimized ? 40 : 0  // 缩到边边时只露出一半
                }}
                transition={{
                    delay: isMinimized ? 0 : 1,
                    type: 'spring',
                    stiffness: 200,
                    damping: 20
                }}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full 
                    bg-gradient-to-br from-royal-purple-600 to-royal-purple-800
                    shadow-xl shadow-royal-purple-900/50
                    flex items-center justify-center
                    transition-colors duration-300 hover:scale-110
                    ${isOpen ? 'ring-2 ring-gold-400/50' : ''}
                    ${isMinimized ? 'opacity-70' : ''}
                    group overflow-hidden cursor-pointer`}
                aria-label="打开小林同学聊天"
            >
                {/* 头像 */}
                <img
                    src="/images/xiaolin.png"
                    alt="小林同学"
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold-400/30 group-hover:border-gold-400/60 transition-colors"
                />

                {/* 通知徽章 */}
                {!isOpen && !isMinimized && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-gold-400 rounded-full 
                        animate-pulse border-2 border-gray-900" />
                )}

                {/* 关闭图标 */}
                {isOpen && (
                    <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                )}
            </motion.button>

            {/* ========== 聊天窗口 ========== */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]
                            rounded-2xl overflow-hidden
                            bg-gray-900/95 backdrop-blur-xl
                            border border-royal-purple-600/30
                            shadow-2xl shadow-royal-purple-900/50
                            flex flex-col"
                        style={{ maxHeight: 'calc(100vh - 200px)' }}
                    >
                        {/* 头部 */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-royal-purple-800 to-royal-purple-900 border-b border-royal-purple-600/30">
                            <img
                                src="/images/xiaolin.png"
                                alt="小林同学"
                                className="w-10 h-10 rounded-full border-2 border-gold-400/50"
                            />
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-sm">小林同学</h3>
                                <p className="text-gold-400/70 text-xs flex items-center gap-1">
                                    {apiKey ? (
                                        <>
                                            <span className="w-2 h-2 bg-green-400 rounded-full" />
                                            AI 已激活 {isBookLoaded && '· 书籍已加载'}
                                        </>
                                    ) : (
                                        <>
                                            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                                            模拟模式
                                        </>
                                    )}
                                </p>
                            </div>

                            {/* 设置按钮 */}
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className={`p-2 rounded-lg transition-colors ${showSettings
                                    ? 'bg-gold-400/20 text-gold-400'
                                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                                title="设置 API Key"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>

                            {/* 清空按钮 */}
                            <button
                                onClick={clearMessages}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                title="清空聊天"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>

                        {/* ========== 设置面板 ========== */}
                        <AnimatePresence>
                            {showSettings && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 165, opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-3 bg-gray-800/50 border-b border-gray-700/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white font-semibold text-sm">🔑 API Key</span>
                                            <a
                                                href="https://aistudio.google.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gold-400 text-xs hover:underline"
                                            >
                                                获取 →
                                            </a>
                                        </div>
                                        <input
                                            type="password"
                                            value={apiKeyInput}
                                            onChange={(e) => setApiKeyInput(e.target.value)}
                                            placeholder="粘贴你的 Gemini API Key..."
                                            className="w-full bg-gray-900/80 border border-gray-700/50 rounded-lg px-3 py-2
                                                text-sm text-white placeholder-gray-500 mb-2
                                                focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/30"
                                        />
                                        <button
                                            onClick={handleSaveApiKey}
                                            className="w-full px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-500 
                                                text-gray-900 font-semibold rounded-lg text-sm
                                                hover:from-gold-300 hover:to-gold-400 transition-all"
                                        >
                                            💾 保存 API Key
                                        </button>
                                        {saveMessage && (
                                            <p className="text-xs text-gold-400 mt-1">{saveMessage}</p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 消息列表 */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
                            {messages.map((message: ChatMessage) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                                            ${message.role === 'user'
                                                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-gray-900 rounded-br-md'
                                                : 'bg-gray-800/80 text-gray-200 rounded-bl-md border border-gray-700/50'
                                            }`}
                                    >
                                        {renderMessageContent(message.content)}
                                    </div>
                                </div>
                            ))}

                            {/* 打字指示器 */}
                            {isTyping && messages[messages.length - 1]?.content === '' && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800/80 rounded-2xl rounded-bl-md px-4 py-3 border border-gray-700/50">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* 快捷问题 */}
                        {messages.length <= 1 && apiKey && (
                            <div className="px-4 pb-2">
                                <p className="text-xs text-gray-500 mb-2">快捷问题：</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickQuestions.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => sendMessage(q)}
                                            disabled={isLoading}
                                            className="px-3 py-1.5 text-xs bg-gray-800/60 text-gray-300 
                                                rounded-full border border-gray-700/50
                                                hover:border-gold-400/50 hover:text-gold-400
                                                transition-colors disabled:opacity-50"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 输入框 */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={apiKey ? "问我关于《富老板》的问题..." : "请先设置 API Key..."}
                                    disabled={isLoading}
                                    className="flex-1 bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5
                                        text-sm text-white placeholder-gray-500
                                        focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/30
                                        disabled:opacity-50 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="px-4 py-2.5 bg-gradient-to-r from-gold-400 to-gold-500 
                                        text-gray-900 font-semibold rounded-xl
                                        hover:from-gold-300 hover:to-gold-400
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        transition-all duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
