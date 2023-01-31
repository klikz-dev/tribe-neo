import { Paginated } from '../../types'
import { MediaFields, mediaGQLFields } from '../media'
import { MemberFields, memberGQLFields } from '../network'
import {
  SpaceAuthMemberPropsFields,
  spaceAuthMemberPropsGQLFields,
} from '../permission'
import { CollectionFields, collectionGQLFields } from './collection.fields'
import {
  HighlightedTagFields,
  highlightedTagGQLFields,
} from './highlightedTag.fields'
import {
  SpaceSeoDetailFields,
  spaceSeoDetailGQLFields,
} from './spaceSeoDetail.fields'

export type SpaceFields = 'basic' | 'all' | 'default' | CustomSpaceFields
export type PaginatedSpaceFields = Paginated<SpaceFields>

export interface CustomSpaceFields {
  seoDetail?: SpaceSeoDetailFields
  postsCount?: 'basic'
  image?: MediaFields
  banner?: MediaFields
  highlightedTags?: HighlightedTagFields
  createdBy?: MemberFields
  collection?: CollectionFields
  authMemberProps?: SpaceAuthMemberPropsFields
}

const BASIC_SPACE_FIELDS: CustomSpaceFields = {}
const ALL_SPACE_FIELDS: CustomSpaceFields = {
  seoDetail: 'basic',
  postsCount: 'basic',
  image: 'basic',
  banner: 'basic',
  highlightedTags: 'basic',
  createdBy: 'basic',
  collection: 'basic',
  authMemberProps: 'basic',
}
const DEFAULT_SPACE_FIELDS: CustomSpaceFields = {
  authMemberProps: 'all',
  banner: 'basic',
  image: 'basic',
  postsCount: 'basic',
  highlightedTags: {
    tag: 'basic',
  },
}

export function spaceGQLFields(fields: SpaceFields): string {
  if (fields === 'basic') fields = BASIC_SPACE_FIELDS
  if (fields === 'all') fields = ALL_SPACE_FIELDS
  if (fields === 'default') fields = DEFAULT_SPACE_FIELDS

  return `
    id
    name
    description
    slug
    layout
    createdById
    groupId
    imageId
    bannerId
    membersCount
    createdAt
    private
    hidden
    inviteOnly
    nonAdminsCanInvite
    customOrderingIndexInGroup
    whoCanPost
    whoCanReact
    whoCanReply
    ${fields.postsCount ? `postsCount` : ``}
    ${
      fields.image
        ? `
      image {
        ${mediaGQLFields(fields.image)}
      }
    `
        : ``
    }    
    ${
      fields.banner
        ? `
      banner {
        ${mediaGQLFields(fields.banner)}
      }
    `
        : ``
    }
    ${
      fields.highlightedTags
        ? `
      highlightedTags {
        ${highlightedTagGQLFields(fields.highlightedTags)}
      }

    `
        : ``
    }
    ${
      fields.seoDetail
        ? `
      seoDetail {
        ${spaceSeoDetailGQLFields(fields.seoDetail)}
      }
    `
        : ``
    }
    ${
      fields.createdBy
        ? `
      createdBy {
        ${memberGQLFields(fields.createdBy)}
      }
    `
        : ``
    }
    ${
      fields.collection
        ? `
      collection {
        ${collectionGQLFields(fields.collection)}
      }
    `
        : ``
    }
    ${
      fields.authMemberProps
        ? `
      authMemberProps {
        ${spaceAuthMemberPropsGQLFields(fields.authMemberProps)}
      }
    `
        : ``
    }
  `
}
