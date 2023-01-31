import { useCallback, useEffect, useState } from 'react'

import { emojiIndex, BaseEmoji } from 'emoji-mart-virtualized'

import { Select } from '@tribeplatform/react-ui-kit/Select'

import { QuillType } from '../@types'
import { COLON_SYMBOL } from '../constants'
import { useDropdownKeyboard } from '../hooks/useDropdownKeyboard'
import { getSymbolSearchTerm, removeSymbolSearchTerm } from '../utils'
import { ComposerSelect } from './ComposerSelect'

export const EmojiList = ({ quill }: { quill: QuillType }) => {
  const [emojis, setEmojis] = useState([])
  const quillId = quill.container.id
  const emojiListId = `${quillId}-emoji-list`
  const { onShow, onHide } = useDropdownKeyboard(emojiListId, quill, {})
  const isOpen = !!emojis.length

  const colonSearchTermMatch = useCallback(
    () =>
      getSymbolSearchTerm({
        quill,
        symbol: COLON_SYMBOL,
      }),
    [quill],
  )

  useEffect(() => {
    const onEditorChange = () => {
      const colonSearchTerm = colonSearchTermMatch()

      if (colonSearchTerm.length > 1) {
        const list = (emojiIndex.search(colonSearchTerm) || []) as BaseEmoji[]

        setEmojis(list)
        onShow()
      } else {
        setEmojis([])
        onHide()
      }
    }

    quill.on('editor-change', onEditorChange)

    return () => {
      quill.off('editor-change', onEditorChange)
    }
  }, [colonSearchTermMatch, onHide, onShow, quill])

  const onSelect = (emoji: BaseEmoji) => {
    quill.insertText(quill.getSelection(true).index, emoji.native, 'user')

    removeSymbolSearchTerm(quill, COLON_SYMBOL)
  }

  if (!isOpen) return null

  return (
    <ComposerSelect quill={quill} id={emojiListId} onChange={onSelect}>
      {emojis.map(emoji => (
        <Select.Item key={emoji.id} value={emoji}>
          <div className="flex space-x-2">
            <span>{emoji.native}</span>
            <span>{emoji.colons}</span>
          </div>
        </Select.Item>
      ))}
    </ComposerSelect>
  )
}
