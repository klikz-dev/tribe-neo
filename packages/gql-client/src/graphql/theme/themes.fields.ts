import { ThemeFields, themeGQLFields } from './theme.fields'

export type ThemesFields = 'basic' | 'all' | CustomThemesFields

export interface CustomThemesFields {
  active?: ThemeFields
  drafts?: ThemeFields
  published?: ThemeFields
}

const BASIC_THEME_FIELDS: CustomThemesFields = {
  active: 'basic',
  drafts: 'basic',
  published: 'basic',
}
const ALL_THEME_FIELDS: CustomThemesFields = {
  active: 'all',
  drafts: 'all',
  published: 'all',
}

export function themesGQLFields(fields: ThemesFields): string {
  if (fields === 'basic') fields = BASIC_THEME_FIELDS
  if (fields === 'all') fields = ALL_THEME_FIELDS

  return `
    __typename
    ${
      fields.active
        ? `
      active {
        ${themeGQLFields(fields.active)}
      }
    `
        : ``
    }  
    ${
      fields.drafts
        ? `
      drafts {
        ${themeGQLFields(fields.drafts)}
      }
    `
        : ``
    }
    ${
      fields.published
        ? `
      published {
        ${themeGQLFields(fields.published)}
      }
    `
        : ``
    }
  `
}
