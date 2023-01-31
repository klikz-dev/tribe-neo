import axios from 'axios'

import { NotificationChannel } from '@tribeplatform/gql-client/types'
import {
  useAuthToken,
  useUpdateNetworkNotificationSettings,
} from '@tribeplatform/react-sdk/hooks'

export const useLogout = () => {
  const { mutateAsync: updateNetworkNotificationSettings } =
    useUpdateNetworkNotificationSettings()
  const {
    data: { network, accessToken },
  } = useAuthToken()

  const logout = async () => {
    try {
      await Promise.allSettled([
        axios.get('/api/auth/logout', {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }),
        updateNetworkNotificationSettings({
          channel: NotificationChannel.DESKTOP,
          input: {
            enabled: false,
          },
        }),
      ])
    } catch (e) {
      console.warn('Could not logout the user')
    }
    window.location.href = network.activeSso?.logoutUrl || '/auth/login'
  }

  return {
    logout,
  }
}
