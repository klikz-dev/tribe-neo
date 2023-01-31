import { ModerationItemReportersArgs } from '../../types'
import { MemberFields, memberGQLFields } from '../network'
import {
  moderationItemEntityGQLFields,
  ModerationItemEntityFields,
} from './moderationItemEntity.fields'
import {
  ModerationItemReporterFields,
  moderationItemReporterGQLFields,
} from './moderationItemReporter.fields'

export type ModerationItemFields = 'basic' | 'all' | CustomModerationItemFields

export interface CustomModerationItemFields {
  entity?: ModerationItemEntityFields
  moderator?: MemberFields
  reporters?: {
    fields: ModerationItemReporterFields
    variables: ModerationItemReportersArgs
  }
}

const BASIC_MODERATION_ITEM_FIELDS: CustomModerationItemFields = {
  entity: 'basic',
  moderator: 'basic',
  reporters: {
    fields: 'basic',
    variables: { limit: 10 },
  },
}

const ALL_MODERATION_ITEM_FIELDS: CustomModerationItemFields = {
  entity: 'all',
  moderator: 'all',
  reporters: {
    fields: 'all',
    variables: { limit: 10 },
  },
}

export const moderationItemGQLFields = (fields: ModerationItemFields) => {
  if (fields === 'basic') fields = BASIC_MODERATION_ITEM_FIELDS
  if (fields === 'all') fields = ALL_MODERATION_ITEM_FIELDS

  return `
    createdAt
    description
    flaggedBy
    id
    spaceId
    status
    updatedAt
    ${
      fields.entity
        ? `
      entity {
        ${moderationItemEntityGQLFields(fields.entity)}
      }
    `
        : ``
    }
    ${
      fields.moderator
        ? `
      moderator {
        ${memberGQLFields(fields.moderator)}
      }
    `
        : ``
    }
    ${
      fields.reporters
        ? `
      reporters(limit: ${fields.reporters.variables.limit}) {
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
        nodes {
          ${moderationItemReporterGQLFields(fields.reporters.fields)}
        }
        edges {
          cursor
          node {
            ${moderationItemReporterGQLFields(fields.reporters.fields)}
          }
        }
      }
    `
        : ``
    }
  `
}
