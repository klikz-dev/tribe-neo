import { useState } from 'react'

import {
  NotificationChannel,
  MutationUpdateMemberNetworkNotificationSettingsArgs,
} from '@tribeplatform/gql-client/types'
import {
  useMemberNotificationSettings,
  useUpdateNetworkNotificationSettings,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { MemberNotificationSettingsModal } from '../Notification/MemberNotificationSettingsModal'
import { SpaceImage } from '../Space/SpaceImage'

export const NotificationSettings = () => {
  const [spaceIdNotification, setSpaceIdNotification] = useState<string>()

  const { data: notificationSettings } = useMemberNotificationSettings()
  const networkEmailNotificationSetting = notificationSettings?.network?.filter(
    n => n.channel === NotificationChannel.EMAIL,
  )[0]
  const networkDesktopNotificationSetting =
    notificationSettings?.network?.filter(
      n => n.channel === NotificationChannel.DESKTOP,
    )[0]
  const networkInAppNotificationSettings = notificationSettings?.network.filter(
    n => n.channel === NotificationChannel.IN_APP,
  )[0]

  const { mutateAsync: updateNetworkNotificationSettings } =
    useUpdateNetworkNotificationSettings()

  const updateSettings = (
    variables: MutationUpdateMemberNetworkNotificationSettingsArgs,
  ) => {
    updateNetworkNotificationSettings(variables)
      .then(() => {
        toast({
          title: 'Your notification settings are updated.',
          status: 'success',
        })
      })
      .catch(() => {
        toast({
          title: 'Your notification settings cannot be updated.',
          status: 'error',
        })
      })
  }

  return (
    <div className="flex flex-col space-y-5">
      <Card>
        <Card.Header title="Notification channels" />
        <Card.Content>
          <div className="flex flex-col space-y-5">
            <FormControl.Toggle
              helperText="Get emails to find out what’s going on when you’re not online. 
                You can turn them off anytime."
              label="Email"
              name="emailUpdates"
              checked={networkEmailNotificationSetting?.enabled}
              onChange={value => {
                updateSettings({
                  channel: NotificationChannel.EMAIL,
                  input: {
                    enabled: value,
                  },
                })
              }}
            />
            <FormControl.Toggle
              helperText="Receive browser notifications in Chrome and Firefox."
              label="Desktop notification"
              name="desktopUpdates"
              onChange={value => {
                updateSettings({
                  channel: NotificationChannel.DESKTOP,
                  input: {
                    enabled: value,
                  },
                })
              }}
              checked={networkDesktopNotificationSetting?.enabled}
            />
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Header
          title="Notification types"
          description="Pick when and how you would like to be notified."
        />
        <Card.Header title="Mentions" />
        <Card.Content>
          <div className="flex flex-col space-y-5">
            <FormControl.Toggle
              label="In-app notifications"
              name="mentionsInApp"
              checked={networkInAppNotificationSettings?.mention}
              onChange={value => {
                updateSettings({
                  channel: NotificationChannel.IN_APP,
                  input: {
                    mention: value,
                  },
                })
              }}
            />
            <FormControl.Toggle
              label="Email notifications"
              name="mentionsEmail"
              checked={networkEmailNotificationSetting?.mention}
              disabled={!networkEmailNotificationSetting?.enabled}
              onChange={value => {
                updateSettings({
                  channel: NotificationChannel.EMAIL,
                  input: {
                    mention: value,
                  },
                })
              }}
            />
          </div>
        </Card.Content>
        <Card.Header title="Reactions" />
        <Card.Content>
          <div className="flex flex-col space-y-5">
            <FormControl.Toggle
              label="In-app notifications"
              name="reactionsInApp"
              checked={networkInAppNotificationSettings?.reaction}
              onChange={value => {
                updateSettings({
                  channel: NotificationChannel.IN_APP,
                  input: {
                    reaction: value,
                  },
                })
              }}
            />
            <FormControl.Toggle
              label="Email notifications"
              name="reactionsEmail"
              checked={networkEmailNotificationSetting?.reaction}
              disabled={!networkEmailNotificationSetting?.enabled}
              onChange={value => {
                updateSettings({
                  channel: NotificationChannel.EMAIL,
                  input: {
                    reaction: value,
                  },
                })
              }}
            />
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Header
          title="Spaces"
          description="Manage notification settings per space."
        />
        <Card.Content>
          <ul className="flex flex-col space-y-5">
            {notificationSettings?.spaces
              ?.filter(s => s.channel === 'IN_APP')
              .map(spaceSetting => {
                const { space } = spaceSetting || {}
                if (!space) return null
                return (
                  <li className="flex space-x-4 items-center" key={space.id}>
                    <SpaceImage size="sm" space={space} />
                    <div className="flex-grow">{space.name}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSpaceIdNotification(space.id)}
                    >
                      Manage
                    </Button>
                  </li>
                )
              })}
          </ul>
        </Card.Content>
      </Card>
      <MemberNotificationSettingsModal
        spaceId={spaceIdNotification}
        open={!!spaceIdNotification}
        onClose={() => setSpaceIdNotification(null)}
      />
    </div>
  )
}
