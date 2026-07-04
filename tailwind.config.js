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
      // All values come from the CSS variables in src/index.css — edit the
      // palette there, not here (see BRANDING.md).
      colors: {
        ardor: {
          red:    'rgb(var(--red-rgb) / <alpha-value>)',
          gold:   'rgb(var(--gold-rgb) / <alpha-value>)',
          copper: 'rgb(var(--copper-rgb) / <alpha-value>)',
          dark:   'rgb(var(--dark-rgb) / <alpha-value>)',
          darker: 'rgb(var(--darker-rgb) / <alpha-value>)',
          mid:    'rgb(var(--mid-rgb) / <alpha-value>)',
          surface:'rgb(var(--surface-rgb) / <alpha-value>)',
          muted:  'rgb(var(--muted-rgb) / <alpha-value>)',
          text:   'rgb(var(--text-rgb) / <alpha-value>)',
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
