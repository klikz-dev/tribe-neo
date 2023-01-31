import { themeColorGQLFields } from './themeColor.fields'

export type ThemeColorsFields = 'basic' | 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const themeColorsGQLFields = (fields: ThemeColorsFields) => `
  __typename
  dark {
    ${themeColorGQLFields('all')}
  }
  light {
    ${themeColorGQLFields('all')}
  }
`
