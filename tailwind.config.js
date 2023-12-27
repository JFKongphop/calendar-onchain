/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calendar-main-theme': '#1e293b',
        'calendar-minor-theme': '#e2e8f0'
      }
    }
  },
  plugins: [],
}

