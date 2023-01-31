/* eslint @typescript-eslint/no-empty-function: 0 */
import { useContext, createContext } from 'react'

import { CompiledSlateComponent, SlateComponentProps } from '../types'

export const SlateComponentContext = createContext<SlateComponentProps>({
  component: undefined as unknown as CompiledSlateComponent,
  componentLevel: 0,
  componentId: undefined as unknown as string,
  parentComponentId: null,
  activated: false,
  selected: false,
  output: {},
  updateComponent: () => {},
  updateOutput: () => {},
  updateProps: () => {},
  upsertProp: () => {},
})

export const useSlateComponent = (): SlateComponentProps => {
  const context = useContext(SlateComponentContext)
  return context
}
