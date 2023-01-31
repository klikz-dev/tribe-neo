/* eslint-disable camelcase */
import { ForwardedRef, ReactElement } from 'react'

import { Quill } from 'quill'
import { RemixiconReactIconComponentType } from 'remixicon-react'

import { File } from '@tribeplatform/gql-client/src/interfaces'
import {
  SelectItemsProps,
  SelectProps,
} from '@tribeplatform/react-ui-kit/Select'

export type QuillType = Quill & {
  container?: HTMLElement
}

// Create a state object to hold all filter values.
export type MenuItems = MenuItem[]

export type Embed = {
  author?: string | null
  author_url?: string | null
  description?: string | null
  html?: string | null
  id: string
  options?: string | null
  provider_name?: string | null
  thumbnail_height?: string | null
  thumbnail_url?: string | null
  thumbnail_width?: string | null
  title?: string | null
  type?: string | null
  url: string
}

type SlashMenuModuleType = {
  items?: MenuItems
}

export type Media = {
  mediaUrl: string
  mediaId: string
}

export type ImageModuleType = {
  handleImageUpload: (files: FileList) => Promise<Media[]>
}

export type Mention = {
  id: string
  title: string
  icon: string
}

type MentionModuleType = {
  search: (query: string) => Promise<Mention[]>
}

type EmbedModuleType = {
  onEmbed: (url: string) => Promise<Embed>
}

export enum ComposerModuleName {
  BulletList = 'bulletList',
  NumberedList = 'numberedList',
  LargeHeader = 'largeHeader',
  MediumHeader = 'mediumHeader',
  Image = 'image',
  Attachment = 'attachment',
  Emoji = 'emoji',
  Mention = 'mention',
  Embed = 'embed',
  Code = 'code',
}

export type Attachment = File & {
  /** For showing the loading spinner */
  isLoading?: boolean
}

export interface ReactQuillProps {
  className?: string
  onMount?: () => void
  onUnmount?: () => void
  attachments?: Attachment[]
  embeds?: Embed[]
  mentions?: Mention[]
  onAttachmentDelete?: AttachmentsProps['onAttachmentDelete']
  onMentionClick?: (mention: Mention) => void
  handleAttachmentUpload?: (files: FileList) => Promise<Media[]>
  forwardedRef?: ForwardedRef<ComposerRefImperativeHandle>
  onChange?: (value: string) => void
  placeholder?: string
  isReadOnly?: boolean
  value?: string
  children?: ReactElement

  modules?: {
    [ComposerModuleName.Mention]?: MentionModuleType
    [ComposerModuleName.Embed]?: EmbedModuleType
    [ComposerModuleName.Image]?: ImageModuleType

    slashMenu?: SlashMenuModuleType

    // Custom module name and config for it
    // (or just boolean for enabling/disabling it).
    [customModuleName: string]: any
  }
}

export interface ComposerRefImperativeHandle {
  clear: () => void
  focus: () => void
  getEditorHTML: () => string | null
  getQuill: () => QuillType
  isEmpty: () => boolean
  isTouched: () => boolean
}

export type MenuItem = {
  type: ComposerModuleName
  label: string
  icon: RemixiconReactIconComponentType
  className?: string
}

export interface CustomFunctionalityProps
  extends Pick<ReactQuillProps, 'modules'> {
  quill: QuillType
}

export interface EmojiPickerProps {
  quill: QuillType
  hide: () => void
}

export interface MenuProps
  extends Pick<SelectProps<string>, 'className' | 'popperStyles'> {
  quill: QuillType
  items: MenuItems
  button?: ReactElement
  onMenuItemClick?: (tag: ComposerModuleName) => void
  handleEmbedPaste: (value: string) => Promise<unknown>
  listProps?: SelectItemsProps
  isOpen?: boolean
}

export interface ComposerEmbedProps {
  embed?: Embed
  isReadOnly: boolean
  handleEmbedPaste?: (value: string) => Embed
  handleEmbedInvalid?: () => void
  quill?: QuillType
  placeholder?: string
}

export interface MentionListProps
  extends Pick<ReactQuillProps['modules'], 'mention'> {
  quill: QuillType
}

export type AttachmentsProps = Pick<
  ReactQuillProps,
  'attachments' | 'isReadOnly'
> & {
  onAttachmentDelete?: (attachment: Attachment) => void
}
