import { ThemeTokensFields, themeTokensGQLFields } from './themeTokens.fields'

export type ThemeFields = 'basic' | 'all' | CustomThemeFields

export interface CustomThemeFields {
  tokens?: ThemeTokensFields
}

const BASIC_THEME_TOKENS_FIELDS: CustomThemeFields = {}
const ALL_THEME_TOKENS_FIELDS: CustomThemeFields = {
  tokens: 'basic',
}

export const themeGQLFields = (fields: ThemeFields) => {
  if (fields === 'basic') fields = BASIC_THEME_TOKENS_FIELDS
  if (fields === 'all') fields = ALL_THEME_TOKENS_FIELDS

  return `
    name
    status
    ${
      fields.tokens
        ? `
      tokens {
        ${themeTokensGQLFields(fields.tokens)}
      }
    `
        : ``
    }
  `
}
