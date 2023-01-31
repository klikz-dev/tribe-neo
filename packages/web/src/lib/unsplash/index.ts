import { createApi } from 'unsplash-js'
// eslint-disable-next-line no-restricted-imports
import { RandomParams } from 'unsplash-js/dist/methods/photos'

import { RuntimeConfigs } from '../../config'

const unsplash = createApi({ accessKey: RuntimeConfigs.UNSPLASH_ACCESS_KEY })

export const search = (query, params = {}) =>
  unsplash.search.getPhotos({
    query,
    page: 1,
    perPage: 12,
    ...params,
  })

export const random = (params?: RandomParams) =>
  unsplash.photos.getRandom({
    count: 12,
    featured: true,
    ...params,
  })

export const downloadPhoto = (downloadLocation: string): Promise<string> =>
  unsplash.photos
    .trackDownload({
      downloadLocation,
    })
    .then(res => res.response.url)

const toDataURL = url => {
  return fetch(url)
    .then(response => {
      return response.blob()
    })
    .then(blob => {
      return URL.createObjectURL(blob)
    })
}

export const downloadFile = async (src: string): Promise<void> => {
  try {
    const a = document.createElement('a')
    a.href = await toDataURL(src)
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error while downloading image', e.message)
  }
}
