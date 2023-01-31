import { themeColorsGQLFields } from './themeColors.fields'

export type NewThemeFields = 'basic' | 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const newThemesGQLFields = (fields: NewThemeFields) => `
  id
  name
  typography {
    key
    value
  }
  colors {
    ${themeColorsGQLFields('all')}
  }
`
