/**
 * 邀请码验证工具
 * 包含设备指纹生成、XOR加密、邀请码验证等功能
 */

// 加密密钥
const ENCRYPT_KEY = 'flb2025rich'

// localStorage 存储键名
const AUTH_STORAGE_KEY = 'flb_auth'

/**
 * 生成 Canvas 指纹
 * 基于 Canvas 渲染特征生成唯一标识
 */
function getCanvasFingerprint(): string {
    try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return 'no-canvas'

        canvas.width = 200
        canvas.height = 50

        // 绘制文本和图形
        ctx.textBaseline = 'top'
        ctx.font = '14px Arial'
        ctx.fillStyle = '#f60'
        ctx.fillRect(125, 1, 62, 20)
        ctx.fillStyle = '#069'
        ctx.fillText('RichBoss2025', 2, 15)
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
        ctx.fillText('RichBoss2025', 4, 17)

        // 获取 Canvas 数据并生成哈希
        const dataUrl = canvas.toDataURL()
        return simpleHash(dataUrl)
    } catch {
        return 'canvas-error'
    }
}

/**
 * 简单哈希函数
 * 将字符串转换为32位十六进制哈希值
 */
function simpleHash(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // 转换为32位整数
    }
    return Math.abs(hash).toString(16).padStart(8, '0')
}

/**
 * 获取设备ID
 * 基于 canvas fingerprint + navigator 特征生成32位设备ID
 */
export function getDeviceId(): string {
    const parts: string[] = []

    // Canvas 指纹
    parts.push(getCanvasFingerprint())

    // Navigator 特征
    parts.push(simpleHash(navigator.userAgent))
    parts.push(simpleHash(navigator.language))
    parts.push(simpleHash(Intl.DateTimeFormat().resolvedOptions().timeZone))
    parts.push(simpleHash(`${screen.width}x${screen.height}x${screen.colorDepth}`))

    // 合并所有部分并生成最终32位ID
    const combined = parts.join('-')
    const hash1 = simpleHash(combined)
    const hash2 = simpleHash(combined + ENCRYPT_KEY)
    const hash3 = simpleHash(hash1 + hash2)
    const hash4 = simpleHash(hash2 + hash3)

    return (hash1 + hash2 + hash3 + hash4).substring(0, 32)
}

/**
 * XOR 加密/解密字符串
 * 使用密钥对字符串进行异或运算
 */
export function xorCrypt(input: string, key: string = ENCRYPT_KEY): string {
    let result = ''
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        result += String.fromCharCode(charCode)
    }
    return result
}

/**
 * 生成并加密邀请码数组
 * 生成 flb-0001 到 flb-3000 的邀请码，使用 Base64 存储
 */
export function generateCodes(): string[] {
    const codes: string[] = []
    for (let i = 1; i <= 3000; i++) {
        const code = `flb-${i.toString().padStart(4, '0')}`
        // 加密邀请码并转为 Base64
        const encrypted = xorCrypt(code)
        const base64 = btoa(encrypted)
        codes.push(base64)
    }
    return codes
}

// 预生成加密后的邀请码集合（用于快速验证）
let encryptedCodesSet: Set<string> | null = null

/**
 * 获取加密邀请码集合
 */
function getEncryptedCodesSet(): Set<string> {
    if (!encryptedCodesSet) {
        encryptedCodesSet = new Set(generateCodes())
    }
    return encryptedCodesSet
}

/**
 * 验证邀请码
 * 成功则存储到 localStorage，返回验证结果
 */
export function validateInviteCode(code: string): { valid: boolean; message: string } {
    // 规范化输入（转小写，去除空格）
    const normalizedCode = code.toLowerCase().trim()

    // 检查格式是否正确
    const codePattern = /^flb-(\d{4})$/
    const match = normalizedCode.match(codePattern)

    if (!match) {
        return {
            valid: false,
            message: '邀请码格式错误，正确格式：flb-0001'
        }
    }

    // 检查数字范围
    const codeNumber = parseInt(match[1], 10)
    if (codeNumber < 1 || codeNumber > 3000) {
        return {
            valid: false,
            message: '邀请码不存在，请检查输入'
        }
    }

    // 加密输入的邀请码并验证
    const encrypted = xorCrypt(normalizedCode)
    const base64 = btoa(encrypted)
    const validCodes = getEncryptedCodesSet()

    if (!validCodes.has(base64)) {
        return {
            valid: false,
            message: '邀请码验证失败'
        }
    }

    // 验证成功，存储到 localStorage
    const deviceId = getDeviceId()
    const authData = {
        code: normalizedCode,
        device: deviceId,
        time: Date.now()
    }

    // 将认证数据转为 Base64 JSON 存储
    const authJson = JSON.stringify(authData)
    const authBase64 = btoa(unescape(encodeURIComponent(authJson)))
    localStorage.setItem(AUTH_STORAGE_KEY, authBase64)

    return {
        valid: true,
        message: '邀请码验证成功，已解锁全文阅读！'
    }
}

/**
 * 检查当前设备是否已解锁
 * 验证 localStorage 中的认证数据是否有效
 */
export function isAuthenticated(): boolean {
    try {
        const authBase64 = localStorage.getItem(AUTH_STORAGE_KEY)
        if (!authBase64) {
            return false
        }

        // 解码 Base64 JSON
        const authJson = decodeURIComponent(escape(atob(authBase64)))
        const authData = JSON.parse(authJson)

        // 验证设备ID是否匹配
        const currentDeviceId = getDeviceId()
        if (authData.device !== currentDeviceId) {
            // 设备不匹配，清除认证数据
            localStorage.removeItem(AUTH_STORAGE_KEY)
            return false
        }

        // 验证邀请码是否有效
        const codePattern = /^flb-(\d{4})$/
        const match = authData.code?.match(codePattern)
        if (!match) {
            localStorage.removeItem(AUTH_STORAGE_KEY)
            return false
        }

        const codeNumber = parseInt(match[1], 10)
        if (codeNumber < 1 || codeNumber > 3000) {
            localStorage.removeItem(AUTH_STORAGE_KEY)
            return false
        }

        return true
    } catch {
        // 解析失败，清除无效数据
        localStorage.removeItem(AUTH_STORAGE_KEY)
        return false
    }
}
