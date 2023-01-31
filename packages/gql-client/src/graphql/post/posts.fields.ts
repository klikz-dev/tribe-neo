/* eslint-disable import/no-cycle */
import { PostAuthMemberPropsFields, postAuthMemberPropsGQLFields } from '..'
import { EmbedFields, embedGQLFields, MediaURLFields } from '../media'
import { MemberFields, memberGQLFields } from '../network'
import {
  SpaceFields,
  spaceGQLFields,
  SpaceMemberFields,
  spaceMemberGQLFields,
} from '../space'
import { FileFields, fileGQLFields } from './file.fields'
import { PostTypeFields, postTypeGQLFields } from './postType.fields'
import { ReactionFields, reactionGQLFields } from './reaction.fields'
import { RepliesFields } from './replies.fields'
import { TagFields, tagGQLFields } from './tag.fields'

export type PostFields =
  | 'basic'
  | 'all'
  | 'default'
  | 'withReply'
  | CustomPostFields

export interface CustomPostFields {
  postType?: PostTypeFields
  owner?: SpaceMemberFields
  createdBy?: SpaceMemberFields
  tags?: TagFields
  embeds?: EmbedFields
  mentions?: MemberFields
  attachments?: FileFields
  space?: SpaceFields
  image?: MediaURLFields
  banner?: MediaURLFields
  reactions?: ReactionFields
  replies?: RepliesFields
  authMemberProps?: PostAuthMemberPropsFields
  repliedTo?: PostFields
  repliedTos?: PostFields
}

const BASIC_POST_FIELDS: CustomPostFields = {
  owner: 'all',
}
const ALL_POST_FIELDS: CustomPostFields = {
  authMemberProps: 'all',
  postType: 'basic',
  owner: 'all',
  createdBy: 'basic',
  tags: 'basic',
  attachments: 'basic',
  embeds: 'basic',
  mentions: 'basic',
  space: 'basic',
  reactions: { fields: 'basic', variables: { limit: 25 } },
  replies: { fields: 'basic', variables: { limit: 2 } },
  repliedTos: 'basic',
  repliedTo: 'basic',
}
const DEFAULT_POST_FIELDS: CustomPostFields = {
  tags: 'basic',
  owner: {
    member: { profilePicture: 'basic' },
  },
  postType: 'basic',
  embeds: 'basic',
  mentions: 'basic',
  space: 'default',
  attachments: 'basic',
  authMemberProps: 'all',
  reactions: { fields: 'all', variables: { limit: 25 } },
  repliedTos: 'basic',
  replies: {
    fields: {
      authMemberProps: 'all',
      embeds: 'basic',
      mentions: 'basic',
      attachments: 'basic',
      owner: {
        member: { profilePicture: 'basic' },
      },
      reactions: { fields: 'all', variables: { limit: 25 } },
    },
    variables: {
      limit: 2,
      reverse: true,
    },
  },
}
const WITH_REPLY_POST_FIELDS: CustomPostFields = {
  ...DEFAULT_POST_FIELDS,
  replies: {
    fields: 'default',
    variables: { limit: 2, reverse: true },
  },
}

export function postGQLFields(fields: PostFields): string {
  if (fields === 'basic') fields = BASIC_POST_FIELDS
  if (fields === 'all') fields = ALL_POST_FIELDS
  if (fields === 'default') fields = DEFAULT_POST_FIELDS
  if (fields === 'withReply') fields = WITH_REPLY_POST_FIELDS

  return `
    id
    slug
    mappingFields {
      key
      type
      value
    }
    followersCount
    postTypeId
    reactionsCount
    hasMoreContent
    isAnonymous
    isHidden
    shortContent
    createdAt
    ownerId
    createdById
    status
    spaceId
    imageIds
    pinnedInto
    repliesCount
    totalRepliesCount
    repliedToIds
    repliedToId
    topicIds
    title
    embedIds
    mentionedMembers
    primaryReactionType
    ${
      fields.attachments
        ? `
        attachments {
          ${fileGQLFields()}
        }
      `
        : ''
    }
    ${
      fields.authMemberProps
        ? `
      authMemberProps {
        ${postAuthMemberPropsGQLFields(fields.authMemberProps)}
      }`
        : ``
    }
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
      fields.owner
        ? `
      owner {
        ${spaceMemberGQLFields(fields.owner)}
      }
    `
        : ``
    }
    ${
      fields.createdBy
        ? `
      createdBy {
        ${spaceMemberGQLFields(fields.createdBy)}
      }
    `
        : ``
    }
    ${
      fields.tags
        ? `
      tags {
        ${tagGQLFields(fields.tags)}
      }
    `
        : ``
    }
    ${
      fields.embeds
        ? `
      embeds {
        ${embedGQLFields(fields.embeds)}
      }
    `
        : ``
    }
    ${
      fields.mentions
        ? `
      mentions {
        ${memberGQLFields(fields.mentions)}
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
      fields.reactions
        ? `
      reactions {
        ${reactionGQLFields(fields.reactions)}
      }
    `
        : ``
    }
    ${
      fields.replies?.fields
        ? `
      replies(limit: ${fields.replies.variables.limit || 1}, reverse: ${
            fields.replies?.variables?.reverse || false
          } ) {
        edges {
          cursor
          node {
            ${postGQLFields(fields.replies.fields)}
          }
        }
        nodes {
          ${postGQLFields(fields.replies.fields)}
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
      }
    `
        : ``
    }
    ${
      fields.repliedTo
        ? `
      repliedTo {
        ${postGQLFields(fields.repliedTo)}
      }
    `
        : ``
    }
    ${
      fields.repliedTos
        ? `
      repliedTos {
        ${postGQLFields(fields.repliedTos)}
      }
    `
        : ``
    }
  `
}
