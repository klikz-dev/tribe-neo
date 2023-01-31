import { MediaFields, mediaGQLFields } from '../media'
import {
  MemberAuthMemberPropsFields,
  memberAuthMemberPropsGQLFields,
} from '../permission'
import { roleGQLFields, RoleFields } from './role.fields'

export type MemberFields = 'basic' | 'all' | 'default' | CustomMemberFields

export interface CustomMemberFields {
  profilePicture?: MediaFields
  banner?: MediaFields
  authMemberProps?: MemberAuthMemberPropsFields
  role?: RoleFields
  fields?: 'basic' | 'all'
  sessions?: 'basic'
  activeSession?: 'basic'
}

const BASIC_MEMBER_FIELDS: CustomMemberFields = {}
const ALL_MEMBER_FIELDS: CustomMemberFields = {
  profilePicture: 'basic',
  banner: 'basic',
  authMemberProps: 'basic',
  fields: 'basic',
  sessions: 'basic',
  activeSession: 'basic',
}
const DEFAULT_MEMBER_FIELDS: CustomMemberFields = {
  authMemberProps: 'all',
  banner: 'all',
  profilePicture: 'all',
  role: 'basic',
  fields: 'all',
}

export function memberGQLFields(fields: MemberFields): string {
  if (fields === 'basic') fields = BASIC_MEMBER_FIELDS
  if (fields === 'all') fields = ALL_MEMBER_FIELDS
  if (fields === 'default') fields = DEFAULT_MEMBER_FIELDS

  return `
    displayName
    name
    id
    attributes {
      locale
    }
    profilePictureId
    bannerId
    status
    username
    email
    emailStatus
    newEmail
    tagline
    lastSeen
    createdAt
    updatedAt
    ${
      fields.role
        ? `
        role {
          ${roleGQLFields(fields.role)}
        }
      `
        : ''
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
      fields.profilePicture
        ? `
      profilePicture {
        ${mediaGQLFields(fields.profilePicture)}
      }
    `
        : ``
    }
    ${
      fields.authMemberProps
        ? `
      authMemberProps {
        ${memberAuthMemberPropsGQLFields(fields.authMemberProps)}
      }
    `
        : ``
    }
    ${
      fields.fields
        ? `
      fields {
        fields {
          key
          value
        }
      }
    `
        : ``
    }
    ${
      fields.sessions
        ? `
      sessions {
        active
        country
        createdAt
        deviceBrand
        id
        ip
        lastActivityAt
        os
        osVersion        
      }
    `
        : ``
    }    
    ${
      fields.activeSession
        ? `
      activeSession {
        active
        country
        createdAt
        deviceBrand
        id
        ip
        lastActivityAt
        os
        osVersion        
      }
    `
        : ``
    }      
  `
}
