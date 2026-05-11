/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['Cormorant', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        ardor: {
          red:    '#E63946',
          gold:   '#D4AF37',
          dark:   '#0F0F0F',
          darker: '#0A0A0A',
          mid:    '#111111',
          muted:  '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
}
