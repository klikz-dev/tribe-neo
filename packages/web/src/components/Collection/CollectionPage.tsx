import Helmet from 'react-helmet'

import { useAuthToken, useCollection } from '@tribeplatform/react-sdk/hooks'
import { SlateRenderer } from '@tribeplatform/slate-kit/components'

import sampleCollectionSlate from '../../samples/collection-slate.json'

type CollectionPageProps = {
  id: string
}

export const CollectionPage = ({ id }: CollectionPageProps) => {
  const {
    data: { network },
  } = useAuthToken()
  const { data: collection } = useCollection({
    variables: { id },
    fields: {
      space: 'all',
    },
  })

  const title = `${collection?.name} - ${network?.name}`
  const description = collection?.description
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

      <SlateRenderer
        name="content"
        slate={sampleCollectionSlate}
        type="content"
        additionalContext={{ collection }}
      />
    </>
  )
}
