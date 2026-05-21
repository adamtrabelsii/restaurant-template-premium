/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['Fraunces', 'Cormorant', 'serif'],
        montserrat: ['Inter', 'Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ardor: {
          red:    '#C87941',
          gold:   '#7BA7BC',
          copper: '#E8D5B0',
          neon:   '#7BA7BC',
          dark:   '#0D1B2A',
          darker: '#080E15',
          mid:    '#112030',
          surface:'#1B3A5C',
          muted:  '#8AABB8',
          text:   '#E8D5B0',
        },
      },
      transitionTimingFunction: {
        cinema: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to:   { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        shimmer: 'shimmer 6s ease-in-out infinite',
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
