import { DeepPartial } from 'react-hook-form'

import {
  NewTheme,
  Theme as NetworkTheme,
  ThemeColor,
  ThemeToken,
} from '@tribeplatform/gql-client/types'

import { ColorGroup, Theme, ThemeColors } from './types'
import { createColorGroup, extendTheme } from './utils'

const convertFromTokens = (tokens: (ThemeToken | ThemeColor)[]) => {
  const result = {}
  tokens.forEach(token => {
    result[token.key] =
      (token as ThemeToken)?.value || (token as ThemeColor)?.weights
  })
  return result
}

const convertFromColorTokens = (tokens: ThemeColor[]) => {
  const colors = convertFromTokens(tokens)
  Object.keys(colors).forEach(key => {
    colors[key] = convertFromTokens(colors[key])
  })
  return colors
}

const convertToTokens = (obj: Record<string, string>): ThemeToken[] => {
  return Object.keys(obj).map(key => ({ key, value: obj[key] }))
}

const convertToColorTokens = (colors: ThemeColors): ThemeColor[] => {
  return Object.keys(colors).map(key => ({
    key,
    weights: convertToTokens(colors[key]),
  }))
}

export class ThemeConvertor {
  private base: Theme

  private theme: DeepPartial<Theme>

  private networkOldTheme: NetworkTheme

  private networkTheme: NewTheme

  constructor(options: {
    base: Theme
    theme?: DeepPartial<Theme>
    networkOldTheme?: NetworkTheme
    networkTheme?: NewTheme
  }) {
    const { base, theme, networkOldTheme, networkTheme } = options
    this.base = base
    this.theme = theme
    this.networkOldTheme = networkOldTheme
    this.networkTheme = networkTheme
  }

  private convertNetworkOldThemeToTheme(): DeepPartial<Theme> {
    const { tokens } = this.networkOldTheme
    const { colors: oldColors = [] } = tokens

    const colorKeyMapper = {
      'accent.base': ['actionPrimary'],
      'bg.base': ['surface', 'actionSecondary'],
      'bg.secondary': ['main'],
      'label.primary': ['basicMain', 'basicSurface', 'basicSecondary'],
    }
    const textWhite = createColorGroup('#FFFFFF', false)
    const backgroundWhite = createColorGroup('#FFFFFF', false, true)
    const labelPrimary = createColorGroup('#27282B', false)
    const lightColors: Record<string, ColorGroup> = {
      actionPrimary: createColorGroup('#2D9F6F', false),
      surface: backgroundWhite,
      actionSecondary: backgroundWhite,
      main: createColorGroup('#F4F4F6', false, true),
      basicMain: labelPrimary,
      basicSurface: labelPrimary,
      basicSecondary: labelPrimary,
    }
    oldColors.forEach(({ key, value }) => {
      if (colorKeyMapper[key]) {
        const hex = value?.replace(/\s+/g, '')
        const mappedColor = createColorGroup(
          hex,
          false,
          !['label.primary', 'accent.base'].includes(key),
        )
        colorKeyMapper[key].forEach(mappedKey => {
          lightColors[mappedKey] = mappedColor
        })
      }
    })
    lightColors.actionAccent = createColorGroup(
      lightColors.actionPrimary[600],
      false,
    )
    lightColors.actionAccentHover = createColorGroup(
      lightColors.actionPrimary[400],
      false,
    )
    lightColors.basicPrimary = textWhite

    return {
      colors: { light: lightColors },
    }
  }

  private convertNetworkThemeToTheme(): DeepPartial<Theme> {
    const { colors, typography: typographyTokens } = this.networkTheme
    const { light: lightTokens, dark: darkTokens } = colors

    return {
      colors: {
        light: convertFromColorTokens(lightTokens),
        dark: convertFromColorTokens(darkTokens),
      },
      typography: convertFromTokens(
        typographyTokens.map(token => ({
          ...token,
          value: JSON.parse(token.value),
        })),
      ),
    }
  }

  toTheme(): Theme {
    let result: Theme = { ...this.base }

    if (this.networkOldTheme)
      result = extendTheme(result, this.convertNetworkOldThemeToTheme())
    if (this.networkTheme)
      result = extendTheme(result, this.convertNetworkThemeToTheme())
    if (this.theme) result = extendTheme(result, this.theme)

    return result
  }

  toNetworkTheme(): NewTheme {
    const theme = this.toTheme()
    return {
      ...theme,
      colors: {
        light: convertToColorTokens(theme.colors.light),
        dark: convertToColorTokens(theme.colors.dark),
      },
      typography: convertToTokens(
        Object.keys(theme.typography).reduce(
          (preValue, key) => ({
            ...preValue,
            [key]: JSON.stringify(theme.typography[key]),
          }),
          {},
        ),
      ),
    }
  }
}
