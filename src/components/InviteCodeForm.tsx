import { useState, FormEvent } from 'react'
import { validateInviteCode } from '../utils/inviteCodeValidator'

interface InviteCodeFormProps {
    onSuccess: () => void
}

/**
 * 邀请码输入表单组件
 * 深紫奢华风格，金色边框和渐变按钮
 */
function InviteCodeForm({ onSuccess }: InviteCodeFormProps) {
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // 处理表单提交
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // 模拟验证延迟，增强用户体验
        await new Promise(resolve => setTimeout(resolve, 500))

        const result = validateInviteCode(code)
        setIsLoading(false)

        if (result.valid) {
            onSuccess()
        } else {
            setError(result.message)
        }
    }

    return (
        <div
            className="w-full max-w-[480px] mx-auto my-12 p-8 rounded-2xl"
            style={{
                background: 'linear-gradient(135deg, #4A148C 0%, #6A1B9A 100%)',
                border: '2px solid #FFD700',
                boxShadow: '0 8px 32px rgba(106, 27, 154, 0.4), 0 0 20px rgba(255, 215, 0, 0.2)'
            }}
        >
            {/* 标题 */}
            <div className="text-center mb-8">
                <h3
                    className="text-2xl font-bold mb-2"
                    style={{
                        background: 'linear-gradient(90deg, #FFD700 0%, #FFA000 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                >
                    🔐 解锁全文阅读
                </h3>
                <p className="text-white/70 text-sm">
                    输入邀请码，畅享完整内容
                </p>
            </div>

            {/* 表单 */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 输入框 */}
                <div>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="输入邀请码"
                        disabled={isLoading}
                        className="w-full px-4 py-4 rounded-xl text-white text-center text-lg
                                   placeholder-white/50 outline-none transition-all duration-300
                                   focus:ring-2 focus:ring-gold-400/50"
                        style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid #FFD700',
                        }}
                    />
                </div>

                {/* 错误提示 */}
                {error && (
                    <div
                        className="text-center py-2 px-4 rounded-lg text-sm"
                        style={{
                            background: 'rgba(220, 38, 38, 0.2)',
                            color: '#ef4444',
                            border: '1px solid rgba(220, 38, 38, 0.3)'
                        }}
                    >
                        ⚠️ {error}
                    </div>
                )}

                {/* 提交按钮 */}
                <button
                    type="submit"
                    disabled={isLoading || !code.trim()}
                    className="w-full py-4 rounded-xl text-lg font-bold text-black
                               transition-all duration-300 transform hover:scale-[1.02]
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                        background: 'linear-gradient(90deg, #FFD700 0%, #FFA000 100%)',
                        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
                    }}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            验证中...
                        </span>
                    ) : (
                        '🔓 解锁阅读'
                    )}
                </button>
            </form>

            {/* 底部提示 */}
            <p
                className="text-center mt-6 text-sm"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
                💡 邀请码仅限当前设备使用
            </p>
        </div>
    )
}

export default InviteCodeForm
