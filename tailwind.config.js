/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

const envKey = process.env.APP_KEY || 'zireh'

function loadColors() {
  try {
    const colorsModule = require(`./websites/${envKey}/colors.js`)
    return colorsModule.default || colorsModule
  } catch {
    return {}
  }
}

const colors = loadColors()

export default {
  content: [
    './components/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './composables/**/*.{ts,js}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: colors,
      borderRadius: {
        xl: '10px',
        '2xl': '15px',
        '3xl': '20px',
      },
    },
    screens: {
      xs: '320px',
      ...defaultTheme.screens,
      '3xl': '1920px',
    },
    fontFamily: {
      yekanBakh: ['YekanBakh', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '12px',
    },
  },
}
