/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        plum: '#24132F',
        'dark-purple': '#392343',
        mauve: '#654B5C',
        gold: '#D6A75C',
        'warm-gold': '#FFC76B',
        cream: '#FFF2DC',
        rose: '#EFA6B8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        serifsoft: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
