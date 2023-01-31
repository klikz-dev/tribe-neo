import { UseQueryOptions } from 'react-query'

import { AppPublicationFields } from '@tribeplatform/gql-client'
import {
  AppPublication,
  QueryGlobalAppPublicationsArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppPublicationsKey } from '../../utils/keys'

export const useGlobalAppPublications = (options: {
  variables: QueryGlobalAppPublicationsArgs
  fields?: AppPublicationFields
  useQueryOptions?: UseQueryOptions<Array<AppPublication>>
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options || {}
  const { client } = useTribeClient()
  const AppPublicationsKey = getAppPublicationsKey(variables)

  return useQuery<Array<AppPublication>>(
    AppPublicationsKey,
    () => client.dev.appPublications(variables, fields),
    { ...useQueryOptions, enabled: !!variables?.appId },
  )
}
