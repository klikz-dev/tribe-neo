import {
  App,
  AppInstallation,
  AppInstallationStatus,
  PermissionContext,
} from '@tribeplatform/gql-client/types'
import {
  useAuthToken,
  useInstallApp,
  useUninstallApp,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

export const AppHeaderActions = ({
  app,
  appInstallation,
}: {
  app: App
  appInstallation: AppInstallation
}) => {
  const { mutateAsync: installApp, isLoading: isInstalling } = useInstallApp()
  const { mutateAsync: uninstallApp, isLoading: isUninstalling } =
    useUninstallApp()

  const { data: authToken } = useAuthToken()
  const installed = appInstallation?.status === AppInstallationStatus.ENABLED
  if (installed) {
    return (
      <Button
        variant="outline"
        loading={isUninstalling}
        onClick={() => {
          uninstallApp({
            appInstallationId: appInstallation?.id,
            reason: '',
          })
            .then(() => {
              toast({
                title: `${app?.name} has been successfully uninstalled`,
                status: 'success',
              })
            })
            .catch(() => {
              toast({
                title: `Unable to uninstall ${app?.name}`,
                status: 'error',
              })
            })
        }}
      >
        Uninstall
      </Button>
    )
  }
  return (
    <Button
      variant="primary"
      loading={isInstalling}
      onClick={() => {
        installApp({
          appId: app?.id,
          input: {
            entityId: authToken?.network?.id,
            context: PermissionContext.NETWORK,
          },
        })
          .then(() => {
            toast({
              title: `${app?.name} has been successfully installed`,
              status: 'success',
            })
          })
          .catch(() => {
            toast({
              title: `Unable to install ${app?.name}`,
              status: 'error',
            })
          })
      }}
    >
      Install this app
    </Button>
  )
}
