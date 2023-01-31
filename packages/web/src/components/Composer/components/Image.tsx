import { useEffect, useState, useCallback } from 'react'

import clsx from 'clsx'

import { Image } from '@tribeplatform/gql-client/types'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'

import { Media } from '../@types'
import { ImageBlotClassName } from '../constants'
import { ComposerMediaCompleteEvent } from '../hooks/useMediaUploadStatus'
import { ComposerMediaClose } from './media/MediaClose'
import { ComposerMediaError } from './media/MediaError'

const staticProps = {
  imageStyles: {
    minHeight: 50,
  },
}

export interface ComposerImageProps {
  imageProps?: Record<string, string>
  isReadOnly: boolean
  src: string | null
  uploadPromise?: Promise<Media[]>
  file?: File
}

export const ComposerImage = ({
  imageProps = {},
  isReadOnly,
  src,
  uploadPromise,
  file,
}: ComposerImageProps) => {
  const [loadingImage, setLoadingImage] = useState<Image | undefined>()
  const [loading, setLoading] = useState(!!uploadPromise)
  const [error, setError] = useState(false)
  const [source, setSource] = useState(src)
  const [dataId, setDataId] = useState(imageProps['data-id'] || null)

  const handleClick = useCallback(e => {
    const { target } = e
    const quillRoot = target.closest('.ql-editor')
    if (quillRoot) {
      quillRoot.dispatchEvent(new CustomEvent(ComposerMediaCompleteEvent))
    }

    const blot = target.closest('p') || target.closest(`.${ImageBlotClassName}`)
    blot.remove()
  }, [])

  const setLoadingFile = useCallback((file?: File) => {
    if (!file) {
      setLoadingImage(undefined)
      return
    }
    const fr = new FileReader()
    fr.onload = () => {
      setLoadingImage({ url: fr.result } as Image)
    }
    fr.readAsDataURL(file)
  }, [])

  useEffect(() => {
    setLoadingFile(file)

    if (uploadPromise) {
      uploadPromise
        .then(result => {
          if (!result[0]) return

          const { mediaUrl, mediaId } = result[0]

          setDataId(mediaId)
          setSource(mediaUrl)
        })
        .catch(() => {
          setError(true)
        })
        .finally(() => {
          setLoading(false)
          setLoadingFile()
        })
    }
  }, [])

  return (
    <div className="relative">
      {error && <ComposerMediaError handleClose={handleClick} />}

      {!error && (
        <div
          className={clsx(
            ImageBlotClassName,
            'flex items-center justify-center mt-5 bg-surface-100 ignore-typography',
            {
              'opacity-70': loading,
              'bg-surface-200 h-80 w-full my-3': loading && !loadingImage?.url,
            },
          )}
        >
          {!isReadOnly && <ComposerMediaClose onClick={handleClick} />}

          {(source || loadingImage?.url) && (
            <img
              width={imageProps?.width ? `${imageProps.width}` : 'auto'}
              height={imageProps?.height ? `${imageProps.height}` : 'auto'}
              src={source || loadingImage?.url}
              data-id={dataId}
              className={clsx(
                isReadOnly ? 'cursor-pointer' : 'cursor-text',
                'max-h-120',
              )}
              style={staticProps.imageStyles}
              alt=""
            />
          )}

          {loading && <SpinnerIcon className="animate-spin absolute h-9 w-9" />}
        </div>
      )}
    </div>
  )
}
