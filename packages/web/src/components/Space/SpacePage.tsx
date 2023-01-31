import { useEffect } from 'react'

import Helmet from 'react-helmet'

import { useAuthToken, useSpace } from '@tribeplatform/react-sdk/hooks'
import { SlateRenderer } from '@tribeplatform/slate-kit/components'

import { tracker } from '../../lib/snowplow'
import cryptoJson from '../../samples/hack/crypto.json'
import sampleSpaceSlate from '../../samples/space-slate.json'

export type SpacePageProps = {
  slug: string
}

export const SpacePage = ({ slug }: SpacePageProps) => {
  const {
    data: { network },
  } = useAuthToken()
  const { data: space } = useSpace({
    variables: {
      slug,
    },
    fields: 'default',
  })

  const title = `${space?.name} - ${network?.name}`

  useEffect(() => {
    tracker.setTarget({ spaceId: space?.id })
    tracker.trackPageView(title)
    return () => tracker.setTarget({ spaceId: undefined })
  }, [])

  if (!space) return null

  const { description } = space

  const slate = { ...sampleSpaceSlate }
  if (Object.keys(cryptoJson).includes(space.slug)) {
    slate.components = slate.components.map(c =>
      c.name === 'Iframe'
        ? {
            ...c,
            props: {
              src: cryptoJson[space.slug] || cryptoJson.btc,
              hidden: false,
              height: 200,
            },
          }
        : c,
    )
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        {description ? <meta name="description" content={description} /> : null}
        {description ? (
          <meta property="og:description" content={description} />
        ) : null}
        {description ? (
          <meta name="twitter:description" content={description} />
        ) : null}
      </Helmet>
      <SlateRenderer slate={slate} additionalContext={{ space }} />
    </>
  )
}
