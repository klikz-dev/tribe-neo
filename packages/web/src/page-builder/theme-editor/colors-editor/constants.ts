import { availableColors } from '../../../themes/colors/available-colors'

export const primaryColors = [
  {
    title: 'Body',
    name: 'actionPrimary',
    variants: {
      light: ['#059669', '#285FED', '#FA4C80', '#F09F01', '#0FC2B8', '#6742F9'],
      dark: ['#5273C6'],
    },
  },
  {
    title: 'Text',
    name: 'basicPrimary',
    variants: {
      light: [
        '#E2EEEA',
        availableColors.stone[500],
        availableColors.gray[500],
        availableColors.neutral[500],
      ],
      dark: [
        availableColors.stone[400],
        availableColors.gray[400],
        availableColors.neutral[400],
      ],
    },
  },
]
export const secondaryColors = [
  {
    title: 'Body',
    name: 'actionSecondary',
    background: true,
    variants: {
      light: ['#66CDC1', '#285FED', '#FA4C80', '#F09F01', '#0FC2B8', '#6742F9'],
      dark: ['#5273C6'],
    },
  },
  {
    title: 'Text',
    name: 'basicSecondary',
    variants: {
      light: [
        '#E2EEEA',
        availableColors.stone[500],
        availableColors.gray[500],
        availableColors.neutral[500],
      ],
      dark: [
        availableColors.stone[400],
        availableColors.gray[400],
        availableColors.neutral[400],
      ],
    },
  },
]
export const mainColors = [
  {
    title: 'Body',
    name: 'main',
    background: true,
    variants: {
      light: [
        '#F0FFFA',
        availableColors.white,
        availableColors.stone[50],
        availableColors.stone[100],
        availableColors.stone[200],
      ],
      dark: [
        availableColors.stone[900],
        availableColors.stone[800],
        availableColors.stone[700],
      ],
    },
  },
  {
    title: 'Text',
    name: 'basicMain',
    variants: {
      light: [
        '#5A6662',
        availableColors.stone[500],
        availableColors.gray[500],
        availableColors.neutral[500],
      ],
      dark: [
        availableColors.stone[400],
        availableColors.gray[400],
        availableColors.neutral[400],
      ],
    },
  },
]
export const surfaceColors = [
  {
    title: 'Body',
    name: 'surface',
    background: true,
    variants: {
      light: [
        availableColors.white,
        availableColors.stone[50],
        availableColors.stone[100],
        availableColors.stone[200],
      ],
      dark: [
        availableColors.stone[900],
        availableColors.stone[800],
        availableColors.stone[700],
      ],
    },
  },
  {
    title: 'Text',
    name: 'basicSurface',
    variants: {
      light: [
        '#333635',
        availableColors.stone[500],
        availableColors.gray[500],
        availableColors.neutral[500],
      ],
      dark: [
        availableColors.stone[400],
        availableColors.gray[400],
        availableColors.neutral[400],
      ],
    },
  },
]
export const linkColors = [
  {
    title: 'Text',
    name: 'actionAccent',
    variants: {
      light: ['#3694C9', '#AC1FDE', '#28A6ED', '#4B5663'],
      dark: ['#794B89'],
    },
  },
  {
    title: 'Hover',
    name: 'actionAccentHover',
    variants: {
      light: ['#3694C9', '#AC1FDE', '#28A6ED', '#4B5663'],
      dark: ['#794B89'],
    },
  },
]
