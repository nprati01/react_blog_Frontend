/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        '2/3': '66.666667'
      }
    },
  },
  plugins: [],
}
