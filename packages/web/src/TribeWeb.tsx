import { FC } from 'react'

import { useAuthToken } from '@tribeplatform/react-sdk/hooks'

import { AppInitialProps } from './@types'
import { useFullStory } from './hooks/useFullStory'
import { useSnowplowTracker } from './hooks/useSnowplowTracker'
import { useBootIntercom } from './lib/intercom/useBootIntercom'

export const TribeWeb: FC<{ pageProps: AppInitialProps }> = ({
  children,
  pageProps,
}) => {
  const {
    data: { member, network },
  } = useAuthToken()

  useSnowplowTracker({ member, network })

  useBootIntercom({ userHash: pageProps?.intercomUserHash })
  useFullStory()

  return <>{children}</>
}
