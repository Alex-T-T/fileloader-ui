import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundColor: {
                home: '#181c35',
                button: '#1b2041',
                secondary: '#1b2041',
                rose: '#ff8c8c',
                violet: '#4d12bf',
                'button-hover': 'rgba(255, 140, 140, 0.2)',
                "black-ops": 'rgba(0, 0, 0, 0.1)'
            },

            colors: {
                rose: '#ff8c8c',
                secondary: 'rgba(255, 255, 255, 0.1)',
            },
            textColor: {
                rose: '#ff8c8c',
                secondary: 'rgba(255, 255, 255, 0.7)',
            },
            cursor: {
                'custom-cursor': 'url(/cursor.svg), auto',
            },
        },
    },
    plugins: [],
};
export default config;
