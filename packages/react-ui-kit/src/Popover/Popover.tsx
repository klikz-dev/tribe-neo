import {
  Fragment,
  useState,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  createRef,
  useRef,
  ComponentProps,
} from 'react'

import {
  Popover as HeadlessPopover,
  Portal,
  Transition,
} from '@headlessui/react'
import { Placement } from '@popperjs/core'
import clsx from 'clsx'
import { usePopper } from 'react-popper'

import { BackgroundProvider } from '../BackgroundContext'
import { ChevronDownIcon } from '../icons'
import { HTMLTribeProps } from '../system'
import { runIfFn, useControlledState, useGetLatest } from '../utils'
import {
  PopoverContext,
  PopoverPadding,
  PopoverTriggerType,
  usePopover,
} from './PopoverContext'

export type PopoverProps = {
  children: ReactNode

  className?: string

  delayShow?: boolean | number

  /**
   * Whether tooltip is shown by default
   * @default false
   */
  defaultVisible?: boolean
  /**
   * Used to create controlled tooltip
   */
  visible?: boolean
  /**
   *
   */
  padding?: PopoverPadding
  /**
   * Alias for popper.js placement, see https://popper.js.org/docs/v2/constructors/#placement
   */
  placement?: Placement

  /**
   * Event or events that trigger the tooltip
   * @default click
   */
  trigger?: PopoverTriggerType
  /**
   * If `true`, hovering the tooltip will keep it open. Normally tooltip closes when the mouse cursor moves out of
   * the trigger element. If it moves to the tooltip element, the tooltip stays open.
   * @default false
   */
  interactive?: boolean
}

const DELAY_HIDE = 100
const DELAY_SHOW = 1000

/**
 * Popovers are perfect for floating panels with arbitrary content like navigation menus, mobile menus and flyout menus.
 */
export const Popover = (props: PopoverProps) => {
  const {
    children,
    padding = 'md',
    placement = 'bottom',
    trigger = 'click',
    interactive = false,
    defaultVisible = false,
    visible: propsVisible,
    delayShow = false,
    ...rest
  } = props

  const [visible, setVisible] = useControlledState({
    initial: defaultVisible,
    value: propsVisible,
  })

  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLElement | null>(null)

  const hideTimer = useRef<number>()
  const showTimer = useRef<number>()
  useEffect(() => () => clearTimeout(hideTimer.current), [])
  useEffect(() => () => clearTimeout(showTimer.current), [])

  const { styles, attributes, ...popperProps } = usePopper(
    triggerRef,
    tooltipRef,
    {
      placement,
      modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
    },
  )

  const { update } = popperProps
  const getLatest = useGetLatest({
    visible,
    triggerRef,
    tooltipRef,
  })

  const isTriggeredBy = useCallback(
    (t: PopoverTriggerType) => {
      return trigger === t
    },
    [trigger],
  )

  const show = useCallback(() => {
    clearTimeout(hideTimer.current)
    clearTimeout(showTimer.current)

    const delayShowTime =
      typeof delayShow === 'boolean' ? DELAY_SHOW : delayShow
    showTimer.current = window.setTimeout(
      () => setVisible(true),
      interactive && delayShow ? delayShowTime : 0,
    )
  }, [setVisible])

  const hide = useCallback(() => {
    clearTimeout(hideTimer.current)
    clearTimeout(showTimer.current)

    hideTimer.current = window.setTimeout(
      () => setVisible(false),
      interactive ? DELAY_HIDE : 0,
    )
  }, [interactive, setVisible])

  const toggle = useCallback(() => {
    if (getLatest().visible) {
      hide()
    } else {
      show()
    }
  }, [getLatest, hide, show])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside: EventListener = event => {
      const { tooltipRef, triggerRef } = getLatest()
      const target = event.composedPath?.()?.[0] || event.target
      if (target instanceof Node) {
        if (
          tooltipRef != null &&
          triggerRef != null &&
          !tooltipRef.contains(target) &&
          !triggerRef.contains(target)
        ) {
          hide()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [getLatest, hide])

  // Trigger: click
  useEffect(() => {
    if (triggerRef == null || !isTriggeredBy('click')) return

    triggerRef.addEventListener('click', toggle)

    return () => triggerRef.removeEventListener('click', toggle)
  }, [triggerRef, isTriggeredBy, toggle])

  // Trigger: hover on trigger
  useEffect(() => {
    if (triggerRef == null || !isTriggeredBy('hover')) return

    triggerRef.addEventListener('mouseenter', show)
    triggerRef.addEventListener('mouseleave', hide)
    return () => {
      triggerRef.removeEventListener('mouseenter', show)
      triggerRef.removeEventListener('mouseleave', hide)
    }
  }, [triggerRef, show, hide, isTriggeredBy])

  // Trigger: hover on tooltip, keep it open if hovered
  useEffect(() => {
    if (tooltipRef == null || !interactive) return

    tooltipRef.addEventListener('mouseenter', show)
    tooltipRef.addEventListener('mouseleave', hide)
    return () => {
      tooltipRef.removeEventListener('mouseenter', show)
      tooltipRef.removeEventListener('mouseleave', hide)
    }
  }, [tooltipRef, show, hide, interactive])

  // Handle closing tooltip if trigger hidden
  const isReferenceHidden =
    popperProps?.state?.modifiersData?.hide?.isReferenceHidden
  useEffect(() => {
    if (isReferenceHidden) hide()
  }, [hide, isReferenceHidden])

  // Handle tooltip DOM mutation changes (aka mutation observer)
  useEffect(() => {
    if (tooltipRef == null || update == null) return

    const observer = new MutationObserver(update)
    observer.observe(tooltipRef, {
      attributes: true,
      childList: true,
      subtree: true,
    })
    return () => observer.disconnect()
  }, [tooltipRef, update])

  return (
    <HeadlessPopover {...rest}>
      <PopoverContext.Provider
        value={{
          open: visible,
          onOpen: show,
          onClose: hide,
          padding,
          styles,
          attributes,
          setButtonElement: setTriggerRef,
          setPanelElement: setTooltipRef,
        }}
      >
        {children}
      </PopoverContext.Provider>
    </HeadlessPopover>
  )
}

type PopoverTriggerProps = HTMLTribeProps<'button'>

const PopoverTrigger: FC<PopoverTriggerProps> = props => {
  const { children, className, ...rest } = props
  const { setButtonElement } = usePopover()

  return (
    <HeadlessPopover.Button
      ref={setButtonElement}
      className={clsx(
        'text-basicSurface-500 hover:text-basicSurface-900',
        'group bg-surface-50 rounded-md inline-flex items-center text-base font-medium',
        'focus:outline-none focus-visible:ring',
        className,
      )}
      {...rest}
    >
      {renderProps => (
        <>
          <span>{runIfFn(children, renderProps)}</span>
          <ChevronDownIcon
            className={clsx(
              renderProps.open
                ? 'text-basicSurface-600'
                : 'text-basicSurface-400',
              'ml-2 h-5 w-5 group-hover:text-basicSurface-500',
            )}
            aria-hidden="true"
          />
        </>
      )}
    </HeadlessPopover.Button>
  )
}

const PopoverTriggerMinimal: FC<PopoverTriggerProps> = props => {
  const { children, ...rest } = props

  const { setButtonElement } = usePopover()

  return (
    <HeadlessPopover.Button {...rest} ref={setButtonElement}>
      {renderProps => runIfFn(children, renderProps)}
    </HeadlessPopover.Button>
  )
}

type PopoverPanelProps = HTMLTribeProps<'div'> & {
  rounded?: boolean
}

const PopoverPanel: FC<PopoverPanelProps> = props => {
  const { children, className, rounded = false, ...rest } = props

  const { open, onClose, styles, attributes, setPanelElement } = usePopover()
  const panelRef = createRef<HTMLDivElement>()

  const roundedClsx = [!rounded && 'rounded-lg', rounded && 'rounded-full']

  return (
    <Portal>
      <div ref={panelRef} style={styles.popper} {...attributes.popper}>
        <BackgroundProvider backgroundType="surface">
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            beforeEnter={() => setPanelElement(panelRef.current)}
            afterLeave={() => setPanelElement(null)}
          >
            <HeadlessPopover.Panel
              static
              className={clsx([
                'w-full max-w-md',
                'shadow-lg overflow-hidden border border-neutral-200 focus-visible:ring focus:outline-none',
                'bg-surface-50 text-basicSurface-500',
                roundedClsx,
                className,
              ])}
              {...rest}
            >
              {() => runIfFn(children, { open, close: onClose })}
            </HeadlessPopover.Panel>
          </Transition>
        </BackgroundProvider>
      </div>
    </Portal>
  )
}

type PopoverContentProps = ComponentProps<'div'>

const PopoverContent: FC<PopoverContentProps> = props => {
  const { children, className, ...rest } = props
  const { padding } = usePopover()

  return (
    <div
      className={clsx([
        'relative',
        padding === 'sm' && 'px-2 py-3 sm:px-3',
        padding === 'md' && 'px-4 py-5 sm:p-6 ',
        padding === 'lg' && 'px-5 py-6 sm:p-8',
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  )
}

type PopoverFooterProps = ComponentProps<'div'>

const PopoverFooter: FC<PopoverFooterProps> = props => {
  const { children, className, ...rest } = props
  const { padding } = usePopover()

  return (
    <div
      className={clsx([
        'bg-surface-100',
        padding === 'sm' && 'px-2 py-3 sm:px-3',
        padding === 'md' && 'px-4 py-5 sm:p-6 ',
        padding === 'lg' && 'px-5 py-5 sm:px-8',
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  )
}

Popover.Trigger = PopoverTrigger
Popover.TriggerMinimal = PopoverTriggerMinimal
Popover.Panel = PopoverPanel

Popover.Content = PopoverContent
Popover.Footer = PopoverFooter
