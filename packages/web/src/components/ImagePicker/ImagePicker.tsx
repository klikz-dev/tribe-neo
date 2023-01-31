import { memo, ReactNode } from 'react'

import clsx from 'clsx'
import { EmojiData, Picker } from 'emoji-mart-virtualized'

import { Link } from '@tribeplatform/react-ui-kit/Link'
import { Popover } from '@tribeplatform/react-ui-kit/Popover'
import { Tabs } from '@tribeplatform/react-ui-kit/Tabs'
import { TabVariant } from '@tribeplatform/react-ui-kit/Tabs/TabsContext'

import { useTheme } from '../../themes/ThemeProvider.component'
import { ErrorBoundary } from '../Error/ErrorBoundry'
import { UnsplashPicker } from '../Unsplash/Picker'
import { FileUpload } from './FileUpload'
import { LinkPicker } from './LinkPicker'

import 'emoji-mart-virtualized/css/emoji-mart.css'

type ImagePickerProps = {
  onEmojiChange?: (emoji: EmojiData) => void
  onImageChange?: (imageFile: File) => void
  onLinkChange?: (link: string) => void
  onRemove?: () => void
  /** On selecting anything this function will also be called and you can use it to close the popover if you are using this component within a dropdown or modal for example. */
  onSelect?: () => void
  /** This field only works if onLinkChange props is also available */
  supportUnsplash?: boolean
  defaultQuery?: string
  variant?: TabVariant
  classes?: {
    list?: string
    tabs?: {
      emoji?: string
      file?: string
      link?: string
      unsplash?: string
    }
  }
}

type PopoverImagePicker = ImagePickerProps & {
  children: ReactNode
}
const classes = {
  list: 'p-2 pb-0',
  tabs: {
    link: 'px-2 pb-2',
    unsplash: 'px-2 pb-2',
  },
}

export const PopoverImagePicker: React.FC<PopoverImagePicker> = ({
  children,
  ...rest
}) => {
  return (
    <Popover className="max-w-full">
      <Popover.TriggerMinimal>{children}</Popover.TriggerMinimal>

      <Popover.Panel>
        {({ close }) => (
          <ImagePickerTabs onSelect={close} classes={classes} {...rest} />
        )}
      </Popover.Panel>
    </Popover>
  )
}

export const ImagePickerTabs: React.FC<ImagePickerProps> = memo(
  ({
    onSelect,
    onEmojiChange,
    onLinkChange,
    onImageChange,
    onRemove,
    supportUnsplash = true,
    defaultQuery = '',
    variant = 'pills',
    classes,
  }) => {
    const { darkMode } = useTheme()
    const emojiTab = !!onEmojiChange
    const imageTab = !!onImageChange
    const linkTab = !!onLinkChange
    const unsplashTab = !!onLinkChange && supportUnsplash

    if (!emojiTab && !imageTab && !linkTab && !unsplashTab) return null

    return (
      <div>
        <Tabs.Group>
          <Tabs.List variant={variant} className={classes?.list} fullWidth>
            {emojiTab && <Tabs.Tab name="emoji">Emoji</Tabs.Tab>}
            {imageTab && <Tabs.Tab name="upload">Upload</Tabs.Tab>}
            {linkTab && <Tabs.Tab name="link">Link</Tabs.Tab>}
            {unsplashTab && <Tabs.Tab name="unsplash">Unsplash</Tabs.Tab>}
            {onRemove && (
              <Link
                className="flex-1 text-right p-2"
                onClick={() => {
                  onSelect?.()
                  onRemove()
                }}
              >
                Remove
              </Link>
            )}
          </Tabs.List>
          <Tabs.Panels>
            {emojiTab && (
              <Tabs.Panel className={clsx('-mt-3 flex', classes?.tabs?.emoji)}>
                <Picker
                  style={{
                    border: 0,
                    width: '100%',
                    'border-top-left-radius': 0,
                    'border-top-right-radius': 0,
                  }}
                  theme={darkMode ? 'dark' : 'light'}
                  native
                  set="apple"
                  showSkinTones={false}
                  showPreview={false}
                  onSelect={emoji => {
                    onSelect?.()
                    onEmojiChange(emoji)
                  }}
                />
              </Tabs.Panel>
            )}
            {imageTab && (
              <Tabs.Panel className={clsx('h-64', classes?.tabs?.file)}>
                <FileUpload
                  onChange={file => {
                    onSelect?.()
                    onImageChange(file)
                  }}
                />
              </Tabs.Panel>
            )}
            {linkTab && (
              <Tabs.Panel className={clsx('h-64', classes?.tabs?.link)}>
                <LinkPicker
                  onChange={link => {
                    onSelect?.()
                    onLinkChange(link)
                  }}
                />
              </Tabs.Panel>
            )}
            {unsplashTab && (
              <Tabs.Panel
                className={clsx('w-120 max-w-full', classes?.tabs?.unsplash)}
              >
                <ErrorBoundary>
                  <UnsplashPicker
                    onChange={link => {
                      onSelect?.()
                      onLinkChange(link)
                    }}
                    defaultQuery={defaultQuery}
                  />
                </ErrorBoundary>
              </Tabs.Panel>
            )}
          </Tabs.Panels>
        </Tabs.Group>
      </div>
    )
  },
)
