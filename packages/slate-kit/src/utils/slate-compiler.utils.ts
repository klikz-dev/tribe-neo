import { SlateDto } from '../dtos'
import { SlateEditable } from '../enums'
import {
  CompiledSlate,
  CompiledSlateComponent,
  SlateUpdates,
} from '../types/slate.types'
import { fixAccepts } from './accepts.utils'
import { cleanComponents, removeIds } from './change-slate.utils'

export const compileSlate = (options: {
  slate: SlateDto
  slateUpdates: SlateUpdates
}): CompiledSlate => {
  const { slate, slateUpdates } = options
  const updatedComponents =
    slateUpdates.updatedComponents?.reduce(
      (preValue, value) => ({ ...preValue, [value.id]: value }),
      {},
    ) || {}
  const { addedComponents = [], removedComponentIds = [] } = slateUpdates
  const components = [...slate.components, ...addedComponents].map(c =>
    updatedComponents[c.id] ? updatedComponents[c.id] : c,
  )

  const compiledSlate: CompiledSlate = {
    id: slate.id,
    rootComponents: removeIds(
      slateUpdates.rootComponents || slate.rootComponents,
      removedComponentIds,
    ),
    acceptsAfter: slate.acceptsAfter !== false,
    acceptsBefore: slate.acceptsBefore !== false,
    acceptsChildren: true,
    editable: slate.editable || SlateEditable.EDIT_COMPONENT,
    components: {},
    parentsMapping: {},
  }
  cleanComponents(components, removedComponentIds).forEach(c => {
    compiledSlate.components[c.id] = c
    c.children?.forEach(child => {
      const arrayChild = Array.isArray(child) ? child : [child]
      arrayChild.forEach(child => {
        compiledSlate.parentsMapping[child] =
          compiledSlate.parentsMapping[child] || []
        compiledSlate.parentsMapping[child].push(c.id)
      })
    })
  })
  Object.keys(compiledSlate.components).forEach(c =>
    fixAccepts(compiledSlate, c),
  )
  compiledSlate.rootComponents.forEach(c => {
    const component = compiledSlate.components[c] as CompiledSlateComponent
    compiledSlate.acceptsAfter =
      compiledSlate.acceptsAfter && component.acceptsAfter !== false
    compiledSlate.acceptsBefore =
      compiledSlate.acceptsBefore && component.acceptsBefore !== false
    compiledSlate.acceptsChildren =
      compiledSlate.acceptsChildren && component.acceptsChildren !== false
  })
  return compiledSlate
}
