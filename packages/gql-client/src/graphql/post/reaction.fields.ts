import { PostReactionDetailParticipantsArgs } from '../../types'

export type ReactionFields = {
  fields: 'basic' | 'all'
  variables: PostReactionDetailParticipantsArgs
}

export function reactionGQLFields(fields: ReactionFields): string {
  return `
    count
    reacted
    reaction

    ${
      fields?.fields === 'all'
        ? `
    participants(limit: ${fields?.variables?.limit || 25}) {
      nodes {
        participant {
          id
          name
        }
      }
    }`
        : ``
    }
  `
}
