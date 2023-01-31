import { ModerationItemReporterFields } from '@tribeplatform/gql-client'
import {
  PaginatedModerationItemReporter,
  QueryModerationItemReportersArgs,
} from '@tribeplatform/gql-client/types'

import { UseInfiniteQueryOptions, useInfiniteQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getModerationItemReportersKey } from '../../utils/keys'

export const useModerationItemReporters = (options: {
  variables: QueryModerationItemReportersArgs
  fields?: ModerationItemReporterFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedModerationItemReporter>
}) => {
  const { variables, fields = 'basic', useInfiniteQueryOptions } = options || {}
  const { client } = useTribeClient()
  const moderationItemReportersKey = getModerationItemReportersKey(variables)

  return useInfiniteQuery<PaginatedModerationItemReporter>(
    moderationItemReportersKey,
    ({ pageParam: after }) =>
      client?.moderation.getItemReporters({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
