import { UseQueryOptions } from 'react-query'

import { SpaceRoleFields } from '@tribeplatform/gql-client'
import { SpaceRole, QuerySpaceRolesArgs } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSpaceRolesKey } from '../../utils/keys'

export const useSpaceRoles = (options: {
  variables: QuerySpaceRolesArgs
  fields?: SpaceRoleFields
  useQueryOptions?: UseQueryOptions<Array<SpaceRole>>
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options
  const { client } = useTribeClient()
  const spaceRolesKey = getSpaceRolesKey(variables)

  return useQuery<Array<SpaceRole>>(
    spaceRolesKey,
    () => client.spaceRoles.list(variables, fields),
    useQueryOptions,
  )
}
