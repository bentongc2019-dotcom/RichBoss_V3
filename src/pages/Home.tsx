import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// SVG 图标组件 - 替代 lucide-react
const BrainIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V4m0 4a4 4 0 100 8 4 4 0 000-8zm-4 4a4 4 0 11-4 0m8 0a4 4 0 114 0M9 12a3 3 0 00-3 3m12-3a3 3 0 013 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.5 1.5m-11-1.5L8 16m11-1.5V19a2 2 0 01-2 2H7a2 2 0 01-2-2v-4.5" />
    </svg>
)

const TrendingUpIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
)

// 概念卡片数据
const conceptCards = [
    {
        icon: BrainIcon,
        title: '信念原型',
        subtitle: 'Mindset',
        description: '重塑底层金钱逻辑，打破穷老板的思维囚笼。',
    },
    {
        icon: TrendingUpIcon,
        title: '财富流向',
        subtitle: 'Cashflow',
        description: '从经营生意到经营资产，掌握企业现金流的秘密。',
    },
    {
        icon: UsersIcon,
        title: '组织进化',
        subtitle: 'Organization',
        description: '打造自动运转的系统，让老板从日常管理中解脱。',
    },
]

/**
 * 首页组件
 * 展示书籍封面、核心概念卡片和 CTA 按钮
 */
function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-royal-purple-950 relative overflow-hidden">
            {/* 背景装饰 - 渐变光晕 */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-royal-purple-500/15 rounded-full blur-3xl" />

            {/* ========== HERO SECTION ========== */}
            <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    {/* 书籍封面 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mb-10"
                    >
                        <div className="relative inline-block">
                            {/* 封面光晕效果 */}
                            <div className="absolute inset-0 bg-gradient-to-r from-royal-purple-600/50 to-gold-400/50 blur-2xl rounded-2xl transform scale-110" />

                            {/* 封面图片 */}
                            <img
                                src="/images/cover.jpg"
                                alt="《富老板，穷老板》书籍封面"
                                className="relative w-64 md:w-80 h-auto rounded-2xl shadow-2xl shadow-royal-purple-900/50 border border-gray-700/50"
                            />
                        </div>
                    </motion.div>

                    {/* 标题区域 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="text-gradient-gold">富老板</span>
                            <span className="text-gray-400 mx-3">·</span>
                            <span className="text-gray-200">穷老板</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                            一本改变你财富思维的书籍<br className="hidden md:block" />
                            为每一位渴望成功的老板量身打造
                        </p>
                    </motion.div>

                    {/* CTA 按钮区域 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        {/* 主 CTA - 开始阅读 */}
                        <Link
                            to="/reader"
                            className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold-400 to-gold-500 
                           text-gray-900 font-bold text-lg rounded-2xl
                           transition-all duration-300 ease-out
                           hover:from-gold-300 hover:to-gold-400 
                           hover:shadow-2xl hover:shadow-gold-400/40 hover:scale-105
                           active:scale-95 animate-pulse-gold"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                            开始阅读
                        </Link>
                    </motion.div>

                    {/* 向下滚动提示 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-16"
                    >
                        <div className="flex flex-col items-center text-gray-500 animate-bounce">
                            <span className="text-sm mb-2">探索核心理念</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ========== 3 CORE PILLARS SECTION ========== */}
            <section className="relative z-10 py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* 区块标题 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-gradient-gold">三大核心支柱</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            掌握这三个关键维度，从穷老板蜕变为富老板
                        </p>
                    </motion.div>

                    {/* 概念卡片网格 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {conceptCards.map((card, index) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                {/* 卡片本体 - Dark Glassmorphism */}
                                <div className="relative p-8 rounded-2xl 
                                    bg-gray-900/60 backdrop-blur-xl
                                    border border-gold-400/20
                                    transition-all duration-500 ease-out
                                    hover:border-gold-400/50
                                    hover:shadow-2xl hover:shadow-gold-400/10
                                    hover:bg-gray-900/80
                                    hover:-translate-y-2"
                                >
                                    {/* 悬浮光晕效果 */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* 图标 */}
                                    <div className="relative mb-6">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-500/10 
                                            flex items-center justify-center
                                            group-hover:from-gold-400/30 group-hover:to-gold-500/20 
                                            transition-all duration-300"
                                        >
                                            <card.icon className="w-7 h-7 text-gold-400" />
                                        </div>
                                    </div>

                                    {/* 标题 */}
                                    <h3 className="relative text-xl font-bold text-white mb-1 group-hover:text-gold-300 transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="relative text-sm text-gold-500/70 mb-4 font-medium tracking-wider">
                                        {card.subtitle}
                                    </p>

                                    {/* 描述 */}
                                    <p className="relative text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {card.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* 底部 CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Link
                            to="/reader"
                            className="inline-flex items-center gap-2 px-8 py-4 
                                bg-transparent border-2 border-gold-400/50 
                                text-gold-400 font-semibold rounded-xl
                                transition-all duration-300
                                hover:bg-gold-400/10 hover:border-gold-400 hover:shadow-lg hover:shadow-gold-400/20"
                        >
                            立即深入学习
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ========== FOOTER ========== */}
            <footer className="relative z-10 py-8 border-t border-gray-800/50">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-gold-400/50 text-sm">
                        © 2026 RichBoss Reader · 富老板阅读器 · Built with ❤️
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                        基于《富老板，穷老板》—— 林恒毅 著
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Home
