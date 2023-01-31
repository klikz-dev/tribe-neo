import { useEffect } from 'react'

import { initializeApp } from 'firebase/app'
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from 'firebase/messaging'

import { NotificationChannel } from '@tribeplatform/gql-client/types'
import {
  useMemberNotificationSettings,
  useUpdateNetworkNotificationSettings,
} from '@tribeplatform/react-sdk/hooks'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { useLogin } from '../hooks/useLogin'

export const DesktopNotification = () => {
  const { isLoggedIn } = useLogin()
  const { mutate: updateNetworkNotificationSettings } =
    useUpdateNetworkNotificationSettings()
  const { data: notificationSettings } = useMemberNotificationSettings({
    useQueryOptions: {
      enabled: isLoggedIn,
    },
  })
  const networkDesktopNotificationSetting =
    notificationSettings?.network?.filter(
      n => n.channel === NotificationChannel.DESKTOP,
    )[0]

  useEffect(() => {
    if (!isLoggedIn) return
    if (!networkDesktopNotificationSetting?.enabled) return

    const firebaseConfig = {
      apiKey: 'AIzaSyAOg7DiR0iacQPO7jlix_6MgWe3JXhfGtg',
      authDomain: 'tribeplatform.firebaseapp.com',
      projectId: 'tribeplatform',
      storageBucket: 'tribeplatform.appspot.com',
      messagingSenderId: '1081893321319',
      appId: '1:1081893321319:web:baed5f30cea3272be9f2c2',
      measurementId: 'G-VQ1KRW18TJ',
    }
    const vapidKey =
      'BLxlLxenGuNYPnbQdGFuKxqCqDrMPWH_4A_dbi6pSCHBrdQs6NoTZE17ujuh90XK0kPolN_K0GHeqg6cnn8lRaM'

    try {
      initializeApp(firebaseConfig)

      const messaging = getMessaging()
      if (isSupported()) {
        onMessage(messaging, payload => {
          const {
            notification: { title, body, image },
          } = payload

          toast({
            title,
            description: body,
            icon: image ? <Avatar src={image} /> : undefined,
          })
        })

        getToken(messaging, { vapidKey })
          .then(currentToken => {
            if (currentToken) {
              console.log('Device token', currentToken)
              updateNetworkNotificationSettings({
                channel: NotificationChannel.DESKTOP,
                input: {
                  enabled: true,
                  options: {
                    fcmDeviceToken: currentToken,
                  },
                },
              })
            } else {
              console.log(
                'No registration token available. Request permission to generate one.',
              )
            }
          })
          .catch(err => {
            console.log('An error occurred while retrieving token. ', err)
          })
      }
    } catch (e) {
      console.error(
        'An error occurred while initializing desktop notifications. ',
        e,
      )
    }
  }, [isLoggedIn, networkDesktopNotificationSetting?.enabled])
  return null
}
