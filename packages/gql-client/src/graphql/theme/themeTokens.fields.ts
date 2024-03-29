export type ThemeTokensFields = 'basic' | 'all'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const themeTokensGQLFields = (fields: ThemeTokensFields) => `
  breakpoints {
    key
    value
  }
  colors {
    key
    value
  }
  fontSizes {
    key
    value
  }
  fontWeights {
    key
    value
  }
  fontWeights {
    key
    value
  }
  opacity {
    key
    value
  }
  shadows {
    key
    value
  }
  sizes {
    key
    value
  }
  textStyles {
    key
    value
  }
  zIndices {
    key
    value
  }
`
