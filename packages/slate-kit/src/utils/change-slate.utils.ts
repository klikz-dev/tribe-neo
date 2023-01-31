import {
  CompiledSlate,
  CompiledSlateComponent,
  PartialSlateUpdates,
  SlateUpdates,
} from '../types/slate.types'
import { equals } from './equality.utils'

export const removeIds = (
  children: (string | string[])[] | undefined,
  removedIds: string[] = [],
) => {
  if (!children) return

  return children
    .map(child => {
      if (Array.isArray(child)) return removeIds(child, removedIds)
      return removedIds.includes(child) ? undefined : child
    })
    .filter(child => child)
}

export const cleanComponents = (
  components: CompiledSlateComponent[],
  removedIds: string[],
): CompiledSlateComponent[] => {
  return components
    .map(c => {
      let props = c.props || {}
      props = typeof props === 'string' ? JSON.parse(props) : props
      let output = c.output || {}
      output = typeof output === 'string' ? JSON.parse(output) : output
      let children = c.children || []
      children = typeof children === 'string' ? JSON.parse(children) : children

      if (removedIds.includes(c.id)) return
      if (children) {
        return {
          ...c,
          props,
          output,
          children: removeIds(children, removedIds),
        }
      }
      return { ...c, props, output }
    })
    .filter(c => c) as CompiledSlateComponent[]
}

export const slateChangeMerger = (
  slate: CompiledSlate,
  oldChanges: SlateUpdates,
  newChanges: PartialSlateUpdates,
): SlateUpdates => {
  const {
    rootComponents = undefined,
    updatedComponents = [],
    addedComponents = [],
    removedComponentIds = [],
  } = oldChanges
  const {
    rootComponents: newRootComponents = undefined,
    updatedComponents: newUpdatedComponents = [],
    addedComponents: newAddedComponents = [],
    removedComponentIds: newRemovedComponentIds = [],
  } = newChanges

  const finalUpdatedComponents = updatedComponents
  const updatedComponentIds = updatedComponents.map(c => c.id)
  const addedComponentIds = addedComponents.map(c => c.id)

  newUpdatedComponents.forEach(c => {
    if (updatedComponentIds.includes(c.id)) {
      const index = updatedComponentIds.indexOf(c.id)
      finalUpdatedComponents[index] = { ...finalUpdatedComponents[index], ...c }
    } else if (addedComponentIds.includes(c.id)) {
      const index = addedComponentIds.indexOf(c.id)
      addedComponents[index] = { ...addedComponents[index], ...c }
    } else {
      const oldComponent = slate.components[c.id] as CompiledSlateComponent
      finalUpdatedComponents.push({
        ...oldComponent,
        ...c,
      })
    }
  })
  const removedIds = [...removedComponentIds, ...newRemovedComponentIds]

  const result = {
    rootComponents: removeIds(newRootComponents || rootComponents, removedIds),
    updatedComponents: cleanComponents(finalUpdatedComponents, removedIds),
    addedComponents: cleanComponents(
      [...addedComponents, ...newAddedComponents],
      removedIds,
    ),
    removedComponentIds: removedIds,
  }
  result.rootComponents = equals(result.rootComponents, slate.rootComponents)
    ? undefined
    : result.rootComponents
  result.updatedComponents = result.updatedComponents.filter(
    c => !equals(c, slate.components[c.id]),
  )
  result.removedComponentIds = result.removedComponentIds.filter(
    id => slate.components[id],
  )
  return result
}

export const addToArray = (
  children: any[],
  newId: string,
  afterId?: string | string[],
) => {
  const afterIdIndex = children.findIndex(child => child === afterId)
  if (afterIdIndex < 0) return [newId, ...children]
  return [
    ...children.slice(0, afterIdIndex + 1),
    newId,
    ...children.slice(afterIdIndex + 1),
  ]
}

export const addToChildren = (options: {
  children: CompiledSlateComponent['children']
  newId: string
  childId?: number
  afterId?: string | string[]
}): (string | string[])[] => {
  const { children = [], newId, childId, afterId } = options

  if (typeof childId === 'number') {
    const updatedChildren = [...children]
    if (updatedChildren.length <= childId) {
      for (let i = updatedChildren.length; i <= childId; i++)
        updatedChildren.push([])
    }
    if (!Array.isArray(updatedChildren[childId]))
      updatedChildren[childId] = [updatedChildren[childId] as string]
    updatedChildren[childId] = addToArray(
      updatedChildren[childId] as any[],
      newId,
      afterId,
    )
    return updatedChildren
  }
  return addToArray(children, newId, afterId)
}

export const slateUpdatesIsEmpty = (slateUpdates: SlateUpdates) => {
  return !(
    (slateUpdates?.addedComponents &&
      slateUpdates?.addedComponents?.length > 0) ||
    (slateUpdates?.removedComponentIds &&
      slateUpdates?.removedComponentIds?.length > 0) ||
    (slateUpdates?.rootComponents &&
      slateUpdates?.rootComponents?.length > 0) ||
    (slateUpdates?.updatedComponents &&
      slateUpdates?.updatedComponents?.length > 0)
  )
}
