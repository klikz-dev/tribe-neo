import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

import clsx from 'clsx'

import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'

import './style.css'
import { Mention } from '../../../Composer/@types'
import { MenuList } from '../../components/MenuList'

export const MentionList = forwardRef<
  unknown,
  { items: Mention[]; command: unknown }
>(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = index => {
    const item = items[index]

    if (item) {
      command({ id: item.id, label: item.title })
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

  if (!items || items?.length === 0) return null

  return (
    <MenuList>
      {items.map((item, index) => (
        <span
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
          <Avatar size="xs" src={item.icon} name={item.title} />
          <p className="ml-2 truncate">{item.title}</p>
        </span>
      ))}
    </MenuList>
  )
})
