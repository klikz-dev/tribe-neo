import { UseQueryOptions } from 'react-query'

import { MemberFields, Types } from '@tribeplatform/gql-client'
import { QueryLeaderboardArgs } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getLeaderboardKey } from '../../utils/keys'

export const useLeaderboard = (options: {
  args: QueryLeaderboardArgs
  fields?: MemberFields
  useQueryOptions?: UseQueryOptions<Types.Member[]>
}) => {
  const { args, fields = 'default', useQueryOptions } = options
  const { client } = useTribeClient()
  const leaderboardKey = getLeaderboardKey(args)

  return useQuery<Types.Member[]>(
    leaderboardKey,
    () => client.report.getLeaderboard(args, fields),
    useQueryOptions,
  )
}
