import { FC, useState } from 'react'

import { BubbleMenu, Editor } from '@tiptap/react'
import clsx from 'clsx'
import BoldIcon from 'remixicon-react/BoldIcon'
import CodeBoxLineIcon from 'remixicon-react/CodeBoxLineIcon'
import CodeLinkIcon from 'remixicon-react/CodeLineIcon'
import DoubleQuotesLIcon from 'remixicon-react/DoubleQuotesLIcon'
import H1Icon from 'remixicon-react/H1Icon'
import H2Icon from 'remixicon-react/H2Icon'
import ItalicIcon from 'remixicon-react/ItalicIcon'
import LinkIcon from 'remixicon-react/LinkIcon'
import UnLinkIcon from 'remixicon-react/LinkUnlinkIcon'
import StrikethroughIcon from 'remixicon-react/StrikethroughIcon'
import UnderlineIcon from 'remixicon-react/UnderlineIcon'

import { LinkFormDialog } from '../../components/LinkFormDialog'

const activeClass = 'text-actionAccent-600 hover:text-actionAccentHover-500'
const MenuItem: FC<{
  isActive: boolean
  onClick: () => void
  className?: string
  title?: string
}> = ({ onClick, isActive, children, className, title }) => (
  <button
    title={title}
    type="button"
    onClick={onClick}
    className={clsx(
      'flex w-5 h-5 items-center hover:bg-surface-100',
      className,
      {
        [activeClass]: isActive,
      },
    )}
  >
    {children}
  </button>
)

export const CustomBubbleMenu = ({ editor }: { editor: Editor }) => {
  const [linkFormOpen, setLinkFormOpen] = useState(false)
  const [selectionText, setSelectionText] = useState('')
  return (
    <>
      <BubbleMenu
        shouldShow={({ editor, from, to }) => {
          return (
            Math.abs(to - from) > 0 &&
            !editor.isActive('async-image') &&
            !editor.isActive('embed')
          )
        }}
        editor={editor}
        className="flex items-center rounded-sm space-x-2 divide-x divide-neutral-200 py-2 px-3 text-basicSurface-500 bg-surface-50 shadow-lg border border-neutral-200"
      >
        <div className="flex space-x-2">
          <MenuItem
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          >
            <BoldIcon />
          </MenuItem>
          <MenuItem
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          >
            <ItalicIcon />
          </MenuItem>
          <MenuItem
            title="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
          >
            <UnderlineIcon />
          </MenuItem>
          <MenuItem
            title="Strike Through"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
          >
            <StrikethroughIcon />
          </MenuItem>
        </div>
        <div className="flex pl-2">
          <MenuItem
            title={editor.isActive('custom-link') ? 'Unlink' : 'Link'}
            onClick={() => {
              if (editor.isActive('custom-link')) {
                editor.chain().focus().unsetLink().run()
              } else {
                const { view, state } = editor
                const { from, to } = view.state.selection
                const text = state.doc.textBetween(from, to, '')
                setSelectionText(text)
                setLinkFormOpen(true)
              }
            }}
            isActive={editor.isActive('custom-link')}
          >
            {editor.isActive('custom-link') ? <UnLinkIcon /> : <LinkIcon />}
          </MenuItem>
        </div>
        <div className="flex space-x-2 pl-2">
          <MenuItem
            title="Large Header"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive('heading', { level: 2 })}
          >
            <H1Icon />
          </MenuItem>
          <MenuItem
            title="Medium Header"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive('heading', { level: 3 })}
          >
            <H2Icon />
          </MenuItem>
        </div>
        <div className="flex pl-2">
          <MenuItem
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
          >
            <DoubleQuotesLIcon />
          </MenuItem>
        </div>
        <div className="flex space-x-2 pl-2">
          <MenuItem
            title="Inline Code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
          >
            <CodeLinkIcon />
          </MenuItem>
          <MenuItem
            title="Code Block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
          >
            <CodeBoxLineIcon />
          </MenuItem>
        </div>
      </BubbleMenu>
      <LinkFormDialog
        defaultValues={{
          text: selectionText,
        }}
        onSubmit={data => {
          const { link, text } = data
          if (link) {
            const { from, to } = editor.view.state.selection
            editor
              .chain()
              .setTextSelection({ from, to })
              .insertLink({ href: link, text })
              .run()
          }
          setLinkFormOpen(false)
        }}
        open={linkFormOpen}
        onClose={() => setLinkFormOpen(false)}
      />
    </>
  )
}
