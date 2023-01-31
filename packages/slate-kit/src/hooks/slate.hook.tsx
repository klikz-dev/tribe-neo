/* eslint @typescript-eslint/no-empty-function: 0 */
/* eslint no-restricted-imports: 0 */

import React from 'react'

import { SlateDto } from '../dtos'
import { SlateEditable } from '../enums'
import {
  CompiledSlate,
  SlateContextProps,
  SlateMode,
  SlateProps,
} from '../types'

export const SlateContext = React.createContext<SlateProps>({
  mode: undefined as unknown as SlateMode,
  editable: undefined as unknown as SlateEditable,
  rawSlate: {} as SlateDto,
  slate: {} as CompiledSlate,
  context: {} as SlateContextProps,
  revertSlateUpdates: () => {},
  updateComponentById: () => {},
  updateSlate: () => {},
  updateBlockOutput: () => {},
})

export const useSlate = (): SlateProps => {
  const context = React.useContext(SlateContext)
  return context
}
