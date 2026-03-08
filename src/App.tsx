import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reader from './pages/Reader'
import QuizPage from './pages/QuizPage'
import AuthPage from './pages/AuthPage'
import ChatWidget from './components/ChatWidget'

/**
 * 主应用组件
 * 路由：/ 首页，/reader 阅读器，/quiz 信念原型测验，/auth 登录注册
 */
function App() {
    return (
        <Router basename="/RichBoss_V3" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
                {/* 首页 */}
                <Route path="/" element={<Home />} />
                {/* 阅读器 */}
                <Route path="/reader" element={<Reader />} />
                {/* 信念原型测验 */}
                <Route path="/quiz" element={<QuizPage />} />
                {/* 登录 / 注册 */}
                <Route path="/auth" element={<AuthPage onSuccess={() => window.location.replace('/RichBoss_V3/quiz')} />} />
            </Routes>

            {/* 小林同学 AI 聊天浮窗 - 全局显示 */}
            <ChatWidget />
        </Router>
    )
}

export default App

