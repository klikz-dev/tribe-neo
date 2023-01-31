import { useLocation } from 'wouter'

import { App, StoreItemStatus } from '@tribeplatform/gql-client/types'
import { useGlobalDeleteApp } from '@tribeplatform/react-sdk/hooks'
import { ActionPanel } from '@tribeplatform/react-ui-kit/ActionPanel'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { confirm } from '@tribeplatform/react-ui-kit/Dialog'

type DangerZoneProps = {
  app: App
}

export const DangerZone = ({ app }: DangerZoneProps) => {
  const { mutate: deleteApp } = useGlobalDeleteApp()
  const [, setLocation] = useLocation()

  const onDelete = async () => {
    const confirmed = await confirm({
      title: 'Are you sure you want to delete app?',
      proceedLabel: 'Delete',
      danger: true,
    })
    if (!confirmed) {
      return
    }

    deleteApp(
      {
        id: app?.id,
      },
      {
        onSuccess: () => {
          setLocation(`/apps`)
        },
        onError: () => {
          setLocation(`/apps`)
          // TODO return when backend is fixed
          // toast({
          //   title: 'Error',
          //   description: 'Could not delete app',
          //   status: 'error',
          // })
        },
      },
    )
  }

  return (
    <ActionPanel
      title="Danger zone"
      description={`Your app is currently ${
        app?.status === StoreItemStatus.PUBLIC ? 'public' : 'private'
      }`}
    >
      <Button variant="danger" onClick={onDelete}>
        Delete app
      </Button>
    </ActionPanel>
  )
}
