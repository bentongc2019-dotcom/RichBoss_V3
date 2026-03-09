import { createClient } from '@supabase/supabase-js'

// Vite 会在 build 时将 VITE_ 开头的变量注入 bundle
// 如果变量缺失，使用占位符让 app 正常渲染（功能降级，不崩溃）
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co'
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder-key'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase 环境变量未配置，认证功能将不可用。请检查 .env.local 文件')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const isSupabaseConfigured =
    !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY

// 类型定义
export interface UserProfile {
    id: string
    email: string
    membership_level: 'free' | 'annual_member'
    created_at: string
}

export interface TestResult {
    id: string
    user_id: string
    archetype_type: ArchetypeType
    score: ArchetypeScore
    created_at: string
}

export type ArchetypeType = 'entrepreneur' | 'investor' | 'stability' | 'explorer'

export interface ArchetypeScore {
    entrepreneur: number
    investor: number
    stability: number
    explorer: number
}
