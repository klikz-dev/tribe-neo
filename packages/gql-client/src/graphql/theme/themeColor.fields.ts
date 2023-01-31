export type ThemeColorFields = 'basic' | 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const themeColorGQLFields = (fields: ThemeColorFields) => `
  key
  weights {
    key
    value
  }
`
