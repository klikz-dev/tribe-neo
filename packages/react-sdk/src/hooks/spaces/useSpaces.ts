import { Types, SpaceFields } from '@tribeplatform/gql-client'

import { UseInfiniteQueryOptions, useInfiniteQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSpacesKey } from '../../utils/keys'

export const DefaultSpacesLimit = 10

export const useSpaces = (options?: {
  variables?: Types.QuerySpacesArgs
  fields?: SpaceFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<Types.PaginatedSpace>
}) => {
  const {
    variables = { limit: DefaultSpacesLimit },
    fields = 'basic',
    useInfiniteQueryOptions,
  } = options || {}
  const { client } = useTribeClient()
  const spacesKey = getSpacesKey(variables)

  return useInfiniteQuery<Types.PaginatedSpace>(
    spacesKey,
    ({ pageParam: after }) =>
      client?.spaces.list({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
