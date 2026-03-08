import { createClient } from '@supabase/supabase-js'

// 从环境变量读取，不硬编码任何 Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase 环境变量未配置，请检查 .env.local 文件')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
