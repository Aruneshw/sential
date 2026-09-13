/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#f8fafc',
                surface: '#ffffff',
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    500: '#3b82f6',
                    900: '#1e3a8a',
                },
                success: '#10b981',
                warning: '#f59e0b',
                danger: '#ef4444',
                info: '#8b5cf6',
                textMain: '#0f172a',
                textMuted: '#64748b'
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
            }
        },
    },
    plugins: [],
}
