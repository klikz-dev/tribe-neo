import { MemberFields, memberGQLFields } from './member.fields'
import { NetworkFields, networkGQLFields } from './network.fields'
import {
  NetworkPublicInfoFields,
  networkPublicInfoGQLFields,
} from './networkPublicInfo.fields'
import { RoleFields, roleGQLFields } from './role.fields'

export type AuthTokenFields =
  | 'basic'
  | 'all'
  | 'default'
  | CustomAuthTokenFields

export interface CustomAuthTokenFields {
  member?: MemberFields
  network?: NetworkFields
  networkPublicInfo?: NetworkPublicInfoFields
  role?: RoleFields
}

const BASIC_AUTH_TOKEN_FIELDS: CustomAuthTokenFields = {}
const ALL_AUTH_TOKEN_FIELDS: CustomAuthTokenFields = {
  member: 'basic',
  network: 'basic',
  networkPublicInfo: 'basic',
  role: 'basic',
}
const DEFAULT_AUTH_TOKEN_FIELDS: CustomAuthTokenFields = {
  member: 'default',
  network: 'default',
  networkPublicInfo: {
    logo: 'all',
  },
  role: 'all',
}

export function authTokenGQLFields(fields: AuthTokenFields): string {
  if (fields === 'basic') fields = BASIC_AUTH_TOKEN_FIELDS
  if (fields === 'all') fields = ALL_AUTH_TOKEN_FIELDS
  if (fields === 'default') fields = DEFAULT_AUTH_TOKEN_FIELDS

  return `
    accessToken
    refreshToken
    ${
      fields.member
        ? `
      member {
        ${memberGQLFields(fields.member)}
      }
    `
        : ``
    }
    ${
      fields.network
        ? `
      network {
        ${networkGQLFields(fields.network)}
      }
    `
        : ``
    }
    ${
      fields.networkPublicInfo
        ? `
      networkPublicInfo {
        ${networkPublicInfoGQLFields(fields.networkPublicInfo)}
      }
    `
        : ``
    }
    ${
      fields.role
        ? `
      role {
        ${roleGQLFields(fields.role)}
      }
    `
        : ``
    }
  `
}
