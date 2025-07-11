/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/TS files inside src/
      "./public/index.html"         // Also scan your index.html if needed
    ],
    theme: {
      extend: {
        colors: {
          primary: "#6D28D9", // Example purple (used in buttons/score box)
          darkText: "#111827",
          accent: "#8B5CF6", // Matching your gradient or text highlight
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  