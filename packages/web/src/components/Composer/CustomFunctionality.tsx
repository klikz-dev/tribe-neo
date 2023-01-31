import 'emoji-mart-virtualized/css/emoji-mart.css'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// import { StaticConfigs } from '../../config'
import {
  ComposerModuleName,
  CustomFunctionalityProps,
  MenuItems,
} from './@types'
import { EmojiList } from './components/EmojiList'
import { ImagePickerModal } from './components/ImagePickerModal'
import { MentionList } from './components/MentionList'
import { composerDefaultMenuItems, Menu } from './components/Menu'
import { SLASH_SYMBOL } from './constants'
import { insertImage } from './hooks/useComposerFile'
import { useDropdownKeyboard } from './hooks/useDropdownKeyboard'
import { useInsertCode } from './hooks/useInsertCode'
import { useStateCallback } from './hooks/useStateCallback'
import {
  getCursorPosition,
  getSymbolSearchTerm,
  removeSymbolSearchTerm,
} from './utils'

const INITIAL_FILTER_STATE: MenuItems = []

const staticProps = {
  menu: {
    offsetTop: 30,
    listProps: {
      transitionProps: { show: true },
      usePortal: false,
    },
  },
  emojiPopover: {
    offsetTop: 30,
    offsetLeft: 10,
  },
}

// Menu items that can be disabled
const controllableMenuItems = [
  ComposerModuleName.Mention,
  ComposerModuleName.Embed,
  ComposerModuleName.Image,
]

export const CustomFunctionality = ({
  quill,
  modules,
}: CustomFunctionalityProps) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const atSlashPosition = useRef<number>()
  const [isOpen, setIsOpen] = useStateCallback(false)
  const quillId = quill.container?.id
  const slashMenuId = `${quillId}-slash-menu`
  const slashMenuItems = useMemo(
    () =>
      // Filter out disabled modules
      (modules.slashMenu?.items || composerDefaultMenuItems).filter(
        ({ type }) => !controllableMenuItems.includes(type) || modules[type],
      ),
    [modules],
  )

  useInsertCode(quill)

  const [filteredItems, setFilteredItems] = useState(INITIAL_FILTER_STATE)

  const isFiltered = !!filteredItems.length

  const resetFilter = useCallback(() => {
    setFilteredItems(INITIAL_FILTER_STATE)
  }, [])

  let hide

  const skipFocusOnIndexes = useMemo(
    () =>
      isFiltered
        ? filteredItems.map(menuItem =>
            slashMenuItems.findIndex(
              ({ type }) => !type || type === menuItem.type,
            ),
          )
        : [],
    [filteredItems, isFiltered, slashMenuItems],
  )

  const { onShow, onHide } = useDropdownKeyboard(slashMenuId, quill, {
    onEscape: hide,
    skipFocusOnIndexes,
  })

  hide = useCallback(() => {
    if (!isOpen) return

    setIsOpen(false)
    onHide()

    // // To fix and issue with the test env
    // if (StaticConfigs.NODE_ENV !== 'test' && quill) {
    //   quill.focus()
    // }
  }, [isOpen, onHide, setIsOpen])

  const show = useCallback(() => {
    setIsOpen(true)

    onShow()
  }, [onShow, setIsOpen])

  const clearSlashMenu = useCallback(() => {
    resetFilter()
    hide()
  }, [hide, resetFilter])

  const slashSearchTermMatches = useCallback(
    () =>
      getSymbolSearchTerm({
        quill,
        symbolPositionRef: atSlashPosition,
        symbol: SLASH_SYMBOL,
      }),
    [quill],
  )

  const handleSlashType = useCallback(() => {
    const searchTerm = slashSearchTermMatches()

    if (
      typeof searchTerm === 'string' &&
      typeof atSlashPosition.current === 'number'
    ) {
      if (searchTerm) {
        const filteredMenuItems = slashMenuItems.filter(({ label }) =>
          label?.toLowerCase()?.includes(searchTerm.toLowerCase()),
        )

        if (!filteredMenuItems.length) {
          clearSlashMenu()
        } else {
          setFilteredItems(filteredMenuItems)

          if (!isOpen) {
            show()
          }
        }
      } else {
        resetFilter()
        show()
      }
    } else {
      clearSlashMenu()
    }
  }, [
    slashSearchTermMatches,
    slashMenuItems,
    clearSlashMenu,
    isOpen,
    show,
    resetFilter,
  ])

  const onTextChange = useCallback(
    (delta, oldDelta, source) => {
      if (source === 'user') {
        handleSlashType()
      }
    },
    [handleSlashType],
  )

  const onSelectionChange = useCallback(
    (range, oldRange, source) => {
      if (source !== 'user') return

      // We reset whenever another text is selected.
      atSlashPosition.current = undefined

      // When user places cursor after "@" symbol
      // we need to show the slash menu again
      if (range?.length === 0) {
        handleSlashType()
      } else if (range === null) {
        // When composer loses focus, hide the list
        clearSlashMenu()
      }
    },
    [clearSlashMenu, handleSlashType],
  )

  useEffect(() => {
    if (quill) {
      quill.on('text-change', onTextChange)
      quill.on('selection-change', onSelectionChange)
    }

    return () => {
      if (quill) {
        quill.off('text-change', onTextChange)
        quill.off('selection-change', onSelectionChange)
      }
    }
  }, [onSelectionChange, onTextChange, quill])

  const onMenuItemClick = useCallback(
    (tag: string) => {
      removeSymbolSearchTerm(quill, SLASH_SYMBOL)
      clearSlashMenu()

      if (tag === ComposerModuleName.Image) {
        setUploadModalOpen(true)
      }
    },
    [clearSlashMenu, quill],
  )

  const onFileChange = useCallback(
    (file: File) => {
      const uploadPromise = modules.image.handleImageUpload([file] as any)

      insertImage(quill, uploadPromise, file)
    },
    [modules, quill],
  )

  const handleEmbedPaste = useCallback(
    (value: string) => modules.embed.onEmbed(value),
    [modules.embed],
  )

  if (!quill) return null

  const { left, top } = getCursorPosition(quill)

  return (
    <>
      <EmojiList quill={quill} />

      <Menu
        isOpen={isOpen}
        items={isFiltered ? filteredItems : slashMenuItems}
        quill={quill}
        onMenuItemClick={onMenuItemClick}
        handleEmbedPaste={handleEmbedPaste}
        className="absolute ignore-typography z-50"
        listProps={staticProps.menu.listProps}
        popperStyles={{
          left,
          top: top + staticProps.menu.offsetTop,
        }}
      />

      {modules.mention?.search && (
        <MentionList mention={modules.mention} quill={quill} />
      )}

      <ImagePickerModal
        open={uploadModalOpen}
        close={() => setUploadModalOpen(false)}
        upload={onFileChange}
      />
    </>
  )
}
