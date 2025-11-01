/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // direct value, not 'config'
        ethiopianGreen: '#008000',
        ethiopianYellow: '#FFD700',
        ethiopianRed: '#FF0000',
      },
    },
  },
  plugins: [],
};
