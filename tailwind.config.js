/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './hooks/**/*.{js,ts,jsx,tsx,mdx}',
        './utils/**/*.{js,ts,jsx,tsx,mdx}',
        './contexts/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-playfair)', 'Georgia', 'serif'],
            },
            colors: {
                // Indian-inspired heritage colors
                primary: {
                    DEFAULT: '#FF6B35', // Saffron-inspired orange
                    50: '#FFF4F0',
                    100: '#FFE8DD',
                    200: '#FFD1BB',
                    300: '#FFBA99',
                    400: '#FFA377',
                    500: '#FF6B35',
                    600: '#E85A2A',
                    700: '#D1491F',
                    800: '#BA3814',
                    900: '#A32709',
                    dark: '#E85A2A',
                    light: '#FF8A5C',
                },
                secondary: {
                    DEFAULT: '#004E89', // Deep Indian blue
                    50: '#E6F0FF',
                    100: '#CCE1FF',
                    200: '#99C3FF',
                    300: '#66A5FF',
                    400: '#3387FF',
                    500: '#0070F3',
                    600: '#005CE6',
                    700: '#004E89',
                    800: '#003D6E',
                    900: '#002C52',
                    dark: '#003D6E',
                    light: '#1B7FCC',
                },
                accent: {
                    DEFAULT: '#F7B801', // Golden yellow
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',
                    500: '#F7B801',
                    600: '#D97706',
                    700: '#B45309',
                    800: '#92400E',
                    900: '#78350F',
                    light: '#FFD166',
                    dark: '#D97706',
                },
                // Additional Indian heritage colors
                heritage: {
                    saffron: '#FF9933',
                    green: '#138808',
                    navy: '#000080',
                    terracotta: '#E2725B',
                    sandstone: '#F4E4BC',
                    marble: '#F8F8FF',
                    gold: '#FFD700',
                    copper: '#B87333',
                },
                // Glassmorphism and modern UI colors
                glass: {
                    white: 'rgba(255, 255, 255, 0.1)',
                    black: 'rgba(0, 0, 0, 0.1)',
                    primary: 'rgba(255, 107, 53, 0.1)',
                    secondary: 'rgba(0, 78, 137, 0.1)',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-hero': 'linear-gradient(135deg, #FF6B35 0%, #F7B801 50%, #004E89 100%)',
                'gradient-mesh': 'linear-gradient(135deg, #FF6B35 25%, transparent 25%), linear-gradient(225deg, #F7B801 25%, transparent 25%), linear-gradient(315deg, #004E89 25%, transparent 25%), linear-gradient(45deg, #FF6B35 25%, transparent 25%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'bounce-gentle': 'bounceGentle 2s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'gradient': 'gradient 15s ease infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'typewriter': 'typewriter 3.5s steps(40) 1s 1 normal both',
                'blink': 'blink 1s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(-5%)' },
                    '50%': { transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                typewriter: {
                    'from': { width: '0' },
                    'to': { width: '100%' },
                },
                blink: {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' },
                },
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glow': '0 0 20px rgba(255, 107, 53, 0.3)',
                'glow-lg': '0 0 40px rgba(255, 107, 53, 0.4)',
                'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            },
            backdropBlur: {
                xs: '2px',
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
            screens: {
                '3xl': '1600px',
            },
        },
    },
    plugins: [],
}
