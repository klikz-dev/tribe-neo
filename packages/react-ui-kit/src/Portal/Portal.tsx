import { FC } from 'react'

import { Portal as HeadlessPortal } from '@headlessui/react'

/**
 * Portal is used to transport any component or element to the end of document.body and renders a React tree into it.
 *
 * Useful for rendering a natural React element hierarchy with a different DOM hierarchy
 * to prevent parent styles from clipping or hiding content (for popovers, dropdowns, and modals).
 *
 */
export const Portal: FC = ({ children }) => (
  <HeadlessPortal>{children}</HeadlessPortal>
)
