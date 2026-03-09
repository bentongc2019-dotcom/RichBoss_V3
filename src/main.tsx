// v2026.03.09 — Supabase 信念测验系统
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 版本戳：强制 Vite 生成新 bundle hash
export const APP_VERSION = '2026.03.09.001'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
