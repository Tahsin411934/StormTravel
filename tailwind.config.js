/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins:'"Poppins", sans-serif',
        Montserrat: '"Montserrat", sans-serif',
        Prata: '"Prata", serif',
        GreatVibes: '"Great Vibes", cursive',
        Murecho: '"Murecho", serif'
        
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}