/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
const envKey = process.env.APP_KEY || 'zireh'
const colors = require(`./websites/${envKey}/colors.js`)

export default {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: colors,
      borderRadius: {
        'xl': '10px',
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
