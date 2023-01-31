import ColorContrastChecker from 'color-contrast-checker'

import { Theme } from '../../../themes/types'

export const checkColorsContrast = (
  colors,
  theme: Theme,
  dark: boolean,
  fontSize = 16,
) => {
  const [textColorInfo, backColorInfo] = colors
  const colorKey = dark ? 'dark' : 'light'
  let textPickerShade = dark ? 400 : 500
  if (textColorInfo.background) {
    textPickerShade = dark ? 900 : 50
  }
  let backPickerShade = dark ? 400 : 500
  if (backColorInfo.background) {
    backPickerShade = dark ? 900 : 50
  }
  const textColor = theme.colors[colorKey][textColorInfo.name][textPickerShade]
  const backColor = theme.colors[colorKey][backColorInfo.name][backPickerShade]
  return checkColorContrast(backColor, textColor, fontSize)
}

export const checkColorContrast = (
  backColor: string,
  textColor: string,
  fontSize: number,
) => {
  const contrastChecker = new ColorContrastChecker()
  contrastChecker.fontSize = fontSize
  const l1 = contrastChecker.hexToLuminance(backColor)
  const l2 = contrastChecker.hexToLuminance(textColor)
  const contrastRatio = contrastChecker.getContrastRatio(l1, l2)
  const { WCAG_AA, WCAG_AAA } =
    contrastChecker.verifyContrastRatio(contrastRatio)

  return {
    ratio: contrastRatio,
    passed: WCAG_AA && WCAG_AAA,
    wcagAaPassed: WCAG_AA,
    wcagAaaPassed: WCAG_AAA,
  }
}
