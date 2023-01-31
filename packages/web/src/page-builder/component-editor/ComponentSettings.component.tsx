import { ReactElement } from 'react'

import {
  SlateComponentContext,
  SlateContext,
  useSlateKit,
} from '@tribeplatform/slate-kit/hooks'
import { SlateProps } from '@tribeplatform/slate-kit/types'
import {
  getSlateComponentProps,
  getSlateProps,
} from '@tribeplatform/slate-kit/utils'

export type ComponentSettingsProps = {
  componentId: string
  parentComponentId: string
  componentLevel: number
  Settings: ReactElement
  slateProps: SlateProps
}

export const ComponentSettings = ({
  componentId,
  parentComponentId,
  componentLevel,
  Settings,
  slateProps,
}: ComponentSettingsProps): ReactElement => {
  const slateKitProps = useSlateKit()
  const newSlateProps = getSlateProps(slateKitProps, slateProps, 'live')

  return (
    <SlateContext.Provider value={newSlateProps}>
      <SlateComponentContext.Provider
        value={getSlateComponentProps(slateKitProps, newSlateProps, {
          componentId,
          parentComponentId,
          componentLevel,
        })}
      >
        {Settings}
      </SlateComponentContext.Provider>
    </SlateContext.Provider>
  )
}
