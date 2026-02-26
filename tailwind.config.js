/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/index.html',
    './client/src/**/*.{ts,tsx,js,jsx}'
  ],
  prefix: 'tw-',
  important: '.bespoke',
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--Colors-Primary-Default)',
        neutral: 'var(--Colors-Text-Body-Default)',
        surface: 'var(--Colors-Backgrounds-Main-Default)',
        border: 'var(--Colors-Stroke-Default)',
        success: 'var(--Colors-Validation-Success-Default)',
        danger: 'var(--Colors-Validation-Danger-Default)',
        warning: 'var(--Colors-Validation-Warning-Default)'
      },
      boxShadow: {
        panel: '0 6px 20px rgba(15, 23, 42, 0.1)'
      },
      fontFamily: {
        sans: ['"Work Sans"', 'var(--body-family)', 'sans-serif']
      }
    }
  }
};
