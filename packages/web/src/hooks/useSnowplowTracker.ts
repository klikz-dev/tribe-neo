import { useEffect, useMemo } from 'react'

import { useLocation } from 'react-router-dom'

import { Member, Network } from '@tribeplatform/gql-client/types'

import { tracker, actorDataContext, targetDataContext } from '../lib/snowplow'

function getLang() {
  if (typeof window === 'undefined') return
  if (Array.isArray(navigator?.languages)) return navigator.languages[0]
  return navigator?.language
}

const regexFilterPage = new RegExp('\\/(member|post|space)\\/')

export const useSnowplowTracker = ({
  member,
  network,
}: {
  member: Member
  network: Network
}): void => {
  const location = useLocation()

  const { id: networkId, organizationId } = network || {}
  const target: targetDataContext = useMemo(
    () => ({
      organizationId: organizationId || '',
      networkId,
    }),
    [networkId, organizationId],
  )

  const actor: actorDataContext = {
    id: member?.id || '',
    roleId: member?.role?.id || '',
    roleType: member?.role?.type || '',
    locale: member?.attributes?.locale || getLang(),
  }

  const pageView = pageTile => {
    tracker.trackPageView(pageTile)
  }

  useEffect(() => {
    tracker.setActor(actor)
    tracker.setTarget(target)
    if (!regexFilterPage.test(location.pathname)) {
      pageView(location)
    }
  }, [location.pathname])
}
