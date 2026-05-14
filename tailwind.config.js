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
          red:    '#A8323F',
          gold:   '#C9A961',
          copper: '#B87333',
          neon:   '#C9A961',
          dark:   '#0C0A09',
          darker: '#06050A',
          mid:    '#15110F',
          surface:'#1C1815',
          muted:  '#A89E92',
          text:   '#F4EFE7',
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
