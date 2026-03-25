/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'et-brand': '#D71A21',
        'et-dark': '#1A1A1A',
        'et-gray': '#F4F4F4',
        'et-blue': '#0066CC',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'Georgia', 'serif'], 
        'sans': ['"Inter"', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}