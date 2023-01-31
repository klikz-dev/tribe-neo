import { FC, ReactNode, useReducer, useMemo, useRef } from 'react'

import { Menu } from '@headlessui/react'

import { shallowCompare } from '../utils/shallow-compare'
import { useOnClickOutside } from '../utils/useOnClickOutside'
import { MenuContent, MenuPage } from './Menu'

export type Item = {
  title: string
  icon?: ReactNode
  value?: unknown
  page?: {
    title?: string
    items: Item[]
  }
}

type NavigationalDropdownProps = FC<{
  items: Item[]
  onClick?: (item: Item, event: React.MouseEvent<HTMLElement>) => void
  trigger?: ReactNode
  value?: unknown
}>
const initialState = {
  open: false,
  page: null,
}

const Types = {
  back: 'back',
  reset: 'reset',
  setPage: 'setPage',
  setOpen: 'setOpen',
}

const reducer = (state, action) => {
  switch (action.type) {
    case Types.reset:
      return initialState
    case Types.setPage:
      return { ...state, page: action.page }
    case Types.back: // this can be used to have multiple page within each other later by using stack
      return { ...state, page: initialState.page }
    case Types.setOpen:
      return { ...state, open: action.open }
    default:
      return state
  }
}

const getActiveItem = (value: unknown, items: Item[]): Item | undefined => {
  if (!value) return undefined

  let active: Item | undefined
  items.forEach(item => {
    if (!active) {
      if (item.value === value) {
        active = item
      } else if (
        typeof value === 'object' &&
        typeof item.value === 'object' &&
        shallowCompare(item.value, value)
      ) {
        active = item
      }
    }
    if (!active && item.page) {
      active = getActiveItem(value, item.page.items)
    }
  })

  return active
}

export const NavigationalDropdown: NavigationalDropdownProps = ({
  items,
  trigger,
  onClick,
  value,
}) => {
  const ref = useRef(null)

  const [{ open, page }, dispatch] = useReducer(reducer, initialState)
  const close = () => dispatch({ type: Types.reset })
  const toggle = () => dispatch({ type: Types.setOpen, open: !open })

  useOnClickOutside(ref, close)

  const clickHandler = (e, item) => {
    e.stopPropagation()
    if (item?.page) {
      dispatch({ type: Types.setPage, page: item })
    } else {
      onClick?.(item, e)
      close()
    }
  }

  const selectedItem = useMemo(
    () => getActiveItem(value, items),
    [value, items],
  )

  const Trigger = trigger ? (
    <span onClick={toggle}>
      {typeof trigger === 'function' ? trigger({ selectedItem }) : trigger}
    </span>
  ) : (
    <Menu.Button>
      <span onClick={toggle}>More</span>
    </Menu.Button>
  )

  return (
    <Menu as="div" className="relative inline-block">
      <span ref={ref}>
        {Trigger}
        {/* eslint-disable-next-line no-nested-ternary */}
        {open ? (
          page ? (
            <MenuPage
              page={page}
              onItemClick={clickHandler}
              onBack={() => dispatch({ type: Types.back })}
            />
          ) : (
            <MenuContent items={items} onItemClick={clickHandler} />
          )
        ) : null}
      </span>
    </Menu>
  )
}
