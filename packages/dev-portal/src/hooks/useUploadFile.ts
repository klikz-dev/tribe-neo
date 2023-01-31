import { useCallback, useState } from 'react'

import { Image, UploadImagesArgs } from '@tribeplatform/gql-client/types'
import { useGlobalCreateImages } from '@tribeplatform/react-sdk/hooks'

export type useUploadFileProps = () => {
  loading: boolean
  loadingFile: Image
  uploadFile: (
    file: File,
    updater: (file: Image) => Promise<void> | void,
  ) => Promise<void>
}

export const useUploadFile: useUploadFileProps = () => {
  const { mutateAsync: createImages } = useGlobalCreateImages()
  const [loadingFile, setLoadingFile] = useState<Image | undefined>()

  const setLoading = useCallback((file?: File) => {
    if (!file) {
      setLoadingFile(undefined)
      return
    }
    const fr = new FileReader()
    fr.onload = () => {
      setLoadingFile({ url: fr.result } as Image)
    }
    fr.readAsDataURL(file)
  }, [])

  const uploadFile = useCallback(
    async (file, updater) => {
      setLoading(file)
      const args: UploadImagesArgs[] = [{ file }]
      try {
        const uploadedImage = await createImages(args, {
          onError: () => {
            setLoading()
          },
        })
        if (typeof updater === 'function') {
          await updater(uploadedImage?.[0])
        }
      } catch (e) {
        console.log(e)
      }
      setLoading()
    },
    [createImages, setLoading],
  )
  return {
    uploadFile,
    loadingFile,
    loading: !!loadingFile,
  }
}
