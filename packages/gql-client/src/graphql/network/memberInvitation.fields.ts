import { MemberFields, memberGQLFields } from './member.fields'

export type MemberInvitationFields =
  | 'basic'
  | 'all'
  | CustomMemberInvitationFields

export interface CustomMemberInvitationFields {
  invitee?: MemberFields
  inviter?: MemberFields
}

const BASIC_MEMBER_INVITATION_FIELDS: CustomMemberInvitationFields = {}
const ALL_MEMBER_INVITATION_FIELDS: CustomMemberInvitationFields = {
  invitee: 'basic',
  inviter: 'basic',
}

export function memberInvitationGQLFields(fields: MemberInvitationFields) {
  if (fields === 'basic') fields = BASIC_MEMBER_INVITATION_FIELDS
  if (fields === 'all') fields = ALL_MEMBER_INVITATION_FIELDS
  return `
    createdAt
    expiresAt
    id
    invitationMessage
    inviteeId
    inviteeEmail
    inviteeName
    inviterId
    joinedAt
    status
    ${
      fields.invitee
        ? `
      invitee {
        ${memberGQLFields(fields.invitee)}
      }
    `
        : ``
    }
    ${
      fields.inviter
        ? `
      inviter {
        ${memberGQLFields(fields.inviter)}
      }
    `
        : ``
    }
  `
}
