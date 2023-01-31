import { useCallback, useState } from 'react'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import {
  Image,
  Member,
  UploadImagesArgs,
} from '@tribeplatform/gql-client/types'
import {
  useCreateImages,
  useUpdateImage,
  useUpdateMember,
} from '@tribeplatform/react-sdk/hooks'
import { Keys, useQueryClient } from '@tribeplatform/react-sdk/lib'
import { Button, ButtonGroup } from '@tribeplatform/react-ui-kit/Button'

import { linkToFile } from '../../lib/upload'
import { BannerReposition } from '../ImagePicker/BannerReposition'
import { PopoverImagePicker } from '../ImagePicker/ImagePicker'

export const MemberBackgroundImage = ({ member }: { member: Member }) => {
  const [reposition, setReposition] = useState(false)
  const [loadingBanner, setLoadingBanner] = useState<Image | undefined>()
  const { mutateAsync: createImages } = useCreateImages()
  const { mutate: updateMember } = useUpdateMember()
  const { mutate: updateImage } = useUpdateImage()
  const queryClient = useQueryClient()

  const setLoadingFile = useCallback((file?: File) => {
    if (!file) {
      setLoadingBanner(undefined)
      return
    }
    const fr = new FileReader()
    fr.onload = () => {
      setLoadingBanner({ url: fr.result } as Image)
    }
    fr.readAsDataURL(file)
  }, [])

  const uploadFile = useCallback(
    async (file: File) => {
      setLoadingFile(file)
      const args: UploadImagesArgs[] = [{ file }]
      try {
        const uploadedImage = await createImages(args, {
          onError: () => {
            setLoadingFile()
          },
        })
        if (uploadedImage?.[0]?.id) {
          updateMember(
            {
              id: member.id,
              input: {
                bannerId: uploadedImage[0].id,
              },
            },
            {
              onSettled: () => {
                queryClient.invalidateQueries(
                  Keys.getMemberKey({ id: member.id }),
                )
                setLoadingFile()
              },
            },
          )
        }
      } catch (e) {
        setLoadingFile()
        console.log(e)
      }
    },
    [createImages, updateMember, member, setLoadingFile, queryClient],
  )

  const banner = loadingBanner || (member?.banner as Image)
  const hasBanner = !!banner
  const [canUpdateMember] = hasScopesPermission(member, ['updateMember'])

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
            queryClient.invalidateQueries(Keys.getMemberKey({ id: member.id }))
          },
        },
      )
      setReposition(false)
    },
    [queryClient, updateImage, banner?.id, member?.id],
  )

  if (!hasBanner) {
    return (
      <div className="h-16 w-full object-cover lg:h-24 group relative">
        {canUpdateMember && (
          <div className="group-hover:opacity-100 opacity-0 absolute bottom-5 right-5 duration-300 z-10">
            <PopoverImagePicker
              onLinkChange={async link => {
                const file = await linkToFile(link)
                uploadFile(file)
              }}
              onImageChange={uploadFile}
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
        loading={!!loadingBanner}
      >
        {canUpdateMember && (
          <div className="group-hover:opacity-100 opacity-0 absolute bottom-5 right-5 duration-300 z-10">
            <ButtonGroup size="sm">
              <PopoverImagePicker
                onRemove={() =>
                  updateMember({
                    id: member.id,
                    input: {
                      bannerId: null,
                    },
                  })
                }
                onLinkChange={async link => {
                  const file = await linkToFile(link)
                  uploadFile(file)
                }}
                onImageChange={uploadFile}
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
