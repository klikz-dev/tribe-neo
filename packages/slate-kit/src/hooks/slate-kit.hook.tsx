/* eslint @typescript-eslint/no-empty-function: 0 */
/* eslint no-restricted-imports: 0 */

import React from 'react'

import { SlateKitContextProps, SlateKitProps } from '../types'

export const SlateKitContext = React.createContext<SlateKitProps>({
  kit: null,
  mode: 'live',
  context: {} as SlateKitContextProps,
  revertSlateUpdatesById: () => {},
  selectBlock: () => {},
  setMode: () => {},
  setSlateUpdates: () => {},
  unselectBlock: () => {},
  updateActiveBlock: () => {},
  setActiveBlocks: () => {},
  pushActiveBlock: () => {},
  popActiveBlock: () => {},
  updateSlateById: () => {},
})

export const useSlateKit = (): SlateKitProps => {
  const context = React.useContext(SlateKitContext)
  return context
}
