import { useRef, useState } from 'react'

import { Image, Member } from '@tribeplatform/gql-client/types'
import { useUpdateMember, useUploadFile } from '@tribeplatform/react-sdk/hooks'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

export const ProfilePicture = ({ member }: { member: Member }) => {
  const fileInputRef = useRef<HTMLInputElement>()
  const { loadingFile, uploadFile, loading } = useUploadFile()
  const [uploadedFile, setUploadedFile] = useState<Image>()
  const { mutateAsync: updateMember, isLoading } = useUpdateMember()

  const onChangeFile = e => {
    const file = Array.from(e.target.files)?.[0] as File
    uploadFile(file, async uploadedImage => {
      setUploadedFile(uploadedImage)
      updateMember(
        {
          input: {
            profilePictureId: uploadedImage.id,
          },
          id: member.id,
        },
        {
          onSuccess: () => {
            toast({
              title: 'Profile picture successfully updated',
              status: 'success',
            })
          },
          onError: () => {
            toast({
              title: 'Something went wrong please try again',
              status: 'error',
            })
          },
        },
      )
    })
  }

  const avatar = loadingFile || uploadedFile || (member.profilePicture as Image)

  return (
    <div>
      <div className="hover:bg-surface-200 rounded-full relative w-32 h-32">
        <Avatar
          size="3xl"
          name={member.name}
          src={avatar?.urls?.small || avatar?.url}
        />
        <input
          type="file"
          disabled={isLoading}
          className="hidden"
          multiple={false}
          ref={fileInputRef}
          onChange={onChangeFile}
        />
        {loading && (
          <div className="flex items-center justify-center text-white rounded-full bg-black opacity-50 absolute top-0 bottom-0 left-0 right-0">
            <SpinnerIcon className="animate-spin h-7 w-7" />
          </div>
        )}
        {!loading && (
          <div
            onClick={() => {
              fileInputRef.current.click()
            }}
            className="flex items-center justify-center rounded-full text-white bg-black bg-opacity-50 opacity-0 hover:opacity-90 absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
          >
            Change
          </div>
        )}
      </div>
    </div>
  )
}
