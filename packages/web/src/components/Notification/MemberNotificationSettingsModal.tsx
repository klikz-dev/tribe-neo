import { NotificationChannel, Space } from '@tribeplatform/gql-client/types'
import {
  useMemberNotificationSettings,
  useUpdateSpaceNotificationSettings,
} from '@tribeplatform/react-sdk/hooks'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { NotificationPreferences } from './NotificationPerferences'
import { NotificationPreferencesChannelOverride } from './NotificationPreferencesChannelOverride'

export const MemberNotificationSettingsModal = ({
  spaceId,
  open,
  onClose,
}: {
  spaceId: Space['id']
  open: boolean
  onClose: () => void
}) => {
  const { mutate: updateSpaceSettings } = useUpdateSpaceNotificationSettings()
  const { data: settings, isLoading } = useMemberNotificationSettings()
  const { network: networkSettings, spaces: spacesSettings } = settings || {}

  const networkSettingsEmail = networkSettings?.find(
    it => it.channel === NotificationChannel.EMAIL,
  )
  const inAppSettings = spacesSettings?.find(
    it => it.space?.id === spaceId && it.channel === NotificationChannel.IN_APP,
  )
  const emailSettings = spacesSettings?.find(
    it => it.space?.id === spaceId && it.channel === NotificationChannel.EMAIL,
  )

  if (!inAppSettings?.preference) return null

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header title="Notifications" />
      <Modal.Content>
        {isLoading && (
          <div className="h-24 flex items-center justify-center">
            <SpinnerIcon className="animate-spin" />
          </div>
        )}
        {inAppSettings?.preference && (
          <NotificationPreferences
            value={inAppSettings?.preference}
            onChange={preference => {
              updateSpaceSettings(
                {
                  channel: NotificationChannel.IN_APP,
                  spaceId,
                  input: {
                    preference,
                  },
                },
                {
                  onSuccess: () => {
                    toast({
                      title: 'Your notifications settings are updated.',
                      status: 'success',
                    })
                  },
                },
              )
            }}
          />
        )}
      </Modal.Content>

      {networkSettingsEmail?.enabled && (
        <Modal.Footer>
          <div className="w-full">
            {inAppSettings?.preference && (
              <NotificationPreferencesChannelOverride
                notificationSettings={emailSettings}
                defaultValue={inAppSettings?.preference}
                onChange={(sameAsDefault, preference) => {
                  updateSpaceSettings(
                    {
                      channel: NotificationChannel.EMAIL,
                      spaceId,
                      input: {
                        preference,
                        sameAsDefault,
                      },
                    },
                    {
                      onSuccess: () => {
                        toast({
                          title: 'Your notifications settings are updated.',
                          status: 'success',
                        })
                      },
                    },
                  )
                }}
              />
            )}
          </div>
        </Modal.Footer>
      )}
    </Modal>
  )
}
