import { Dispatch, SetStateAction } from 'react'

import { ActiveBlock } from '../blocks'
import { SlateDto } from '../dtos/slate.dto'
import { SlateEditable } from '../enums/slate-editable.enum'
import { SlateKit } from '../slate-kit'
import { SlateContextProps, SlateKitContextProps } from './context.types'
import {
  CompiledSlate,
  CompiledSlateComponent,
  PartialSlateComponent,
  PartialSlateUpdates,
  SlateUpdates,
} from './slate.types'

export type SlateKitMode = 'live' | 'edit'
export type SlateMode = 'live' | 'preview' | 'edit'

export type SlateKitProps = {
  kit: SlateKit
  mode: SlateKitMode
  context: SlateKitContextProps
  setMode: Dispatch<SetStateAction<SlateKitMode>>
  updateActiveBlock: (updateBlock?: Partial<ActiveBlock>) => void
  setActiveBlocks: Dispatch<SetStateAction<ActiveBlock[]>>
  pushActiveBlock: (block: ActiveBlock) => void
  popActiveBlock: () => void
  selectBlock: (block: { id: string; level: number }) => void
  unselectBlock: (block: { id: string; level: number }) => void
  updateSlateById: (slateId: string, updates: SlateUpdates) => void
  revertSlateUpdatesById: (slateId: string) => void
  setSlateUpdates: Dispatch<
    SetStateAction<Record<string, SlateUpdates | undefined>>
  >
}

export type SlateProps = {
  mode: SlateMode
  editable: SlateEditable
  rawSlate: SlateDto
  slate: CompiledSlate
  context: SlateContextProps
  updateSlate: (changes: PartialSlateUpdates) => void
  updateComponentById: (
    id: string,
    input: Omit<PartialSlateComponent, 'id'>,
  ) => void
  revertSlateUpdates: () => void
  updateBlockOutput: (componentId: string, output: Record<string, any>) => void
}

export type SlateComponentProps = {
  component: CompiledSlateComponent
  componentId: string
  componentLevel: number
  parentComponentId: string | null
  activated: boolean
  selected: boolean
  output: Record<string, any>
  updateComponent: (input: Omit<PartialSlateComponent, 'id'>) => void
  updateOutput: (output: Record<string, any>) => void
  updateProps: (props: Record<string, any>) => void
  upsertProp: (key: string, value: any) => void
}
