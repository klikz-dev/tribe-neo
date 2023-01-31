import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { Image } from '@tribeplatform/gql-client/types'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import {
  FormControl,
  FormControlProps,
} from '@tribeplatform/react-ui-kit/FormControl'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'

import { useUploadFile } from '../hooks'

export type AvatarInputProps = {
  name: string
  alt?: string
  picture: Image
} & FormControlProps

export const AvatarInput = (props: AvatarInputProps) => {
  const { name, picture, alt, label, helperText, error, invalid } = props

  const { setValue, register } = useFormContext()
  const fileInputRef = useRef<HTMLInputElement>()
  const { loadingFile, uploadFile, loading } = useUploadFile()
  const [uploadedFile, setUploadedFile] = useState<Image>()

  const onChangeFile = e => {
    const file = Array.from(e.target.files)?.[0] as File
    uploadFile(file, async uploadedImage => {
      setUploadedFile(uploadedImage)
      setValue(name, uploadedImage.id)
    })
  }

  const avatar = loadingFile || uploadedFile || picture
  useEffect(() => {
    register(name)
  }, [])

  return (
    <div>
      {label ? (
        <FormControl.Label htmlFor={name}>{label}</FormControl.Label>
      ) : null}
      <div
        className={clsx(
          'hover:bg-surface-200 rounded-full relative w-32 h-32',
          label && 'mt-1',
        )}
      >
        <Avatar
          size="3xl"
          name={alt}
          src={avatar?.urls?.small || avatar?.url}
          rounded={false}
        />
        <input
          type="file"
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
            className="flex items-center justify-center rounded-md text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
          >
            Change
          </div>
        )}
      </div>
      <FormControl.Meta {...{ helperText, error, invalid }} />
    </div>
  )
}
