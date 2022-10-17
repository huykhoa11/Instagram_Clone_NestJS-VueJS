/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      minWidth: {
        '24': '6rem',
      },
    },
  },
  plugins: [],
}
