import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'

import clsx from 'clsx'
import { BaseEmoji } from 'emoji-mart-virtualized'

import { MenuList } from '../../components/MenuList'

export const EmojiList = forwardRef<
  unknown,
  { items: BaseEmoji[]; command: unknown }
>(({ items, command }, ref) => {
  const refs = useRef([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = index => {
    const item = items[index]

    if (item) {
      command(item)
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [items])
  useEffect(() => {
    const el = refs.current[selectedIndex]
    if (el) {
      el.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'start',
      })
    }
  }, [selectedIndex])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))

  if (!items || items.length === 0) return null

  return (
    <MenuList>
      {items.map((item, index) => (
        <span
          ref={el => {
            refs.current[index] = el
          }}
          className={clsx(
            index === selectedIndex
              ? 'bg-surface-100 text-basicSurface-900'
              : 'bg-surface-50 text-basicSurface-700',
            'flex items-center px-4 py-2 space-x-2',
            'cursor-pointer',
          )}
          key={item.id}
          onClick={() => selectItem(index)}
        >
          {item.native}
          <div>{item.colons}</div>
        </span>
      ))}
    </MenuList>
  )
})
