/* eslint-disable no-process-env */
/* eslint-disable global-require */

const colors = require('tailwindcss/colors')

const createColorRange = name => ({
  50: `var(--tribe-color-${name}-50)`,
  100: `var(--tribe-color-${name}-100)`,
  200: `var(--tribe-color-${name}-200)`,
  300: `var(--tribe-color-${name}-300)`,
  400: `var(--tribe-color-${name}-400)`,
  500: `var(--tribe-color-${name}-500)`,
  600: `var(--tribe-color-${name}-600)`,
  700: `var(--tribe-color-${name}-700)`,
  800: `var(--tribe-color-${name}-800)`,
  900: `var(--tribe-color-${name}-900)`,
  DEFAULT: `var(--tribe-color-${name}-500)`,
})

const createColor = name => ({
  [name]: createColorRange(name),
})

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? '' : 'jit',
  content: ['./src/**/*.tsx', './src/**/*.ts'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
      ...createColor('main'),
      ...createColor('surface'),
      ...createColor('alternative'),
      ...createColor('actionPrimary'),
      ...createColor('actionSecondary'),
      ...createColor('actionAccent'),
      ...createColor('actionAccentHover'),
      ...createColor('basicMain'),
      ...createColor('basicSurface'),
      ...createColor('basicAlternative'),
      ...createColor('basicPrimary'),
      ...createColor('basicSecondary'),
      ...createColor('neutral'),
      ...createColor('success'),
      ...createColor('danger'),
      ...createColor('warning'),
      ...createColor('info'),
    },
    extend: {
      animation: {
        'bounce-slow': 'bounce 5s linear infinite',
        'pulse-sm': 'pulse-sm 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-sm': 'ping-sm 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        right: 'to-right 2s linear infinite',
        bottom: 'to-bottom 2s linear 1s infinite',
        left: 'to-left 2s linear infinite',
        top: 'to-top 2s linear 1s infinite',
      },
      keyframes: {
        'pulse-sm': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0' },
        },
        'ping-sm': {
          '75%, 100%': {
            transform: 'scale(1.02)',
            opacity: '0',
          },
        },
        'to-right': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'to-bottom': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '1',
          },
        },
        'to-left': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        'to-top': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100%)',
            opacity: '1',
          },
        },
      },
      spacing: {
        108: '27rem',
        120: '30rem',
        132: '33rem',
      },
      maxWidth: {
        '8xl': '84rem',
      },
      ringOffsetWidth: {
        DEFAULT: '2px',
      },
      ringWidth: {
        DEFAULT: '2px',
      },
      ringOpacity: {
        DEFAULT: '1',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
