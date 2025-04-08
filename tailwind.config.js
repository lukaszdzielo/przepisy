/** @type {import('tailwindcss').Config} */
export default {
    content: ['./page/**/*.vue',
        './components/**/*.vue',],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: {
                DEFAULT: '16px',
            },
        },
    },
    plugins: [],
};