import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reader from './pages/Reader'
import ChatWidget from './components/ChatWidget'

/**
 * 主应用组件
 * 配置路由：/ 首页，/reader 阅读器
 * 包含全局小林同学聊天浮窗
 */
function App() {
    return (
        <Router basename="/RichBoss_V3" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
                {/* 首页 */}
                <Route path="/" element={<Home />} />
                {/* 阅读器页面 */}
                <Route path="/reader" element={<Reader />} />
            </Routes>

            {/* 小林同学 AI 聊天浮窗 - 全局显示 */}
            <ChatWidget />
        </Router>
    )
}

export default App

