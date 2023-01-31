import faker from 'faker'

import { Image, Media } from '@tribeplatform/gql-client/types'

export const image = (customData: Partial<Image> = {}): Image => {
  const url = faker.image.imageUrl(50, 50, 'people', true)

  const defaultData: Media = {
    url,
    downloadUrl: url,
    id: `image-${faker.datatype.number()}`,
    width: faker.datatype.number({ min: 500, max: 1500 }),
    height: faker.datatype.number({ min: 500, max: 1500 }),
    cropX: 0,
    cropY: 0,
    cropZoom: 1,
    dominantColorHex: faker.internet.color(),
    dpi: 96,
    urls: {
      thumb: faker.image.imageUrl(200, 200),
      small: faker.image.imageUrl(500, 500),
      medium: faker.image.imageUrl(1000, 1000),
      large: faker.image.imageUrl(2000, 2000),
      full: faker.image.imageUrl(),
    },
  }
  return { ...defaultData, ...customData }
}
