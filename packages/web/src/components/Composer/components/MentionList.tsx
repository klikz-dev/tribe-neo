import { memo, useCallback, useEffect, useRef, useState } from 'react'

import _debounce from 'lodash/debounce'

import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Select } from '@tribeplatform/react-ui-kit/Select'

import { Mention, MentionListProps, ComposerModuleName } from '../@types'
import { EMBED_INPUT_CLASS, MENTION_SYMBOL } from '../constants'
import { useDropdownKeyboard } from '../hooks/useDropdownKeyboard'
import { getSymbolSearchTerm, removeSymbolSearchTerm } from '../utils'
import { ComposerSelect } from './ComposerSelect'

const SEARCH_INITIAL_STATE = {
  results: [] as Mention[],
  loading: false,
  query: '',
}

const staticProps = {
  spinnerStyles: { borderTopColor: 'transparent' },
  listOffsetTop: 35,
}

export const MentionList = memo(({ quill, mention }: MentionListProps) => {
  const mentionSymbolPosition = useRef<number>()
  const [searchData, setSearchData] = useState(SEARCH_INITIAL_STATE)

  const haveResults = !!searchData.results.length

  const quillId = quill.container.id
  const mentionListId = `${quillId}-${ComposerModuleName.Mention}-list`

  const resetSearch = useCallback(() => setSearchData(SEARCH_INITIAL_STATE), [])
  const { onShow, onHide } = useDropdownKeyboard(mentionListId, quill, {
    onEscape: resetSearch,
  })

  const onChange = useCallback(
    _debounce(async (eventName, range, oldRange, source) => {
      // If focused on any element within the editor
      // (otherwise it can be focused on a post's title <Textarea />)
      const isFocusedInEditor = !!document.activeElement?.closest(
        `#${quillId} > .ql-editor`,
      )

      const isFocusedOnEmbedInput =
        Array.from(document.activeElement.classList).indexOf(
          EMBED_INPUT_CLASS,
        ) !== -1

      // It's important to allow `silent` selection change.
      // On new line breaks Quill triggers it. If we disable it, it causes
      // a bug when you break a line while having valid mentioning searchTerm
      if (
        (eventName !== 'selection-change' && source !== 'user') ||
        !isFocusedInEditor ||
        isFocusedOnEmbedInput
      ) {
        return
      }

      // We have to focus to the editor here, because
      // this function gets called on focus-out too.
      quill.focus()

      const newQuery = getSymbolSearchTerm({
        quill,
        symbol: MENTION_SYMBOL,
        symbolPositionRef: mentionSymbolPosition,
      })

      try {
        if (newQuery) {
          // Set loading state for mentions list
          setSearchData({ loading: true, results: [], query: newQuery })

          // Call the search handler
          mention.search(newQuery).then(results => {
            // Set response data
            setSearchData(searchData => {
              // After selecting something from the list below,
              // because of Quill changes another request is sent
              // to backend and right after the request, "query" is cleared
              // but we get new results which makes the list show the new data
              if (!searchData.query) return SEARCH_INITIAL_STATE

              return {
                ...searchData,
                loading: false,
                results: results || [],
              }
            })
          })
        } else {
          resetSearch()
        }
      } catch (error) {
        resetSearch()
      }
    }, 300),
    [mention, quill, quillId, resetSearch],
  )

  useEffect(() => {
    quill.on('editor-change', onChange)

    return () => {
      quill.off('editor-change', onChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // If list of members will be rendered
    const hasList = haveResults && !searchData.loading

    if (hasList) {
      // Bind keyboard events for moving up/down
      onShow()
    } else {
      // Unbind keyboard events for moving up/down
      onHide()
    }

    return () => {
      onHide()
    }
  }, [haveResults, onHide, onShow, searchData.loading])

  if (!searchData.query && !searchData.loading && !haveResults) return null

  const onSelect = (user: Mention) => {
    // If the spinner below was clicked
    if (!user) return

    const cursorSymbolPosition = quill.getSelection(true).index

    const newCursorPosition = mentionSymbolPosition.current

    quill.insertEmbed(
      cursorSymbolPosition,
      ComposerModuleName.Mention,
      user,
      'user',
    )

    resetSearch()
    removeSymbolSearchTerm(quill, MENTION_SYMBOL)

    quill.setSelection(newCursorPosition, 0)
  }

  return (
    <ComposerSelect
      quill={quill}
      id={mentionListId}
      onChange={onSelect}
      className="w-56 top-0 left-0 z-50"
    >
      {searchData.loading ? (
        <Select.Item value="" className="px-0">
          <div
            style={staticProps.spinnerStyles}
            className="w-6 h-6 mx-auto border-4 border-black opacity-40 border-solid rounded-full animate-spin"
          />
        </Select.Item>
      ) : (
        <>
          {haveResults ? (
            searchData.results.map(user => (
              <Select.Item
                className="hover:bg-surface-300 cursor-pointer px-2"
                key={user.id}
                value={user}
              >
                <span className="flex items-center">
                  <Avatar size="xs" src={user.icon} name={user.title} />
                  <p className="ml-2 truncate">{user.title}</p>
                </span>
              </Select.Item>
            ))
          ) : (
            <p className="px-4 py-1 text-center">
              Couldn&apos;t find any match
            </p>
          )}
        </>
      )}
    </ComposerSelect>
  )
})
