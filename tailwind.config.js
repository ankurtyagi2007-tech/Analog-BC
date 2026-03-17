/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E1',
        'cream-light': '#FFFCF5',
        espresso: '#2C1810',
        'espresso-light': '#4A3728',
        terracotta: '#C67B5C',
        'terracotta-dark': '#A8624A',
        sand: '#D4C4A8',
        olive: '#6B7B3C',
        clay: '#B5651D',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
