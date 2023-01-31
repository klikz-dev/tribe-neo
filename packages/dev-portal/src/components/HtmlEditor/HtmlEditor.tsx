import { FC, useCallback, useMemo, useState } from 'react'

import clsx from 'clsx'
import isHotkey from 'is-hotkey'
import { BaseEditor, createEditor, Descendant } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'

import { ErrorBoundary } from '../Error/ErrorBoundry'
import { Element, Leaf, withHtml } from './render'
import { deserialize, serialize } from './serialize'
import { EditorToolbar, toggleMark } from './Toolbar'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

export type HtmlEditorProps = {
  initialValue: string
  onChange: (newValue: string) => void
  placeholder
}

export const HtmlEditor: FC<HtmlEditorProps> = props => {
  const { initialValue, onChange: onEditorChange, placeholder } = props

  const editor = useMemo(() => withHtml(withReact(createEditor())), [])

  let initialDeserializeValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

  if (initialValue) {
    const { body } = new DOMParser().parseFromString(initialValue, 'text/html')
    initialDeserializeValue = deserialize(body)
  }

  const [value, setValue] = useState<Descendant[]>(initialDeserializeValue)

  const onChange = value => {
    setValue(value)
    const isAstChange = editor.operations.some(
      op => op.type !== 'set_selection',
    )
    if (isAstChange) {
      const content = serialize(value)
      onEditorChange(content)
    }
  }

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const onKeyDown = event => {
    // eslint-disable-next-line no-restricted-syntax
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault()
        const mark = HOTKEYS[hotkey]
        toggleMark(editor, mark)
      }
    }
  }

  return (
    <ErrorBoundary>
      <article className="flex relative rounded-md shadow-sm">
        <div
          className={clsx(
            ' block w-full rounded-md px-3 py-2 appearance-none',
            'focus:ring-actionPrimary-500 focus:border-actionPrimary-500 border border-neutral-300',
            'text-basicMain-500 bg-main-50 placeholder-basicMain-300 ',
          )}
        >
          <Slate editor={editor} value={value} onChange={onChange}>
            <EditorToolbar />
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder={placeholder}
              onKeyDown={onKeyDown}
            />
          </Slate>
        </div>
      </article>
    </ErrorBoundary>
  )
}
