import axios from 'axios'

import { AuthToken } from '@tribeplatform/gql-client/types'
import { useTribeClient } from '@tribeplatform/react-sdk'
import { useNetwork } from '@tribeplatform/react-sdk/hooks'

export const useRefreshToken = () => {
  const { data: network } = useNetwork()
  const { client } = useTribeClient()

  const update = async ({
    refreshToken,
  }: {
    refreshToken: string
  }): Promise<AuthToken | undefined> => {
    try {
      const response = await axios.post<AuthToken>('/api/auth/refresh-token', {
        refreshToken,
        networkDomain: network.domain,
      })

      if (response?.data) {
        client.setToken(response.data.accessToken)

        return response.data
      }
    } catch (e) {
      console.warn('Could not update the refresh token', e)
    }
  }

  return {
    update,
  }
}
