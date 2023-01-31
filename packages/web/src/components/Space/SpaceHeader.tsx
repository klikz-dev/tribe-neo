import { useCallback } from 'react'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { UploadImagesArgs } from '@tribeplatform/gql-client/types'
import {
  useCreateEmojis,
  useCreateImages,
  useUpdateSpace,
} from '@tribeplatform/react-sdk/hooks'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'

import { linkToFile } from '../../lib/upload'
import { PopoverImagePicker } from '../ImagePicker/ImagePicker'
import { SpaceActionButtons } from './SpaceActionButtons'
import { SpaceBackgroundImage } from './SpaceBackgroundImage'
import { SpaceImage } from './SpaceImage'
import { SpacePrivacyIcon } from './SpacePrivacyIcon'

export const SpaceHeader = ({ space }) => {
  const { mutateAsync: createEmojis } = useCreateEmojis()
  const { mutateAsync: createImages } = useCreateImages()
  const { mutate: updateSpace } = useUpdateSpace({ slug: space.slug })
  const [canUpdateSpace] = hasScopesPermission(space, ['updateSpace'])

  const uploadFile = useCallback(
    async file => {
      const args: UploadImagesArgs[] = [{ file }]
      const uploadedImage = await createImages(args)
      if (uploadedImage?.[0]?.id) {
        updateSpace({
          id: space.id,
          input: {
            imageId: uploadedImage[0].id,
          },
        })
      }
    },
    [createImages, updateSpace, space],
  )

  if (!space) return null

  return (
    <Card className="overflow-hidden -mt-5 sm:mt-0" attached="bottom">
      <PageHeader
        title={
          <div className="flex space-x-2 items-center">
            <span className="truncate">{space?.name}</span>
            <SpacePrivacyIcon space={space} />
          </div>
        }
        avatar={
          canUpdateSpace ? (
            <PopoverImagePicker
              onLinkChange={async link => {
                const file = await linkToFile(link)
                uploadFile(file)
              }}
              onImageChange={uploadFile}
              onEmojiChange={async emoji => {
                const uploadedEmoji = await createEmojis([{ text: emoji?.id }])
                updateSpace({
                  id: space.id,
                  input: {
                    imageId: uploadedEmoji[0].id || emoji.id,
                  },
                })
              }}
            >
              <SpaceImage size="lg" space={space} />
            </PopoverImagePicker>
          ) : (
            <SpaceImage size="lg" space={space} />
          )
        }
        backgroundColor={space?.banner?.dominantColorHex}
        backgroundImage={<SpaceBackgroundImage space={space} />}
        action={<SpaceActionButtons space={space} />}
      />
    </Card>
  )
}
