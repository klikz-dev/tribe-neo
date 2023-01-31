import { KeyboardEvent, useCallback, useRef } from 'react'

import { QuillType } from '../@types'

const KeyCodes = {
  ArrowUp: 38,
  ArrowDown: 40,
  Enter: 13,
  Escape: 27,
}

interface DropdownOptions {
  onEscape?: (event: KeyboardEvent) => void
  skipFocusOnIndexes?: number[]
}

const FocusedClassName = 'bg-surface-300'
export const useDropdownKeyboard = (
  containerId: string,
  quill: QuillType,
  options: DropdownOptions,
) => {
  const indexRef = useRef(0)

  const keyEnterHandler = () => {
    hitElement(indexRef.current)
    return false
  }

  const containerSelector = `[data-id="${containerId}"]`

  const keyDownHandler = (event: KeyboardEvent) => {
    const stop = () => {
      event.preventDefault()
      event.stopPropagation()
    }

    switch (event.keyCode) {
      case KeyCodes.ArrowUp:
        stop()
        focusOnElement(indexRef.current - 1)
        break
      case KeyCodes.ArrowDown:
        stop()
        focusOnElement(indexRef.current + 1)
        break
      case KeyCodes.Escape:
        options.onEscape?.(event)
        onHide()
        break
      default:
        break
    }
  }

  const hitElement = useCallback(
    index => {
      const { children = [] } = document.querySelector(containerSelector) || {}
      if (children[index]) (children[index] as HTMLElement).click()
    },
    [containerSelector],
  )

  const focusOnElement = useCallback(
    index => {
      let idx = index

      if (options.skipFocusOnIndexes?.includes(idx)) {
        if (idx > indexRef.current) {
          return focusOnElement(idx + 1)
        }
        return focusOnElement(idx - 1)
      }

      const { children = [] } = document.querySelector(containerSelector) || {}

      if (children.length <= idx) idx = 0
      if (idx < 0) idx = children.length - 1

      if (children[indexRef.current]) {
        children[indexRef.current].classList.remove(FocusedClassName)
      }

      const target = children[idx] as HTMLElement
      if (target) {
        target.classList.add(FocusedClassName)
        indexRef.current = idx
        target.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'start',
        })
      }
    },
    [containerSelector, options],
  )

  const onShow = useCallback(() => {
    if (quill?.root) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      quill.root.addEventListener('keydown', keyDownHandler)
      // enter key should only handled by addBinding otherwise it won't work
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const enterBindings = quill.keyboard.bindings[KeyCodes.Enter]
      const index = enterBindings.findIndex(e => e.containerId === containerId)
      if (index === -1) {
        quill.keyboard.addBinding(
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            containerId,
            key: KeyCodes.Enter,
          },
          keyEnterHandler,
        )

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        quill.keyboard.bindings[KeyCodes.Enter].unshift(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          quill.keyboard.bindings[KeyCodes.Enter].pop(),
        )
      }
    }

    setTimeout(() => {
      focusOnElement(0)
    }, 10)

    // focusOnElement is new each time and causes inconsistent
    // jump when navigating between list items
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId, quill])

  const onHide = useCallback(() => {
    if (quill?.root) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      quill.root.removeEventListener('keydown', keyDownHandler)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const enterBindings = quill.keyboard.bindings[KeyCodes.Enter]
      const index = enterBindings.findIndex(e => e.containerId === containerId)
      if (index > -1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        quill.keyboard.bindings[KeyCodes.Enter].splice(index, 1)
      }
    }
  }, [quill])

  return {
    onShow,
    onHide,
  }
}
