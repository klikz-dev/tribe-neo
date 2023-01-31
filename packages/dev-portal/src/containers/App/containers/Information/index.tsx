import { useRoute } from 'wouter'

import { useGlobalApp } from '@tribeplatform/react-sdk/hooks'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'

import { AboutPage } from './AboutPage'
import { BasicDetails } from './BasicDetails'
import { DangerZone } from './DangerZone'
import { EmptyState } from './EmptyState'
import { LoadingState } from './LoadingState'

export const Information = () => {
  const [, params] = useRoute('/apps/:appSlug/information')
  const {
    data: app,
    error,
    isFetched,
    isLoading,
  } = useGlobalApp({
    variables: { slug: params?.appSlug },
  })

  if (!isFetched || isLoading) {
    return (
      <>
        <PageHeader padding="md" title="App information" />
        <LoadingState />
      </>
    )
  }
  if (error) {
    return <EmptyState />
  }

  return (
    <>
      <PageHeader padding="md" title="App information" />
      <div className="space-y-8">
        <BasicDetails app={app} />
        <AboutPage app={app} />
        <DangerZone app={app} />
      </div>
    </>
  )
}
