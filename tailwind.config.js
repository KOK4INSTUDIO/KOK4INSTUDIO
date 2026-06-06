/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#edf0ff',
          200: '#dbe1ff',
          300: '#b9c4ff',
          400: '#8b9cff',
          500: '#5d73ff',
          600: '#3f54f5',
          700: '#3040d1',
          800: '#2a36a8',
          900: '#28348a'
        }
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 24, 40, 0.06), 0 6px 18px rgba(16, 24, 40, 0.08)'
      }
    }
  },
  corePlugins: {
    // Agar tidak merusak styling website publik legacy (index-content.html)
    preflight: false
  },
  plugins: [require('@tailwindcss/forms')]
}

