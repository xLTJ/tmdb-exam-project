/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'),
        require("tailwind-gradient-mask-image"),
        require('tailwind-scrollbar')
    ],
    daisyui: {
        themes: ['light', 'dark', 'synthwave', 'valentine', 'sunset', 'night', 'winter', 'fantasy', 'retro']
    }
}

