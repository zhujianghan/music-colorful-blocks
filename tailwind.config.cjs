/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      space: {
        '27rem': '27rem',
        '45rem': '45rem',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'retro', 'aqua', 'fantasy', 'dracula', 'cmyk', 'acid', 'winter']
  }
}