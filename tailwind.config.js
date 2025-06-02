// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Для HTML-файлов
    "./src/**/*.{js,ts,jsx,tsx}", // Для всех JS/TS/JSX/TSX файлов в папке src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};