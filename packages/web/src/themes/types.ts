import { TypographyTheme } from './typography/themes'

export interface ColorGroup {
  readonly '50': string
  readonly '100': string
  readonly '200': string
  readonly '300': string
  readonly '400': string
  readonly '500': string
  readonly '600': string
  readonly '700': string
  readonly '800': string
  readonly '900': string
  readonly [key: string]: string
}

export interface ThemeColors {
  main: ColorGroup
  surface: ColorGroup
  alternative: ColorGroup
  actionPrimary: ColorGroup
  actionSecondary: ColorGroup
  actionAccent: ColorGroup
  actionAccentHover: ColorGroup
  basicMain: ColorGroup
  basicSurface: ColorGroup
  basicAlternative: ColorGroup
  basicPrimary: ColorGroup
  basicSecondary: ColorGroup
  neutral: ColorGroup
  success: ColorGroup
  danger: ColorGroup
  warning: ColorGroup
  info: ColorGroup
}

export interface ThemeTypography {
  theme: TypographyTheme
  baseFontSize?: string
  baseLineHeight?: number
  headerLineHeight?: number
  scaleRatio?: number
  googleFonts?: string[]
  headerFontFamily?: string[]
  bodyFontFamily?: string[]
  headerWeight?: string
  bodyWeight?: string
  boldWeight?: string
  blockMarginBottom?: number
}

export interface ThemeModeColors {
  light: ThemeColors
  dark: ThemeColors
}

export interface Theme {
  id: string
  name?: string
  colors: ThemeModeColors
  typography: ThemeTypography
}

export interface CompiledTheme {
  '--tribe-color-main': ColorGroup
  '--tribe-color-surface': ColorGroup
  '--tribe-color-alternative': ColorGroup
  '--tribe-color-actionPrimary': ColorGroup
  '--tribe-color-actionSecondary': ColorGroup
  '--tribe-color-actionAccent': ColorGroup
  '--tribe-color-actionAccentHover': ColorGroup
  '--tribe-color-neutral': ColorGroup
  '--tribe-color-basicMain': ColorGroup
  '--tribe-color-basicSurface': ColorGroup
  '--tribe-color-basicAlternative': ColorGroup
  '--tribe-color-basicPrimary': ColorGroup
  '--tribe-color-basicSecondary': ColorGroup
  '--tribe-color-success': ColorGroup
  '--tribe-color-danger': ColorGroup
  '--tribe-color-warning': ColorGroup
  '--tribe-color-info': ColorGroup
}
