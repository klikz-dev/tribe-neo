import chroma from 'chroma-js'
import { DeepPartial } from 'react-hook-form'

import { availableColors } from './colors/available-colors'
import { ColorGroup, CompiledTheme, Theme, ThemeColors } from './types'
import { Typography } from './typography/typography'

const availableColorsMapper: Record<string, ColorGroup> = {}
Object.keys(availableColors).forEach(key => {
  if (availableColors[key][500]) {
    availableColorsMapper[availableColors[key][500]] = availableColors[key]
  }
})

export const compileTheme = (
  theme: Theme,
  darkMode: boolean,
): CompiledTheme => {
  const { colors } = theme
  const themeColors = darkMode ? invertThemeColors(colors.dark) : colors.light
  return {
    '--tribe-color-main': themeColors.main,
    '--tribe-color-surface': themeColors.surface,
    '--tribe-color-alternative': themeColors.alternative,
    '--tribe-color-actionPrimary': themeColors.actionPrimary,
    '--tribe-color-actionSecondary': themeColors.actionSecondary,
    '--tribe-color-actionAccent': themeColors.actionAccent,
    '--tribe-color-actionAccentHover': themeColors.actionAccentHover,
    '--tribe-color-neutral': themeColors.neutral,
    '--tribe-color-basicMain': themeColors.basicMain,
    '--tribe-color-basicSurface': themeColors.basicSurface,
    '--tribe-color-basicAlternative': themeColors.basicAlternative,
    '--tribe-color-basicPrimary': themeColors.basicPrimary,
    '--tribe-color-basicSecondary': themeColors.basicSecondary,
    '--tribe-color-success': themeColors.success,
    '--tribe-color-danger': themeColors.danger,
    '--tribe-color-warning': themeColors.warning,
    '--tribe-color-info': themeColors.info,
  }
}

export const getThemeColors = (theme: Theme, darkMode: boolean): string => {
  let str = ''
  const compiledTheme = compileTheme(theme, darkMode)
  Object.keys(compiledTheme).forEach(cssVar => {
    if (typeof compiledTheme[cssVar] === 'string') {
      str += `${cssVar}: ${compiledTheme[cssVar]};`
    } else if (typeof compiledTheme[cssVar] === 'object') {
      Object.keys(compiledTheme[cssVar]).forEach(tVar => {
        str += `${cssVar}-${tVar}: ${compiledTheme[cssVar][tVar]};`
      })
    }
  })

  return str
}

export const applyTheme = (
  document: Document,
  theme: Theme,
  darkMode: boolean,
): void => {
  const root = document.documentElement
  const compiledTheme = compileTheme(theme, darkMode)
  Object.keys(compiledTheme).forEach(cssVar => {
    if (typeof compiledTheme[cssVar] === 'string') {
      root.style.setProperty(cssVar, compiledTheme[cssVar])
    } else if (typeof compiledTheme[cssVar] === 'object') {
      Object.keys(compiledTheme[cssVar]).forEach(tVar => {
        root.style.setProperty(`${cssVar}-${tVar}`, compiledTheme[cssVar][tVar])
      })
    }
  })

  const typography = new Typography(theme)
  typography.injectToDocument(document)
}

export const applyDarkMode = (el: HTMLElement, darkMode: boolean): void => {
  if (darkMode) {
    el.classList.add('dark')
  } else {
    el.classList.remove('dark')
  }
}

export const extendTheme = (
  extending: Theme,
  newTheme: DeepPartial<Theme>,
): Theme => {
  return {
    ...extending,
    ...newTheme,
    colors: {
      light: {
        ...extending.colors.light,
        ...newTheme?.colors?.light,
      } as ThemeColors,
      dark: {
        ...extending.colors.dark,
        ...newTheme?.colors?.dark,
      } as ThemeColors,
    },
    typography: {
      ...extending.typography,
      ...(newTheme?.typography || {}),
    },
  }
}

const colorWeights = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
]
export const createColorGroup = (
  hex: string,
  dark: boolean,
  background = false,
): ColorGroup => {
  if (availableColorsMapper[hex] && !dark && !background)
    return availableColorsMapper[hex]

  let scale
  if (!background) {
    scale = chroma
      .scale(['white', hex, 'black'])
      .mode('lch')
      .padding(0.1)
      // generate odd number of colors to make
      // scale.500 === hex in light mode
      // scale.400 === hex in dark mode
      .colors(11)
  } else {
    scale = chroma
      .scale(dark ? ['white', hex] : [hex, 'black'])
      .mode('lch')
      .padding(dark ? [0.6, 0] : [0, 0.6])
      // generate odd number of colors to make
      // scale.50 === hex in light mode
      // scale.900 === hex in dark mode
      .colors(11)
  }
  const cleanedScale = scale.slice(dark ? 1 : 0, dark ? undefined : -1)
  const result = {}
  for (let i = 0; i < colorWeights.length; i++) {
    result[colorWeights[i]] = cleanedScale[i]
  }
  return result as ColorGroup
}

export const invertThemeColors = (themeColors: ThemeColors): ThemeColors => {
  const invertedThemeColors = {}
  Object.keys(themeColors).forEach(cssVar => {
    if (typeof themeColors[cssVar] === 'object') {
      invertedThemeColors[cssVar] = {}
      Object.keys(themeColors[cssVar]).forEach(weight => {
        const invertWeightIndex = 9 - colorWeights.indexOf(weight)
        const invertWeight = String(colorWeights[invertWeightIndex])

        invertedThemeColors[cssVar][weight] = themeColors[cssVar][invertWeight]
      })
    }
  })

  return invertedThemeColors as ThemeColors
}
