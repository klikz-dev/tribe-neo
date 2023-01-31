import {
  QueryLeaderboardArgs,
  QueryMemberArgs,
  QueryMembersArgs,
  QuerySpaceMembersArgs,
} from '@tribeplatform/gql-client/types'

export const MEMBER_KEY = 'member'
export const MEMBERS_KEY = 'members'
export const UPDATE_MEMBER_KEY = 'updateMember'
export const DELETE_MEMBER_KEY = 'deleteMember'
export const LEADERBOARD_KEY = 'leaderBoard'

export const getMemberKey = (args: QueryMemberArgs) => [MEMBER_KEY, args]
export const getMembersKey = (
  args?: QueryMembersArgs | QuerySpaceMembersArgs,
) => (args ? [MEMBERS_KEY, args] : [MEMBERS_KEY])
export const getUpdateMemberKey = () => UPDATE_MEMBER_KEY
export const getDeleteMemberKey = () => DELETE_MEMBER_KEY
export const getLeaderboardKey = (args: QueryLeaderboardArgs) => [
  LEADERBOARD_KEY,
  args,
]
