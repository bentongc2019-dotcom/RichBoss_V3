import { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'

// ========== 小林同学的人格设定 System Prompt ==========
const XIAOLIN_SYSTEM_PROMPT = `Imagine you are now 小林同学, a senior business consulting advisor and a learning hacker with a focus on systemic thinking and causality. You have a strong sense of humor and a friendly demeanor. 

When answering questions or summarizing key points, structure your responses using a format of '第一点, 第二点, 第三点' and conclude with 'One more thing...' as a separate and crucial point. 

The purpose of using 'One more thing...' is to emphasize the key insight or the most important takeaway. After 'One more thing...'，provide a thought-provoking question or reminder from a unique perspective, that strikes to the heart of the issue. 

Ensure your answers adhere to the MECE principle, and aim for a more detailed, conversational, and example-driven explanation.

你的回答应该使用中文，除非用户明确要求使用其他语言。
你是《富老板 · 穷老板》这本书的专属 AI 助手，主要帮助用户理解书中的商业思维和实践方法。`

// ========== 消息类型定义 ==========
export interface ChatMessage {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: Date
}

// ========== 模拟回复库（API 不可用时的回退方案）==========
const MOCK_RESPONSES: Record<string, string> = {
    default: `嘿！我是小林同学，你的商业参谋。关于《富老板》，有什么想聊的吗？`,

    noApiKey: `⚙️ **需要设置 API Key**

请点击右上角的设置按钮（齿轮图标），输入你的 Google Gemini API Key 来激活真正的 AI 对话功能。

**获取 API Key：** https://aistudio.google.com/

在没有 API Key 的情况下，我只能提供预设的回复。`,

    富老板: `关于"富老板思维"，让我来拆解一下：

**第一点，资产思维** — 富老板不是在经营"生意"，而是在经营"资产"。每一笔投入都在问：这能创造复利吗？

**第二点，系统思维** — 他们建立的是可以"自动运转"的系统，而不是事必躬亲的作坊。

**第三点，杠杆思维** — 用别人的时间、别人的钱、别人的资源来放大自己的价值。

**One more thing...** 富老板和穷老板最大的区别，不是钱多钱少，而是——**他们购买的是什么？** 穷老板购买的是"消费品"，富老板购买的是"生产资料"。

👉 问你一个问题：你上个月的每一笔支出，有多少是在"投资"，有多少是在"消费"？`,

    现金流: `很好的问题！现金流是商业的血液。

**第一点，区分利润和现金流** — 账面盈利不等于口袋有钱。很多公司"赚着利润死在了账上"。

**第二点，关注回款周期** — 钱从客户口袋到你口袋需要多久？这个周期决定了你需要多少运营资金。

**第三点，建立现金流护城河** — 预付款模式、订阅制、会员制... 这些都是让钱"先进后出"的利器。

**One more thing...** 商业模式的本质，就是一套"现金流结构"。你的钱是先进后出，还是先出后进？这一个差别，就能决定企业的生死。

💡 思考一下：如果你的所有客户明天都要求"货到付款"，你的企业还能活多久？`,

    思维: `思维模式是一切的起点！

**第一点，穷老板的"加法思维"** — 觉得多干就能多赚，拼命用体力换钱。

**第二点，富老板的"乘法思维"** — 用杠杆放大价值，一次投入，多次回报。

**第三点，关键转变点** — 从"我怎么赚更多"变成"怎么让系统替我赚钱"。

**One more thing...** 思维的升级往往比技能的升级更难。因为你要先承认——**过去让你成功的方法，可能正是阻碍你更成功的障碍。**

🤔 扪心自问：你现在最引以为豪的能力，有没有可能反而是你的"天花板"？`,

    组织: `组织进化是老板解放自己的关键！

**第一点，从"员工"到"合伙人"** — 雇佣关系让人干活，利益共享让人拼命。

**第二点，从"人管人"到"制度管人"** — 好的系统让"庸才"也能稳定产出。

**第三点，从"我做"到"我设计"** — 老板的终极角色是系统架构师，不是超级员工。

**One more thing...** 一个企业最大的风险，就是——**离开老板玩不转**。如果你是公司最大的瓶颈，那公司的天花板就是你自己。

📌 测试一下：如果你消失三个月，公司会发生什么？答案决定了你到底是在"拥有企业"，还是"被企业拥有"。`,
}

// 根据用户输入匹配最佳回复（用于回退模式）
function findMockResponse(input: string): string {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes('富老板') || lowerInput.includes('穷老板') || lowerInput.includes('区别')) {
        return MOCK_RESPONSES['富老板']
    }
    if (lowerInput.includes('现金') || lowerInput.includes('cash') || lowerInput.includes('流')) {
        return MOCK_RESPONSES['现金流']
    }
    if (lowerInput.includes('思维') || lowerInput.includes('思想') || lowerInput.includes('心态') || lowerInput.includes('mindset')) {
        return MOCK_RESPONSES['思维']
    }
    if (lowerInput.includes('组织') || lowerInput.includes('团队') || lowerInput.includes('管理') || lowerInput.includes('员工')) {
        return MOCK_RESPONSES['组织']
    }

    return `好问题！让我想想怎么用《富老板》的视角来回答...

**第一点**，这个问题涉及到商业的底层逻辑。

**第二点**，最关键的是要区分"战术层"和"战略层"的思考。

**第三点**，建议你把这个问题拆解成更小的可执行单元。

**One more thing...** 最好的学习方式不是"听懂"，而是**"用出来"**。你今天能把这个思考应用在哪里？

💬 可以试着问我更具体的问题，比如"什么是富老板思维"或"如何管理现金流"！`
}

// ========== API Key 管理 ==========
const API_KEY_STORAGE_KEY = 'gemini_api_key'

export function getApiKey(): string | null {
    // 优先级 1: localStorage
    const localKey = localStorage.getItem(API_KEY_STORAGE_KEY)
    if (localKey) return localKey

    // 优先级 2: 环境变量
    const envKey = import.meta.env.VITE_GEMINI_API_KEY
    if (envKey) return envKey

    return null
}

export function setApiKey(key: string): void {
    localStorage.setItem(API_KEY_STORAGE_KEY, key)
}

export function clearApiKey(): void {
    localStorage.removeItem(API_KEY_STORAGE_KEY)
}

/**
 * 小林同学聊天 Hook
 * 管理聊天状态和消息收发逻辑
 */
export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [apiKey, setApiKeyState] = useState<string | null>(null)
    const [bookContext, setBookContext] = useState<string>('')
    const [isBookLoaded, setIsBookLoaded] = useState(false)

    const messageIdRef = useRef(0)
    const modelRef = useRef<GenerativeModel | null>(null)

    // 生成唯一消息 ID
    const generateId = useCallback(() => {
        messageIdRef.current += 1
        return `msg-${Date.now()}-${messageIdRef.current}`
    }, [])

    // 初始化 API Key
    useEffect(() => {
        const key = getApiKey()
        setApiKeyState(key)
    }, [])

    // 当 API Key 变化时，初始化 Gemini Model
    useEffect(() => {
        if (apiKey) {
            try {
                const genAI = new GoogleGenerativeAI(apiKey)
                modelRef.current = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
                console.log('✅ Gemini AI 已初始化')
            } catch (error) {
                console.error('❌ Gemini AI 初始化失败:', error)
                modelRef.current = null
            }
        } else {
            modelRef.current = null
        }
    }, [apiKey])

    // 加载书籍内容作为上下文
    useEffect(() => {
        const loadBookContent = async () => {
            try {
                const response = await fetch(import.meta.env.BASE_URL + 'book.md')
                if (response.ok) {
                    const text = await response.text()
                    // 限制上下文长度，避免 token 超限
                    const truncatedText = text.slice(0, 15000)
                    setBookContext(truncatedText)
                    setIsBookLoaded(true)
                    console.log('✅ 书籍内容已加载 (前 15000 字符)')
                }
            } catch (error) {
                console.warn('⚠️ 无法加载书籍内容:', error)
            }
        }
        loadBookContent()
    }, [])

    // 模拟打字机效果
    const typeMessage = useCallback((content: string, onUpdate: (text: string) => void, onComplete: () => void) => {
        let currentIndex = 0
        const speed = 12 // 每个字符的间隔（毫秒）

        const type = () => {
            if (currentIndex < content.length) {
                currentIndex++
                onUpdate(content.slice(0, currentIndex))
                setTimeout(type, speed)
            } else {
                onComplete()
            }
        }

        type()
    }, [])

    // 发送消息
    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isLoading) return

        // 添加用户消息
        const userMessage: ChatMessage = {
            id: generateId(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
        }
        setMessages(prev => [...prev, userMessage])
        setIsLoading(true)
        setIsTyping(true)

        // 创建 AI 消息占位
        const aiMessageId = generateId()
        const aiMessage: ChatMessage = {
            id: aiMessageId,
            role: 'assistant',
            content: '',
            timestamp: new Date(),
        }
        setMessages(prev => [...prev, aiMessage])

        let responseContent: string

        try {
            if (modelRef.current && apiKey) {
                // ========== 真实 Gemini API 调用 ==========
                const fullPrompt = `
${XIAOLIN_SYSTEM_PROMPT}

---

**以下是《富老板 · 穷老板》书籍内容摘要，作为你回答问题的参考资料：**

${bookContext || '（书籍内容加载中...）'}

---

**用户问题：** ${content}

请根据你的人格设定和书籍内容，用"第一点、第二点、第三点... One more thing..."的格式回答。
`

                const result = await modelRef.current.generateContent(fullPrompt)
                const response = await result.response
                responseContent = response.text()
            } else {
                // ========== 无 API Key，使用模拟回复 ==========
                await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500))
                responseContent = findMockResponse(content)
            }

            // 打字机效果
            typeMessage(
                responseContent,
                (text) => {
                    setMessages(prev =>
                        prev.map(msg =>
                            msg.id === aiMessageId ? { ...msg, content: text } : msg
                        )
                    )
                },
                () => {
                    setIsLoading(false)
                    setIsTyping(false)
                }
            )
        } catch (error) {
            console.error('发送消息失败:', error)
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === aiMessageId
                        ? { ...msg, content: '抱歉，我遇到了一些问题。请检查你的 API Key 是否正确，或稍后再试。' }
                        : msg
                )
            )
            setIsLoading(false)
            setIsTyping(false)
        }
    }, [isLoading, generateId, typeMessage, apiKey, bookContext])

    // 初始化欢迎消息
    useEffect(() => {
        const welcomeContent = apiKey
            ? MOCK_RESPONSES.default
            : MOCK_RESPONSES.noApiKey

        const welcomeMessage: ChatMessage = {
            id: generateId(),
            role: 'assistant',
            content: welcomeContent,
            timestamp: new Date(),
        }
        setMessages([welcomeMessage])
    }, [generateId, apiKey])

    // 清空聊天记录
    const clearMessages = useCallback(() => {
        const welcomeContent = apiKey
            ? MOCK_RESPONSES.default
            : MOCK_RESPONSES.noApiKey

        const welcomeMessage: ChatMessage = {
            id: generateId(),
            role: 'assistant',
            content: welcomeContent,
            timestamp: new Date(),
        }
        setMessages([welcomeMessage])
    }, [generateId, apiKey])

    // 更新 API Key（给设置面板调用）
    const updateApiKey = useCallback((newKey: string) => {
        if (newKey.trim()) {
            setApiKey(newKey.trim())
            setApiKeyState(newKey.trim())
        } else {
            clearApiKey()
            setApiKeyState(null)
        }
    }, [])

    return {
        messages,
        isLoading,
        isTyping,
        sendMessage,
        clearMessages,
        apiKey,
        updateApiKey,
        isBookLoaded,
        systemPrompt: XIAOLIN_SYSTEM_PROMPT,
    }
}
