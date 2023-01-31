import { FC, useEffect, useState } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { Theme } from '../themes/types'
import { Typography } from '../themes/typography/typography'
import { applyTheme } from '../themes/utils'
import { injectHTMLElement } from '../utils/html.injector'

type IFrameThemeProps = React.HTMLProps<HTMLIFrameElement> & {
  darkMode: boolean
  theme: Theme
}

export const IFrame: FC<IFrameThemeProps> = ({
  darkMode,
  theme,
  children,
  className,
  ...props
}) => {
  const [mountedWithStyle, setMountedWithStyle] = useState<boolean>(false)
  const [contentRef, setContentRef] = useState<HTMLIFrameElement>(null)
  const mountDocument = contentRef?.contentWindow?.document

  // copy all the links and styles (tailwind for example) from the root document into the iframe
  useEffect(() => {
    if (mountDocument && !mountedWithStyle) {
      document.querySelectorAll('link').forEach(e => {
        if (e.id !== Typography.linkId) {
          injectHTMLElement({ document: mountDocument, element: e })
        }
      })
      document.querySelectorAll('style').forEach(e => {
        if (e.id !== Typography.styleId) {
          injectHTMLElement({ document: mountDocument, element: e })
        }
      })
      setTimeout(() => {
        setMountedWithStyle(true)
      }, 1000)
    }
  }, [mountDocument, mountedWithStyle])

  useEffect(() => {
    if (mountDocument) {
      applyTheme(mountDocument, theme, darkMode)
    }
  }, [darkMode, theme, mountDocument])

  return (
    <iframe
      title="tribe-device-view"
      ref={setContentRef}
      className={clsx(
        className,
        'transition-opacity duration-300',
        mountedWithStyle ? 'opacity-100' : 'opacity-0',
      )}
      {...props}
    >
      {mountDocument && createPortal(children, mountDocument.body)}
    </iframe>
  )
}
