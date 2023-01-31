import { useCallback, useState } from 'react'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Image, Space } from '@tribeplatform/gql-client/types'
import {
  useUpdateImage,
  useUpdateSpace,
  useUploadFile,
} from '@tribeplatform/react-sdk/hooks'
import { Keys, useQueryClient } from '@tribeplatform/react-sdk/lib'
import { Button, ButtonGroup } from '@tribeplatform/react-ui-kit/Button'

import { linkToFile } from '../../lib/upload'
import { BannerReposition } from '../ImagePicker/BannerReposition'
import { PopoverImagePicker } from '../ImagePicker/ImagePicker'

export const SpaceBackgroundImage = ({ space }: { space: Space }) => {
  const [reposition, setReposition] = useState(false)
  const { loadingFile, uploadFile } = useUploadFile()
  const { mutateAsync: updateSpace } = useUpdateSpace({ slug: space.slug })
  const { mutate: updateImage } = useUpdateImage()
  const queryClient = useQueryClient()

  const onUploadFile = useCallback(
    async (file: File) => {
      uploadFile(file, async uploadedImage => {
        if (uploadedImage.id) {
          await updateSpace({
            id: space.id,
            input: {
              bannerId: uploadedImage.id,
            },
          })

          queryClient.invalidateQueries(Keys.getSpaceKey({ id: space.id }))
        }
      })
    },
    [updateSpace, space, queryClient, uploadFile],
  )

  const banner = loadingFile || (space?.banner as Image)
  const hasBanner = !!banner
  const [canUpdateSpace] = hasScopesPermission(space, ['updateSpace'])

  const onSave = useCallback(
    crop => {
      updateImage(
        {
          id: banner.id,
          input: {
            cropX: crop.x,
            cropY: crop.y,
          },
        },
        {
          onSettled: () => {
            queryClient.invalidateQueries(
              Keys.getSpaceKey({ slug: space.slug }),
            )
          },
        },
      )
      setReposition(false)
    },
    [queryClient, updateImage, banner?.id, space?.slug],
  )

  if (!hasBanner) {
    return (
      <div className="h-16 w-full object-cover lg:h-24 group relative">
        {canUpdateSpace && (
          <div className="group-hover:opacity-100 opacity-0 absolute bottom-5 right-5 duration-300 z-10">
            <PopoverImagePicker
              onLinkChange={async link => {
                const file = await linkToFile(link)
                onUploadFile(file)
              }}
              onImageChange={onUploadFile}
            >
              <Button variant="outline">Add cover image</Button>
            </PopoverImagePicker>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative group">
      <BannerReposition
        banner={banner}
        cancel={() => setReposition(false)}
        save={onSave}
        edit={reposition}
        loading={!!loadingFile}
      >
        {canUpdateSpace && (
          <div className="group-hover:opacity-100 opacity-0 absolute bottom-5 right-5 duration-300 z-10">
            <ButtonGroup size="sm">
              <PopoverImagePicker
                onRemove={() =>
                  updateSpace({
                    id: space.id,
                    input: {
                      bannerId: null,
                    },
                  })
                }
                onLinkChange={async link => {
                  const file = await linkToFile(link)
                  onUploadFile(file)
                }}
                onImageChange={onUploadFile}
              >
                <Button
                  size="sm"
                  as="span"
                  variant="outline"
                  className="rounded-r-none rounded-l-md"
                >
                  Change cover
                </Button>
              </PopoverImagePicker>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setReposition(true)}
              >
                Reposition
              </Button>
            </ButtonGroup>
          </div>
        )}
      </BannerReposition>
    </div>
  )
}
