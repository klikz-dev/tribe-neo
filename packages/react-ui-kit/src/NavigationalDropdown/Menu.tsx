import { Menu, Transition } from '@headlessui/react'
import ArrowLeftIcon from '@heroicons/react/outline/ArrowLeftIcon'
import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon'
import clsx from 'clsx'

import { Divider } from '../Divider'
import { Icon } from '../Icon'

const Item = props => {
  const { as, children, leadingIcon, disabled, className, hasArrow, ...rest } =
    props

  const Component = as || 'a'

  return (
    <Menu.Item disabled={disabled}>
      {({ active }) => (
        <Component
          className={clsx(
            'flex px-4 py-2 text-sm justify-between items-center',
            { 'bg-surface-100 text-basicSurface-900': active },
            { 'bg-surface-50 text-basicSurface-700': !active },
            { 'opacity-60 cursor-default pointer-events-none': disabled },
            { 'cursor-pointer': !disabled },
            className,
          )}
          {...rest}
        >
          <span className="flex items-center">
            {leadingIcon && (
              <Icon className="mr-3 h-5 w-5 text-basicSurface-400 group-hover:text-basicSurface-500">
                {leadingIcon}
              </Icon>
            )}
            {children}
          </span>
          {hasArrow && (
            <Icon className="h-5 w-5 text-basicSurface-400 group-hover:text-basicSurface-500">
              <ChevronRightIcon />
            </Icon>
          )}
        </Component>
      )}
    </Menu.Item>
  )
}

export const MenuContent = ({ onItemClick, items, className = '' }) => (
  <Transition
    show
    className="inline"
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items
      static
      className={clsx(className, {
        'absolute w-96 left-0 right-0 mt-2 origin-top-right rounded-md shadow-lg bg-surface-50 border border-neutral-200 focus-visible:ring focus:outline-none':
          !className,
      })}
    >
      {items.map(item => (
        <Item
          key={item.title}
          leadingIcon={item.icon}
          hasArrow={!!item.page}
          onClick={e => onItemClick(e, item)}
        >
          {item.title}
        </Item>
      ))}
    </Menu.Items>
  </Transition>
)

export const MenuPage = ({ onBack, page, onItemClick }) => {
  const { page: content, title } = page
  return (
    <Menu.Items
      className="absolute w-96 left-0 right-0 mt-2 origin-top-right flex-col rounded-md shadow-lg bg-surface-50 border border-neutral-200 focus-visible:ring focus:outline-none"
      static
    >
      <div className="justify-between flex py-3 px-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center flex-1"
        >
          <Icon className="h-5 w-5 mr-2 text-basicSurface-400 group-hover:text-basicSurface-500">
            <ArrowLeftIcon />
          </Icon>
          Back
        </button>
        <span className="flex-1 text-center">{title}</span>
        <span className="flex-1" />
      </div>
      <Divider padding="none" />
      <div className="pt-3">
        {content.title && (
          <span className="text-basicSurface-500 text-sm px-4">
            {content.title}
          </span>
        )}
        <MenuContent
          className="overflow-auto pb-4 max-h-48"
          items={content.items}
          onItemClick={onItemClick}
        />
      </div>
    </Menu.Items>
  )
}
