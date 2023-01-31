import { ReactNode } from 'react'

import loadable from '@loadable/component'
import AtLineIcon from 'remixicon-react/AtLineIcon'
import AttachmentLineIcon from 'remixicon-react/AttachmentLineIcon'
import CodeBoxLineIcon from 'remixicon-react/CodeBoxLineIcon'
import DoubleQuotesLIcon from 'remixicon-react/DoubleQuotesLIcon'
import EmotionLineIcon from 'remixicon-react/EmotionLineIcon'
import H1Icon from 'remixicon-react/H1Icon'
import H2Icon from 'remixicon-react/H2Icon'
import Image2LineIcon from 'remixicon-react/Image2LineIcon'
import LinkIcon from 'remixicon-react/LinkIcon'
import ListOrderedIcon from 'remixicon-react/ListOrderedIcon'
import ListUnorderedIcon from 'remixicon-react/ListUnorderedIcon'
import SafariLineIcon from 'remixicon-react/SafariLineIcon'

const Youtube = loadable(() => import('./icons'), {
  resolveComponent: m => m.Youtube,
  ssr: false,
})

const Twitter = loadable(() => import('./icons'), {
  resolveComponent: m => m.Twitter,
  ssr: false,
})

const GoogleDrive = loadable(() => import('./icons'), {
  resolveComponent: m => m.GoogleDrive,
  ssr: false,
})

const Figma = loadable(() => import('./icons'), {
  resolveComponent: m => m.Figma,
  ssr: false,
})

export enum MenuTypes {
  BulletList = 'bulletList',
  Blockquote = 'blockquote',
  NumberedList = 'numberedList',
  LargeHeader = 'largeHeader',
  MediumHeader = 'mediumHeader',
  Image = 'image',
  Attachment = 'attachment',
  Emoji = 'emoji',
  Mention = 'mention',
  Embed = 'embed',
  Link = 'link',
  CodeBlock = 'codeBlock',
}

export type MenuItem = {
  type?: `${MenuTypes}` | 'divider'
  label?: string
  icon?: ReactNode
  description?: string
}

export const DefaultSlashMenuItems: MenuItem[] = [
  {
    type: MenuTypes.LargeHeader,
    label: 'Large Header',
    icon: <H1Icon />,
  },
  {
    type: MenuTypes.MediumHeader,
    label: 'Medium Header',
    icon: <H2Icon />,
  },
  {
    type: MenuTypes.Blockquote,
    label: 'Blockquote',
    icon: <DoubleQuotesLIcon />,
  },
  {
    type: MenuTypes.BulletList,
    label: 'Bulleted List',
    icon: <ListUnorderedIcon />,
  },
  {
    type: MenuTypes.NumberedList,
    label: 'Numbered List',
    icon: <ListOrderedIcon />,
  },
  {
    type: MenuTypes.CodeBlock,
    label: 'Code Block',
    icon: <CodeBoxLineIcon />,
  },
  {
    type: 'divider',
  },
  {
    type: MenuTypes.Link,
    label: 'Link',
    icon: <LinkIcon />,
  },
  {
    type: MenuTypes.Mention,
    label: 'Mention',
    icon: <AtLineIcon />,
  },
  {
    type: MenuTypes.Emoji,
    label: 'Emoji',
    icon: <EmotionLineIcon />,
  },
  {
    type: 'divider',
  },
  {
    type: MenuTypes.Attachment,
    label: 'Attachment',
    icon: <AttachmentLineIcon />,
  },
  {
    type: MenuTypes.Image,
    label: 'Image',
    icon: <Image2LineIcon />,
  },
  {
    type: MenuTypes.Embed,
    label: 'Embed',
    icon: <SafariLineIcon />,
  },
  {
    type: 'divider',
  },
  {
    type: MenuTypes.Embed,
    description: 'Embed a Youtube Video.',
    label: 'Youtube',
    icon: <Youtube />,
  },
  {
    type: MenuTypes.Embed,
    description: 'Embed a Tweet.',
    label: 'Twitter',
    icon: <Twitter />,
  },
  {
    type: MenuTypes.Embed,
    description: 'Embed a Google Doc, Google Sheet...',
    label: 'Google Drive',
    icon: <GoogleDrive />,
  },
  {
    type: MenuTypes.Embed,
    description: 'Embed a Figma file.',
    label: 'Figma',
    icon: <Figma />,
  },
]
