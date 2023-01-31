import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { MemberFields, memberGQLFields } from '../network'

export function getLeaderboardGQLQuery(fields: MemberFields): DocumentNode {
  return gql`
    query getLeaderboard(
      $input: ReportInput!
    ){
      leaderboard(input: $input) {
        ${memberGQLFields(fields)}
      }
    }
  `
}
