import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'

import clsx from 'clsx'

import { Divider } from '@tribeplatform/react-ui-kit/Divider'

import { MenuList } from '../../components/MenuList'
import { MenuItem } from './items'

export const SlashMenuList = forwardRef<
  unknown,
  { items: MenuItem[]; command: unknown }
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
    const nextSelectedItem = items[selectedIndex - 1]
    let step = -1
    if (nextSelectedItem?.type === 'divider') {
      step = -2
    }
    setSelectedIndex((selectedIndex + items.length + step) % items.length)
  }

  const downHandler = () => {
    const nextSelectedItem = items[selectedIndex + 1]
    let step = 1
    if (nextSelectedItem?.type === 'divider') {
      step = 2
    }
    setSelectedIndex((selectedIndex + step) % items.length)
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
      {items.map((item, index) => {
        if (item.type === 'divider') {
          // eslint-disable-next-line react/no-array-index-key
          return <Divider key={`divider-${index}`} />
        }
        return (
          <span
            ref={el => {
              refs.current[index] = el
            }}
            className={clsx(
              index === selectedIndex
                ? 'bg-surface-100 text-basicSurface-900'
                : 'bg-surface-50 text-basicSurface-700',
              'flex items-center px-4 py-2 space-x-2 cursor-pointer',
            )}
            key={item.label}
            onClick={() => selectItem(index)}
          >
            <div className="w-4 h-4 flex items-center">{item.icon}</div>
            <div>{item.label}</div>
          </span>
        )
      })}
    </MenuList>
  )
})
