import { FC, useCallback } from 'react'

import AddLineIcon from 'remixicon-react/AddLineIcon'

import { useEmbed } from '@tribeplatform/react-sdk/hooks'

import { QuillType } from '../../@types'
import { composerDefaultMenuItems, Menu } from '../Menu'

interface OptionsButtonProps {
  quill: QuillType
}

export const OptionsButton: FC<OptionsButtonProps> = ({ quill }) => {
  const { asyncQuery: embed } = useEmbed()

  const handleEmbedPaste = useCallback(
    (url: string) =>
      new Promise((resolve, reject) => {
        embed({ url }).then(resolve).catch(reject)
      }),
    [embed],
  )

  return (
    <Menu
      quill={quill}
      items={composerDefaultMenuItems}
      handleEmbedPaste={handleEmbedPaste}
      button={<AddLineIcon size="16px" />}
    />
  )
}
