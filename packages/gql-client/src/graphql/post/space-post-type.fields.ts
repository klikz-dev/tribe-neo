import { SpaceFields, spaceGQLFields } from '..'

import { PostTypeFields, postTypeGQLFields } from '.'

export type SpacePostTypeFields = 'basic' | 'all' | CustomSpacePostTypeFields

export interface CustomSpacePostTypeFields {
  postType?: PostTypeFields
  space?: SpaceFields
}

const BASIC_SPACE_POST_TYPE_FIELDS: CustomSpacePostTypeFields = {}
const ALL_SPACE_POST_TYPE_FIELDS: CustomSpacePostTypeFields = {
  postType: 'basic',
  space: 'basic',
}

export function spacePostTypeGQLFields(fields: SpacePostTypeFields) {
  if (fields === 'basic') fields = BASIC_SPACE_POST_TYPE_FIELDS
  if (fields === 'all') fields = ALL_SPACE_POST_TYPE_FIELDS

  return `
    spaceId
    postTypeId
    whoCanPost
    whoCanReact
    whoCanReply
    ${
      fields.postType
        ? `
      postType {
        ${postTypeGQLFields(fields.postType)}
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
  `
}
