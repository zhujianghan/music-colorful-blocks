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
    themes: [
      'light', 'dark', 'cupcake', 'retro', 'aqua', 'fantasy', 'dracula', 'cmyk', 'acid', 'winter',
      {
        'default': {
          "primary": "#f87171",
          "secondary": "#4ade80",
          "accent": "#60a5fa",
          "info": "#fbbf24",
          "success": "#047857",
          "warning": "#f97316",
          "error": "#7f1d1d",
          "neutral": "#181424",
          "base-100": "#F6F7F9",
        },
      }
    ]
  }
}