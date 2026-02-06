/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // 自定义配色方案 - 深紫色 + 金色
            colors: {
                'royal-purple': {
                    50: '#f5f0f9',
                    100: '#e9ddf2',
                    200: '#d6bfe6',
                    300: '#be97d4',
                    400: '#a369be',
                    500: '#8a4aa6',
                    600: '#6A1B9A',  // 主色调
                    700: '#5a1780',
                    800: '#4a1468',
                    900: '#3d1156',
                    950: '#260a38',
                },
                'gold': {
                    50: '#fffef0',
                    100: '#fffacc',
                    200: '#fff299',
                    300: '#ffe766',
                    400: '#FFD700',  // 金色主色调
                    500: '#e6c200',
                    600: '#cc9a00',
                    700: '#a67700',
                    800: '#805800',
                    900: '#5c4000',
                    950: '#3d2a00',
                },
            },
            // 自定义字体
            fontFamily: {
                'display': ['Inter', 'system-ui', 'sans-serif'],
                'body': ['Inter', 'system-ui', 'sans-serif'],
            },
            // 动画
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-gold': 'pulseGold 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseGold: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
