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

/* eslint-disable global-require */
module.exports = {
  mode: isProd ? '' : 'jit',
  safelist: [
    /* mobile sidebar animation */
    'rotate-0',
    'rotate-90',
    '-rotate-90',
    'translate-x-full',
    '-translate-x-full',
    'translate-x-0',
  ],
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
      'semi-transparent': 'rgba(0, 0, 0, .75)',
    },
    extend: {
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
  corePlugins: {
    preflight: false,
  },
}
