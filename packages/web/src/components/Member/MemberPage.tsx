import { useEffect } from 'react'

import Helmet from 'react-helmet'

import { useAuthToken, useMember } from '@tribeplatform/react-sdk/hooks'
import { SlateRenderer } from '@tribeplatform/slate-kit/components'

import { tracker } from '../../lib/snowplow'
import sampleMemberSlate from '../../samples/member-slate.json'

type MemberPageProps = {
  id: string
}

export const MemberPage = ({ id }: MemberPageProps) => {
  const {
    data: { network },
  } = useAuthToken()
  const { data: member } = useMember({
    id,
    useQueryOptions: {
      refetchOnMount: 'always',
    },
  })

  const title = `${member?.name} - ${network?.name}`

  useEffect(() => {
    tracker.setTarget({ memberId: member?.id })
    tracker.trackPageView(title)
    return () => tracker.setTarget({ memberId: undefined })
  }, [])

  if (!member) return null

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Helmet>
      <SlateRenderer
        name="content"
        slate={sampleMemberSlate}
        type="content"
        additionalContext={{ member }}
      />
    </>
  )
}
