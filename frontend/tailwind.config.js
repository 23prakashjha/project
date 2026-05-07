/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hn-orange': '#ff6600',
        'hn-gray': '#828282',
        'hn-dark': '#1a1a1a',
      },
    },
  },
  plugins: [],
}
