import { MenuTypes } from './items'

import { SlashMenuOptions } from '.'

export const slashMenuCommand: SlashMenuOptions['command'] = ({
  editor,
  range,
  props,
}) => {
  // increase range.to by one when the next node is of type "text"
  // and starts with a space character
  const { nodeAfter } = editor.view.state.selection.$to
  const overrideSpace = nodeAfter?.text?.startsWith(' ')

  if (overrideSpace) {
    range.to += 1
  }

  let op = editor
    .chain()
    .focus()
    .command(({ tr }) => {
      tr.insertText('', range.from, range.to)
      return true
    })

  switch (props.type) {
    case MenuTypes.BulletList:
      op = op.toggleBulletList()
      break
    case MenuTypes.Blockquote:
      op = op.toggleBlockquote()
      break
    case MenuTypes.CodeBlock:
      op = op.toggleCodeBlock()
      break
    case MenuTypes.NumberedList:
      op = op.toggleOrderedList()
      break
    case MenuTypes.Emoji:
      op = op.insertContent(':')
      break
    case MenuTypes.Mention:
      op = op.insertContent('@')
      break
    case MenuTypes.LargeHeader:
      op = op.toggleHeading({ level: 2 })
      break
    case MenuTypes.MediumHeader:
      op = op.toggleHeading({ level: 3 })
      break

    default:
      break
  }

  op.run()
}
