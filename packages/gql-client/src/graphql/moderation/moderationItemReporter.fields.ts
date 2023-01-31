import { MemberFields, memberGQLFields } from '../network'

export type ModerationItemReporterFields =
  | 'basic'
  | 'all'
  | CustomModerationItemReporterFields

export interface CustomModerationItemReporterFields {
  reporter?: MemberFields
}

const BASIC_MODERATION_ITEM_REPORTER_FIELDS: CustomModerationItemReporterFields =
  {
    reporter: 'basic',
  }
const ALL_MODERATION_ITEM_REPORTER_FIELDS: CustomModerationItemReporterFields =
  {
    reporter: 'all',
  }

export const moderationItemReporterGQLFields = (
  fields: ModerationItemReporterFields,
) => {
  if (fields === 'basic') fields = BASIC_MODERATION_ITEM_REPORTER_FIELDS
  if (fields === 'all') fields = ALL_MODERATION_ITEM_REPORTER_FIELDS

  return `
    createdAt
    description
    id
    reportCategory
    updatedAt
    ${
      fields.reporter
        ? `
      reporter {
        ${memberGQLFields(fields.reporter)}
      }
    `
        : ``
    }
  `
}
