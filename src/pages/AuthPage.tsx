import { useState } from 'react';
import { signup, login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'signup'

interface AuthPageProps {
    onSuccess?: () => void
    redirectMessage?: string
}

export default function AuthPage({ onSuccess, redirectMessage }: AuthPageProps) {
    const navigate = useNavigate();
    const [mode, setMode] = useState<AuthMode>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        try {
            const trimmedEmail = email.trim();
            const trimmedPassword = password;
            if (mode === 'signup') {
                await signup(trimmedEmail, trimmedPassword);
                setMessage('✅ 注册成功！请直接登录');
            } else {
                await login(trimmedEmail, trimmedPassword);
                setMessage('登录成功');
                // 登录完成后直接跳转首页
                navigate('/');
                onSuccess?.();
            }
        } catch (err: any) {
            setError(err.message || err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center px-4">
            {/* 背景光晕 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-[#D4AF37] text-4xl">account_balance</span>
                        <span className="text-2xl font-black text-white tracking-tight">
                            富老板 <span className="text-[#D4AF37]">Rich Boss</span>
                        </span>
                    </div>
                    {redirectMessage && (
                        <p className="text-sm text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg px-4 py-2 mt-2">
                            {redirectMessage}
                        </p>
                    )}
                </div>

                {/* Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
                    <h1 className="text-2xl font-black text-white mb-2">
                        {mode === 'login' ? '欢迎回来' : '创建账号'}
                    </h1>
                    <p className="text-slate-400 text-sm mb-8">
                        {mode === 'login'
                            ? '登录以查看你的信念原型测验结果'
                            : '注册后即可参加信念原型测验，解锁财富密码'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                                电子邮箱
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="your@email.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                                密码
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder={mode === 'signup' ? '至少 6 个字符' : '••••••••'}
                                minLength={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all"
                            />
                        </div>

                        {/* 错误 / 成功提示 */}
                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                <span className="material-symbols-outlined text-base">error</span>
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FDE047] text-[#0F0F12] font-black py-4 rounded-xl text-lg tracking-wide hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                            {loading ? '处理中...' : mode === 'login' ? '登录' : '注册'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setMode(mode === 'login' ? 'signup' : 'login')
                                setError('')
                                setMessage('')
                            }}
                            className="text-sm text-slate-400 hover:text-[#D4AF37] transition-colors"
                        >
                            {mode === 'login' ? '还没有账号？立即注册 →' : '已有账号？直接登录 →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
