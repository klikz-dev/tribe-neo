import { App } from '@tribeplatform/gql-client/types'
import {
  useAppNetworkSettings,
  useUpdateAppNetworkSettings,
} from '@tribeplatform/react-sdk/hooks'

import { AppSettingsProps } from '../types'
import { AmplitudeSettings } from './AmplitudeSettings'
import { CustomCodeSnippetSettings } from './CustomCodeSnippetSettings'
import { EmptySettings } from './EmptySettings'
import { GoogleAnalyticsSettings } from './GoogleAnalyticsSettings'
import { IntercomSettings } from './IntercomSettings'
import { ZapierSettings } from './ZapierSettings'

enum APPS {
  ZAPIER = 'zapier',
  CUSTOM_CODE_SNIPPET = 'custom-code-snippet',
  AMPLITUDE = 'amplitude',
  GOOGLE_ANALYTICS = 'google-analytics',
  INTERCOM = 'intercom',
}

export const AppSettings = ({ app }: { app: App }) => {
  const { data: appSettingsString, isLoading } = useAppNetworkSettings({
    variables: {
      appId: app?.id,
    },
  })
  const { mutateAsync: updateSettings, isLoading: isUpdating } =
    useUpdateAppNetworkSettings()

  const appSettings = JSON.parse(appSettingsString || null)

  const appSettingsProps: AppSettingsProps = {
    app,
    appSettings,
    updateSettings,
    isUpdating,
  }

  if (isLoading) return null

  switch (app?.slug) {
    case APPS.ZAPIER:
      return <ZapierSettings {...appSettingsProps} />
    case APPS.CUSTOM_CODE_SNIPPET:
      return <CustomCodeSnippetSettings {...appSettingsProps} />
    case APPS.AMPLITUDE:
      return <AmplitudeSettings {...appSettingsProps} />
    case APPS.GOOGLE_ANALYTICS:
      return <GoogleAnalyticsSettings {...appSettingsProps} />
    case APPS.INTERCOM:
      return <IntercomSettings {...appSettingsProps} />
    default:
      return <EmptySettings />
  }
}
