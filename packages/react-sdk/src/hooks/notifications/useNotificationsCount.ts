import { Types } from '@tribeplatform/gql-client'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getNotificationsCountKey } from '../../utils/keys'

export const useNotificationsCount = () => {
  const { client } = useTribeClient()
  const notificationsKey = getNotificationsCountKey()

  return useQuery<Types.Scalars['Float']>(notificationsKey, () =>
    client?.notifications.count(),
  )
}
