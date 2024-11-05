// eslint-disable-next-line @typescript-eslint/no-require-imports
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Figtree"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: ['0.625rem', '12.5px'],
        sm: ['0.875rem', '17.5px'],
      },
      colors: {
        sesame: {
          500: '#6C63FF',
        },
        'dark-blue': '#1F2D52',
      },
      boxShadow: {
        'sesame-xl':
          '0px 1px 2px 0px #2F299908, 0px 4px 4px 0px #6C63FF08, 0px 10px 6px 0px #6C63FF05, 0px -2px 5px 0px #2F299905, 0px -9px 9px 0px #6C63FF03, 0px -20px 12px 0px #6C63FF03',
        sesame:
          '4px 0px 4px 0px #6C63FF05, 1px 0px 2px 0px #6C63FF08 ,10px 0px 6px 0px #6C63FF05',
      },
    },
  },
  plugins: [],
}
