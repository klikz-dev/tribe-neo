import { UseQueryOptions } from 'react-query'

import { AppCollaboratorFields } from '@tribeplatform/gql-client'
import {
  AppCollaborator,
  QueryGlobalAppCollaboratorsArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppCollaboratorsKey } from '../../utils/keys'

export const useGlobalAppCollaborators = (options: {
  variables: QueryGlobalAppCollaboratorsArgs
  fields?: AppCollaboratorFields
  useQueryOptions?: UseQueryOptions<Array<AppCollaborator>>
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options || {}
  const { client } = useTribeClient()
  const AppCollaboratorsKey = getAppCollaboratorsKey(variables)

  return useQuery<Array<AppCollaborator>>(
    AppCollaboratorsKey,
    () => client.dev.appCollaborators(variables, fields),
    { ...useQueryOptions, enabled: !!variables?.appId },
  )
}
