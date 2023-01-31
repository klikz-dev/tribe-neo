import { FC } from 'react'

import XIcon from '@heroicons/react/outline/XIcon'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import clsx from 'clsx'

import { Embed as EmbedType } from '@tribeplatform/gql-client/types'

export const Embed: FC<NodeViewProps> = ({
  node,
  selected,
  deleteNode,
  getPos,
  editor,
}) => {
  const embed = node.attrs.embed as EmbedType

  if (!embed) return null

  const previewProps = {
    dangerouslySetInnerHTML: { __html: embed?.html || 'Something went wrong' },
  }
  const onRemove = () => {
    const position = getPos() - 2
    const { url } = embed
    deleteNode()
    editor
      .chain()
      .focus(position)
      .insertLink({ href: url })
      .insertContent(' ')
      .run()
  }

  return (
    <NodeViewWrapper
      as="figure"
      className={clsx(selected && 'outline outline-2', 'relative')}
    >
      <div className="relative">
        <div {...previewProps} />
        <div
          className="absolute top-0 bottom-0 left-0 right-0 h-full w-full"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
          }}
        ></div>
      </div>
      <div
        onClick={onRemove}
        className="flex absolute top-2 right-2 cursor-pointer w-8 h-8 items-center justify-center bg-surface-50 rounded-full"
      >
        <XIcon />
      </div>
    </NodeViewWrapper>
  )
}
