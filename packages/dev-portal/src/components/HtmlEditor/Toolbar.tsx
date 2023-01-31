import BoldIcon from 'remixicon-react/BoldIcon'
import CodeViewIcon from 'remixicon-react/CodeViewIcon'
import DoubleQuotesRIcon from 'remixicon-react/DoubleQuotesRIcon'
import H1Icon from 'remixicon-react/H1Icon'
import H2Icon from 'remixicon-react/H2Icon'
import ItalicIcon from 'remixicon-react/ItalicIcon'
import ListOrderedIcon from 'remixicon-react/ListOrderedIcon'
import ListUnorderedIcon from 'remixicon-react/ListUnorderedIcon'
import UnderlineIcon from 'remixicon-react/UnderlineIcon'
import { Editor, Element as SlateElement, Transforms } from 'slate'
import { useSlate } from 'slate-react'

import { Button, Toolbar } from './components'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties: Partial<SlateElement> = {
    // eslint-disable-next-line no-nested-ternary
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const BlockButton = ({ format, children }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {children}
    </Button>
  )
}

const MarkButton = ({ format, children }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {children}
    </Button>
  )
}

export const EditorToolbar = () => (
  <Toolbar>
    <MarkButton format="bold">
      <BoldIcon className="h-4 w-4 inline" />
    </MarkButton>
    <MarkButton format="italic">
      <ItalicIcon className="h-4 w-4 inline" />
    </MarkButton>
    <MarkButton format="underline">
      <UnderlineIcon className="h-4 w-4 inline" />
    </MarkButton>
    <MarkButton format="code">
      <CodeViewIcon className="h-4 w-4 inline" />
    </MarkButton>
    <BlockButton format="heading-one">
      <H1Icon className="h-4 w-4 inline" />
    </BlockButton>
    <BlockButton format="heading-two">
      <H2Icon className="h-4 w-4 inline" />
    </BlockButton>
    <BlockButton format="quote">
      <DoubleQuotesRIcon className="h-4 w-4 inline" />
    </BlockButton>
    <BlockButton format="numbered-list">
      <ListOrderedIcon className="h-4 w-4 inline" />
    </BlockButton>
    <BlockButton format="bulleted-list">
      <ListUnorderedIcon className="h-4 w-4 inline" />
    </BlockButton>
  </Toolbar>
)
