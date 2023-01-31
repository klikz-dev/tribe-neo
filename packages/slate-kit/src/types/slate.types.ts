import { BaseSlateDto } from '../dtos/base-slate.dto'
import { RawSlateComponentDto } from '../dtos/raw-slate-component.dto'
import { SlateEditable } from '../enums/slate-editable.enum'

export type CompiledSlateComponent = RawSlateComponentDto & {
  props: Record<string, any>
  acceptsAfter: boolean
  acceptsBefore: boolean
  acceptsChildren: boolean
  removable: boolean
}

export type PartialSlateComponent = Partial<CompiledSlateComponent> & {
  id: string
}

export type CompiledSlate = BaseSlateDto & {
  acceptsAfter: boolean
  acceptsBefore: boolean
  acceptsChildren: boolean
  editable: SlateEditable
  components: Record<string, CompiledSlateComponent>
  parentsMapping: Record<string, string[]>
}

export type SlateUpdates = {
  rootComponents?: string[]
  updatedComponents?: CompiledSlateComponent[]
  addedComponents?: CompiledSlateComponent[]
  removedComponentIds?: string[]
}

export type PartialSlateUpdates = {
  rootComponents?: string[]
  updatedComponents?: PartialSlateComponent[]
  addedComponents?: CompiledSlateComponent[]
  removedComponentIds?: string[]
}
