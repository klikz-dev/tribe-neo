import { useEffect, useState } from 'react'

import CogIcon from '@heroicons/react/outline/CogIcon'

import { useSpace } from '@tribeplatform/react-sdk/hooks'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Input } from '@tribeplatform/react-ui-kit/Input'

import { PopoverImagePicker } from '../ImagePicker/ImagePicker'
import { SpaceImage } from '../Space/SpaceImage'

export const SpaceSettings = ({ slug }) => {
  const { data: space } = useSpace({
    variables: {
      slug,
    },
  })

  useEffect(() => {
    setName(space.name)
  }, [space.name])

  const [name, setName] = useState(space?.name || '')

  return (
    <Card>
      <Card.Header>
        <h5 className="flex space-x-2 items-center text-base font-semibold">
          <CogIcon className="h-4 w-4" /> Space Details
        </h5>
      </Card.Header>
      <Card.Content>
        <div className="flex items-center space-x-2">
          <PopoverImagePicker
            onLinkChange={async () => {
              // const file = await linkToFile(link)
              // uploadFile(file)
            }}
            onImageChange={file => {
              console.debug(file)
            }}
            onEmojiChange={async () => {
              // const uploadedEmoji = await createEmojis([{ text: emoji?.id }])
              // updateSpace({
              //   id: space.id,
              //   input: {
              //     imageId: uploadedEmoji[0].id || emoji.id,
              //   },
              // })
            }}
          >
            <SpaceImage size="sm" space={space} />
          </PopoverImagePicker>
          <Input value={name} onChange={e => setName(e.target.value)} />
        </div>
      </Card.Content>
    </Card>
  )
}
