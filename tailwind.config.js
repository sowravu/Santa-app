/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'santa-red': '#D42426',
                'forest-green': '#2F5233',
                'snow-white': '#FFFFFF',
                'gold': '#F1D570',
            },
            fontFamily: {
                'heading': ['Mountains of Christmas', 'cursive'],
                'body': ['Outfit', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'fadeIn': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
