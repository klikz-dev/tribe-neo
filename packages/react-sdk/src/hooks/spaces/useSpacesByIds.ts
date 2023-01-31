import { SpaceFields, Types } from '@tribeplatform/gql-client'

import { useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSpacesByIdsKey } from '../../utils/keys'

export const useSpacesByIds = (options?: {
  variables: Types.QuerySpacesByIdsArgs
  fields?: SpaceFields
  useQueryOptions?: UseQueryOptions<Types.Space[]>
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options || {}
  const { client } = useTribeClient()
  const spacesByIdsKey = getSpacesByIdsKey(variables)

  return useQuery<Types.Space[]>(
    spacesByIdsKey,
    () => client?.spaces.listByIds(variables, fields),
    useQueryOptions,
  )
}
