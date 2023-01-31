import { FC } from 'react'

import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Icon, IconProps } from '../Icon'
import { As, HTMLTribeProps } from '../system'
import { TabSize, TabsProvider, TabVariant, useTabs } from './TabsContext'

/**
 * An accessible tabs component that provides keyboard interactions and ARIA attributes described in the WAI-ARIA Tabs Design Pattern.
 */
export const Tabs = () => null

export type TabGroupProps = {
  /**
   * The component that you want to use
   * @default Tab.Group
   */
  as?: As
  /**
   * The default selected index
   * @default 0
   */
  defaultIndex?: number
  /**
   * A function called whenever the active tab changes.
   */
  onChange?: (index: number) => void
  /**
   * When true, the user can only display a panel via the keyboard by first navigating to it using the arrow keys, and then by pressing Enter or Space.
   * By default, panels are automatically displayed when navigated to via the arrow keys. Note that this prop has no affect on mouse behavior.
   * @default false
   */
  manual?: boolean
}

const TabGroup: FC<TabGroupProps> = props => {
  const { as: Component = Tab.Group, children, ...rest } = props

  return <Component {...rest}>{children}</Component>
}

export type TabListProps = React.ComponentProps<'div'> & {
  as?: As
  variant?: TabVariant
  size?: TabSize
  fullWidth?: boolean
  shadow?: boolean
  /**
   * 'none' - no border radius on mobile and desktop
   * 'desktop' - no border radius on mobile, rounded on desktop
   * 'all' - rounded on both mobile and desktop
   * @default all
   */
  rounded?: 'none' | 'desktop' | 'all'
  divide?: boolean
  attached?: 'bottom' | 'top' | 'none'
}

const TabList: FC<TabListProps> = props => {
  const {
    as: Component = Tab.List,
    children,
    className,
    variant = 'bar',
    size = 'md',
    fullWidth = false,
    shadow = true,
    rounded = 'desktop',
    divide = true,
    attached = 'none',
  } = props

  const barClsx = [
    'z-0',
    divide && 'divide-x divide-neutral-200',
    shadow && 'shadow',
    rounded === 'none' && 'rounded-t-none rounded-b-none',
    rounded === 'desktop' &&
      'rounded-t-none rounded-b-none sm:rounded-t-lg sm:rounded-b-lg',
    rounded === 'all' && 'rounded-t-lg rounded-b-lg',
  ]

  let attachedClsx = ''
  if (attached === 'top')
    attachedClsx =
      'rounded-t-none sm:rounded-t-none border-t border-t-neutral-200'
  if (attached === 'bottom')
    attachedClsx =
      'rounded-b-none sm:rounded-b-none border-b border-b-neutral-200'

  return (
    <Component
      className={twMerge(
        clsx(
          'overflow-x-auto isolate relative',
          variant === 'bar' && barClsx,
          variant === 'bar' && attachedClsx,
          variant === 'pills' && 'space-x-4',
          variant === 'pills-accent' && 'space-x-4',
          !fullWidth && 'inline-flex flex-nowrap',
          fullWidth && 'flex  flex-nowrap',
          className,
        ),
      )}
      aria-label="Tabs"
    >
      <TabsProvider variant={variant} size={size} fullWidth={fullWidth}>
        {children}
      </TabsProvider>
    </Component>
  )
}

export type TabItemProps = HTMLTribeProps<'button'> & {
  as?: As
  selected?: boolean
  leadingIcon?: IconProps
}

const TabItem: FC<TabItemProps> = props => {
  const {
    as: Component = Tab,
    children,
    leadingIcon,
    className: customClassName,
    disabled,
    selected: customSelected,
    ...rest
  } = props
  const { variant, size, fullWidth } = useTabs()

  const variantBar = selected => [
    selected
      ? 'text-basicSurface-900'
      : 'text-basicSurface-500 hover:text-basicSurface-700',
    'group relative text-center',
    'bg-surface-50  hover:bg-surface-100',
    size === 'md' && 'py-4 px-4 m-0 text-sm',
    size === 'sm' && 'py-3 px-2 m-0 text-sm leading-4',
  ]

  const variantPills = selected => [
    selected
      ? 'bg-surface-200 text-basicSurface-700'
      : 'text-basicSurface-500 hover:text-basicSurface-700',
    'rounded-md',
    size === 'md' && 'px-3 py-1.5',
    size === 'sm' && 'px-2 py-1.5 text-sm leading-4',
  ]
  const variantPillsAccent = selected => [
    selected
      ? 'bg-actionPrimary-100 text-actionPrimary-700'
      : 'text-basicSurface-500 hover:text-basicSurface-700',
    'rounded-md',
    size === 'md' && 'px-3 py-1.5',
    size === 'sm' && 'px-2 py-1.5 text-sm leading-4',
  ]

  let className: any = ({ selected }) =>
    clsx(
      !fullWidth && 'flex-grow-0 flex-shrink-0',
      fullWidth && 'flex-1',
      variant === 'bar' && variantBar(selected),
      variant === 'pills' && variantPills(selected),
      variant === 'pills-accent' && variantPillsAccent(selected),
      'focus:outline-none focus-visible:ring focus-visible:ring-inset focus:z-10',
      disabled && 'opacity-50 cursor-default',
      customClassName,
    )
  let content: any = ({ selected }) => (
    <>
      {leadingIcon && (
        <Icon
          className={clsx(
            selected
              ? 'text-actionPrimary-500'
              : 'text-basicSurface-400 group-hover:text-basicSurface-500',
            'inline-block -ml-0.5 mr-2 h-5 w-5',
          )}
        >
          {leadingIcon}
        </Icon>
      )}
      {children}
      {variant === 'bar' && (
        <span
          aria-hidden="true"
          className={clsx(
            selected ? 'bg-actionPrimary-500' : 'bg-transparent',
            'absolute inset-x-0 bottom-0 h-0.5',
          )}
        />
      )}
    </>
  )
  if (Component !== Tab) {
    className = className({ selected: customSelected })
    content = content({ selected: customSelected })
  }

  return (
    <Component className={className} disabled={disabled} {...rest}>
      {content}
    </Component>
  )
}

export type TabPanelsProps = React.ComponentProps<'div'> & {
  as?: As
}

const TabPanels: FC<TabPanelsProps> = props => {
  const { as: Component = Tab.Panels, children, className, ...rest } = props

  return (
    <div className={clsx('mt-4', className)} {...rest}>
      <Component>{children}</Component>
    </div>
  )
}
const TabPanel = props => {
  const { as: Component = Tab.Panel, children, className, ...rest } = props

  return (
    <Component
      className={clsx('focus:outline-none focus-visible:ring', className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

Tabs.Group = TabGroup
Tabs.List = TabList
Tabs.Tab = TabItem
Tabs.Panels = TabPanels
Tabs.Panel = TabPanel
