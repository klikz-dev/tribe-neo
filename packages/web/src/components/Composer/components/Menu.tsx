import { FC, useCallback } from 'react'

import clsx from 'clsx'
import AtLineIcon from 'remixicon-react/AtLineIcon'
import AttachmentLineIcon from 'remixicon-react/AttachmentLineIcon'
import CodeLineIcon from 'remixicon-react/CodeLineIcon'
import EmotionLineIcon from 'remixicon-react/EmotionLineIcon'
import H1Icon from 'remixicon-react/H1Icon'
import H2Icon from 'remixicon-react/H2Icon'
import Image2LineIcon from 'remixicon-react/Image2LineIcon'
import ListOrderedIcon from 'remixicon-react/ListOrderedIcon'
import ListUnorderedIcon from 'remixicon-react/ListUnorderedIcon'
import SafariLineIcon from 'remixicon-react/SafariLineIcon'

import { Select } from '@tribeplatform/react-ui-kit/Select'

import { ComposerModuleName, MenuProps, MenuItem } from '../@types'
import { useInsertCode } from '../hooks/useInsertCode'
import { useStateCallback } from '../hooks/useStateCallback'
import { EmojiPicker } from './EmojiPicker'

export const composerDefaultMenuItems: MenuItem[] = [
  {
    type: ComposerModuleName.BulletList,
    label: 'Bulleted List',
    icon: ListUnorderedIcon,
  },
  {
    type: ComposerModuleName.NumberedList,
    label: 'Numbered List',
    icon: ListOrderedIcon,
  },
  {
    type: ComposerModuleName.LargeHeader,
    label: 'Large Header',
    icon: H1Icon,
  },
  {
    type: ComposerModuleName.MediumHeader,
    label: 'Medium Header',
    icon: H2Icon,
    className: 'border-b border-neutral-200',
  },
  {
    type: ComposerModuleName.Attachment,
    label: 'Attachment',
    icon: AttachmentLineIcon,
  },
  {
    type: ComposerModuleName.Image,
    label: 'Image',
    icon: Image2LineIcon,
  },
  {
    type: ComposerModuleName.Emoji,
    label: 'Emoji',
    icon: EmotionLineIcon,
  },
  {
    type: ComposerModuleName.Mention,
    label: 'Mention',
    icon: AtLineIcon,
  },
  {
    type: ComposerModuleName.Embed,
    label: 'Embed',
    icon: SafariLineIcon,
  },
  {
    type: ComposerModuleName.Code,
    label: 'Code',
    icon: CodeLineIcon,
  },
]

export const Menu: FC<MenuProps> = ({
  quill,
  handleEmbedPaste,
  onMenuItemClick,
  items,
  button,
  listProps,
  isOpen = true,
  ...rest
}) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useStateCallback(false)
  const quillId = quill?.container?.id
  const slashMenuId = `${quillId}-slash-menu`
  const attachmentInputId = `attachment-input-${quillId}`

  useInsertCode(quill)

  const onChange = useCallback(
    (tag: ComposerModuleName) => {
      onMenuItemClick?.(tag)

      switch (tag) {
        case ComposerModuleName.LargeHeader:
          quill.format('header', 1)
          break
        case ComposerModuleName.MediumHeader:
          quill.format('header', 2)
          break
        case ComposerModuleName.BulletList:
          quill.format('list', 'bullet')
          break
        case ComposerModuleName.NumberedList:
          quill.format('list', 'ordered')
          break
        case ComposerModuleName.Code:
          quill.format('code-block', '.')
          break
        case ComposerModuleName.Mention: {
          const range = quill.getSelection(true)

          quill.insertText(range.index, '@', 'user')
          quill.setSelection(range.index + 1, 0, 'user')
          break
        }
        case ComposerModuleName.Emoji:
          setIsEmojiPickerOpen(true)
          break
        case ComposerModuleName.Attachment: {
          const attachmentInput = document.getElementById(attachmentInputId)
          if (attachmentInput) attachmentInput.click()
          break
        }
        case ComposerModuleName.Embed: {
          const range = quill.getSelection(true)

          quill.insertEmbed(range.index, ComposerModuleName.Embed, {
            handleEmbedPaste,
            handleEmbedInvalid: console.log,
            quill,
            placeholder: 'Paste the link...',
          })
          break
        }

        default:
          break
      }

      setTimeout(() => quill.focus(), 100)
    },
    [
      onMenuItemClick,
      quill,
      setIsEmojiPickerOpen,
      attachmentInputId,
      handleEmbedPaste,
    ],
  )

  return (
    <>
      {isOpen && (
        <Select value={null} onChange={onChange} {...rest}>
          <Select.Button
            className={clsx('pr-3 cursor-pointer', !button && 'hidden')}
            arrowsClassname="hidden"
          >
            {button}
          </Select.Button>
          <Select.Items className="w-60" data-id={slashMenuId} {...listProps}>
            {items.map(({ type, label, icon: Icon, className }) => (
              <Select.Item
                className={clsx(
                  'hover:bg-surface-300 text-black cursor-pointer',
                  className,
                )}
                key={type}
                data-type={type}
                value={type}
              >
                <div className="flex items-center">
                  <Icon className="h-4 w-4" />
                  <span className="ml-3 block truncate">{label}</span>
                </div>
              </Select.Item>
            ))}
          </Select.Items>
        </Select>
      )}

      {isEmojiPickerOpen && (
        <EmojiPicker quill={quill} hide={() => setIsEmojiPickerOpen(false)} />
      )}
    </>
  )
}
