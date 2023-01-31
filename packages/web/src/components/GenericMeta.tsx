import { emojiIndex } from 'emoji-mart-virtualized'
import Helmet from 'react-helmet'
import { WithContext } from 'schema-dts'
import serialize from 'serialize-javascript'

import { Emoji, Image, Media } from '@tribeplatform/gql-client/types'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'

import { isIOS } from '../utils/device'
import { truncate } from '../utils/string'

const IMGIX_ROUNDED_IMAGE_PARAMS = '&ar=1:1&mask=ellipse&fit=crop'

type MetaTag =
  | {
      property: string
      content: string | null
    }
  | {
      name: string
      content: string | null
    }

type SeoPageProps = {
  title: string
  description?: string
  icon?: Media | null
  appendNetworkName?: boolean
  additionalMeta?: MetaTag[]
  jsonld?: WithContext<any>
}

const getIcon = (media?: Media, size: keyof Image['urls'] = 'thumb') => {
  if (media && (media as any).__typename === 'Image') {
    const img = media as Image
    return `${img.urls[size]}${IMGIX_ROUNDED_IMAGE_PARAMS}`
  }
  if (media && (media as any)?.__typename === 'Emoji') {
    try {
      const nativeEmoji = emojiIndex
        .search((media as Emoji).text)
        ?.map(o => (o as any).native)?.[0]
      const svg = `<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${nativeEmoji}</text></svg>`
      return `data:image/svg+xml,${svg}`
    } catch (e) {
      // ignore
    }
  }
  return '/favicon.ico'
}

export const GenericMeta = ({
  seo,
  path,
  origin,
}: {
  seo?: SeoPageProps
  path?: string
  origin?: string
}) => {
  const isClient = typeof window !== 'undefined'
  const { data: authToken } = useAuthToken()
  const { networkPublicInfo, network } = authToken || {}

  if (!networkPublicInfo) return null

  const _origin = origin || (isClient && window.location.origin)

  let title = networkPublicInfo?.name || ''
  title = truncate(title, 50)

  let description =
    network?.description ||
    `Join ${networkPublicInfo?.name} to start sharing and connecting with like-minded people.`
  description = truncate(description, 160)

  const brandColor = network?.brandColor || '#FFFFFF'
  const icon = network?.favicon
  const defaultIcon = getIcon(icon)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="icon" href={defaultIcon} />
      <link rel="icon" sizes="192x192" href={getIcon(icon, 'small')} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={getIcon(icon, 'thumb')}
      />

      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-title" content={title} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link
        rel="canonical"
        href={_origin && path ? _origin + path : undefined}
      />

      {/* IE */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="msapplication-navbutton-color" content={brandColor} />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="msapplication-TileColor" content={brandColor} />
      <link
        rel="msapplication-TileImage"
        sizes="152x152"
        href={getIcon(icon, 'thumb')}
      />

      {/* Add to homescreen for Chrome on Android */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content={brandColor} />

      {/* iOS */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-touch-fullscreen" content="yes" />
      {/* <meta name="apple-touch-startup-image" content="" /> */}

      {/* General OpenGraph */}
      <meta key="og:type" property="og:type" content="website" />
      <meta property="og:site_name" content={networkPublicInfo?.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:url"
        content={_origin && path ? _origin + path : undefined}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:url"
        content={_origin && path ? _origin + path : undefined}
      />
      {isIOS() && (
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      )}
      <meta name="format-detection" content="telephone=no" />

      {seo?.additionalMeta?.map(meta => {
        if ('name' in meta) {
          return (
            <meta
              key={meta.name}
              name={meta.name}
              content={meta.content || undefined}
            />
          )
        }

        return (
          <meta
            key={meta.property}
            property={meta.property}
            content={meta.content || undefined}
          />
        )
      })}
      {seo?.jsonld && (
        <script type="application/ld+json">
          {serialize(seo?.jsonld, { isJSON: true })}
        </script>
      )}

      <link
        rel="manifest"
        href={`data:application/manifest+json,${JSON.stringify({
          name: title,
          short_name: title,
          display: 'standalone',
          orientation: 'portrait',
          start_url: `${_origin || ''}/`,
          gcm_sender_id: '1081893321319',
          icons: [
            {
              src: getIcon(icon, 'small'),
              sizes: '192x192',
            },
            {
              src: getIcon(icon, 'thumb'),
              sizes: '512x512',
            },
          ],
        })}`}
      />
    </Helmet>
  )
}
