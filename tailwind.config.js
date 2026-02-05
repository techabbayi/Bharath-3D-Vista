/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-playfair)', 'Georgia', 'serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#FF6B35',
                    dark: '#E85A2A',
                    light: '#FF8A5C',
                },
                secondary: {
                    DEFAULT: '#004E89',
                    dark: '#003D6E',
                },
                accent: {
                    DEFAULT: '#F7B801',
                    light: '#FFD166',
                },
            },
        },
    },
    plugins: [],
}
