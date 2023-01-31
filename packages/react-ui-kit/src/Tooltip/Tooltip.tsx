import {
  Fragment,
  useState,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  createRef,
  HTMLAttributes,
} from 'react'

import { Portal, Transition } from '@headlessui/react'
import { Placement, PositioningStrategy } from '@popperjs/core'
import clsx from 'clsx'
import { usePopper } from 'react-popper'

import { useGetLatest } from '../utils'
import { TooltipContext, useTooltip } from './TooltipContext'

export type TooltipProps = {
  children: ReactNode
  placement?: Placement
  strategy?: PositioningStrategy
}

/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#tooltip
 */
export const Tooltip = (props: TooltipProps) => {
  const { children, placement = 'top', strategy = 'absolute' } = props

  const [visible, setVisible] = useState(false)

  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)

  const modifiers = [
    { name: 'offset', options: { offset: [0, 4] } },
    {
      name: 'arrow',
      options: {
        element: arrowElement,
      },
    },
  ]

  const { styles, attributes, ...popperProps } = usePopper(
    triggerRef,
    tooltipRef,
    {
      placement,
      strategy,
      modifiers,
    },
  )

  const { update } = popperProps
  const getLatest = useGetLatest({
    visible,
    triggerRef,
    tooltipRef,
  })

  const showTooltip = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  const hideTooltip = useCallback(() => {
    setVisible(false)
  }, [setVisible])

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
          hideTooltip()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [getLatest, hideTooltip])

  // Trigger: hover on trigger
  useEffect(() => {
    if (triggerRef == null) return

    triggerRef.addEventListener('mouseenter', showTooltip)
    triggerRef.addEventListener('mouseleave', hideTooltip)
    return () => {
      triggerRef.removeEventListener('mouseenter', showTooltip)
      triggerRef.removeEventListener('mouseleave', hideTooltip)
    }
  }, [triggerRef, showTooltip, hideTooltip])

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
    <TooltipContext.Provider
      value={{
        open: visible,
        onOpen: showTooltip,
        onClose: hideTooltip,
        styles,
        attributes,
        setButtonElement: setTriggerRef,
        setPanelElement: setTooltipRef,
        setArrowElement,
      }}
    >
      {children}
    </TooltipContext.Provider>
  )
}
const TooltipTrigger: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const { setButtonElement } = useTooltip()

  return (
    <div ref={setButtonElement} {...props}>
      {children}
    </div>
  )
}

const TooltipPanel: FC = ({ children }) => {
  const { open, styles, attributes, setPanelElement } = useTooltip()

  const panelRef = createRef<HTMLDivElement>()
  const arrowRef = createRef<HTMLDivElement>()

  return (
    <Portal>
      <div ref={panelRef} style={styles.popper} {...attributes.popper}>
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
          <div
            className={clsx(
              'py-2 px-3',
              'w-max max-w-md rounded-lg',
              'bg-basicSurface-800 text-surface-50 text-center text-xs pointer-events-none',
            )}
          >
            {children}
            <div ref={arrowRef}>
              {/* <svg */}
              {/*  viewBox="0 0 255 255" */}
              {/*  xmlSpace="preserve" */}
              {/*  className="absolute text-black h-2 w-2" */}
              {/*  style={styles.arrow} */}
              {/* > */}
              {/*  <polygon className="fill-current" points="0,0 127.5,127.5 255,0" /> */}
              {/* </svg> */}
            </div>
          </div>
        </Transition>
      </div>
    </Portal>
  )
}

Tooltip.Trigger = TooltipTrigger
Tooltip.Panel = TooltipPanel
