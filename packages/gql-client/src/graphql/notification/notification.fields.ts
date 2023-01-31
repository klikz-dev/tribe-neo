import { SpaceFields, spaceGQLFields } from '../space'
import { PayloadFields, payloadGQLFields } from './payload.fields'

export type NotificationFields = 'basic' | 'all' | CustomNotificationFields

export interface CustomNotificationFields {
  actor?: PayloadFields
  object?: PayloadFields
  space?: SpaceFields
  target?: PayloadFields
}

const BASIC_NOTIFICATION_FIELDS: CustomNotificationFields = {}
const ALL_NOTIFICATION_FIELDS: CustomNotificationFields = {
  actor: 'basic',
  object: 'basic',
  space: 'basic',
  target: 'basic',
}

export function notificationGQLFields(fields: NotificationFields) {
  if (fields === 'basic') fields = BASIC_NOTIFICATION_FIELDS
  if (fields === 'all') fields = ALL_NOTIFICATION_FIELDS
  return `
    createdAt
    id
    meta {
      relativeUrl
      url
      body
      textBody
      title
      textTitle
      fullTitle
      textFullTitle
      reason
    }
    read
    verb
    ${
      fields.actor
        ? `
      actor {
        ${payloadGQLFields(fields.actor)}
      }
    `
        : ``
    }
    ${
      fields.object
        ? `
      object {
        ${payloadGQLFields(fields.object)}
      }
    `
        : ``
    }
    ${
      fields.space
        ? `
      space {
        ${spaceGQLFields(fields.space)}
      }
    `
        : ``
    }
    ${
      fields.target
        ? `
      target {
        ${payloadGQLFields(fields.target)}
      }
    `
        : ``
    }
  `
}
