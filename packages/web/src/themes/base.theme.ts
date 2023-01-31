import { colorTemplates } from './colors/templates'
import { Theme } from './types'
import { TypographyTheme } from './typography/themes'

export const BASE_THEME: Theme = {
  id: 'default',
  colors: colorTemplates.find(template => template.name === 'Default').colors,
  typography: {
    theme: TypographyTheme.system,
  },
}
