/* eslint-disable no-restricted-imports */
import { useEffect, useState } from 'react'

import _debounce from 'lodash/debounce'
import { Random } from 'unsplash-js/dist/methods/photos/types'

import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'
import { Input } from '@tribeplatform/react-ui-kit/Input'
import { GridList } from '@tribeplatform/react-ui-kit/Layout'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import * as unsplash from '../../lib/unsplash'
import { useDebounce } from '../../utils/useDebounce'

type UnsplashImage = {
  url: string
  id: string
  creator: string
  downloadLocation: string
}

export const UnsplashPicker = ({
  onChange,
  defaultQuery = '',
}: {
  onChange?: (url: string) => void
  defaultQuery?: string
}) => {
  const [query, setQuery] = useState<string>(defaultQuery)
  const [loading, setLoading] = useState<boolean>(true)
  const [images, setImages] = useState<UnsplashImage[]>()

  const debouncedSearchTerm = useDebounce(query, 500)

  // get some random image on cdm
  useEffect(() => {
    setLoading(true)
    unsplash
      .random({
        orientation: 'landscape',
      })
      .then(result => {
        if (result.type === 'success') {
          const _images = (result.response as Random[])?.map(r => ({
            url: r.urls.small,
            id: r.id,
            creator: r.user.name,
            downloadLocation: r.links.download_location,
          }))
          setImages(_images)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // query photos
  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true)
      unsplash
        .search(debouncedSearchTerm, { orientation: 'landscape' })
        .then(result => {
          if (result.type === 'success') {
            const _images = result.response.results?.map(r => ({
              url: r.urls.small,
              id: r.id,
              creator: r.user.name,
              downloadLocation: r.links.download_location,
            }))
            setImages(_images)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [debouncedSearchTerm])
  return (
    <div className="mx-auto">
      <Input
        placeholder="Search for an image..."
        value={query}
        onChange={e => setQuery(e?.target?.value)}
      />
      {loading && (
        <div className="h-96 flex items-center justify-center">
          <SpinnerIcon className="animate-spin" />
        </div>
      )}
      {!loading && images.length > 0 && (
        <GridList className="mt-4 gap-2 h-96 overflow-auto" columns={3}>
          {images?.map(image => (
            <GridList.Item
              key={image.id}
              onClick={_debounce(() => {
                unsplash.downloadPhoto(image.downloadLocation).then(url => {
                  onChange?.(url)
                })
              }, 500)}
            >
              <div className="cursor-pointer aspect-video overflow-hidden shadow-lg rounded-md hover:opacity-80">
                <img className="object-cover" src={image.url} alt="" />
              </div>
              <div className="text-xs text-basicSurface-300 mt-1 truncate">
                by{' '}
                <Link
                  href={`https://unsplash.com/photos/${image.id}`}
                  target="_blank"
                  variant="neutral"
                  className="text-basicSurface-300"
                >
                  {image.creator}
                </Link>
              </div>
            </GridList.Item>
          ))}
        </GridList>
      )}
    </div>
  )
}
