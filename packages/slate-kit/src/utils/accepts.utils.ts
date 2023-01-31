import { CompiledSlate, CompiledSlateComponent } from '../types/slate.types'

export const isAcceptsAfter = (
  components: Record<string, CompiledSlateComponent>,
  componentIds: string | string[],
): boolean => {
  if (Array.isArray(componentIds)) {
    return true
  }
  return (
    (components[componentIds] as CompiledSlateComponent).acceptsAfter !== false
  )
}

export const isAcceptsBefore = (
  components: Record<string, CompiledSlateComponent>,
  componentIds: string | string[],
): boolean => {
  if (Array.isArray(componentIds)) {
    return true
  }
  return (
    (components[componentIds] as CompiledSlateComponent).acceptsBefore !== false
  )
}

export const fixAccepts = (
  compiledSlate: CompiledSlate,
  componentId: string,
  acceptsAfter?: boolean,
  acceptsBefore?: boolean,
): void => {
  const component = compiledSlate.components[
    componentId
  ] as CompiledSlateComponent
  const parentAcceptsAfter =
    typeof acceptsAfter === 'undefined' ? true : acceptsAfter
  const parentAcceptsBefore =
    typeof acceptsBefore === 'undefined' ? true : acceptsBefore
  component.acceptsAfter =
    component.acceptsAfter !== false && parentAcceptsAfter
  component.acceptsBefore =
    component.acceptsBefore !== false && parentAcceptsBefore
  component.acceptsChildren = component.acceptsChildren === true
  component.removable = component.removable !== false
  compiledSlate.parentsMapping[componentId]?.forEach(parent =>
    fixAccepts(
      compiledSlate,
      parent,
      component.acceptsAfter,
      component.acceptsBefore,
    ),
  )
}
