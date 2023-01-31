import { ReactElement } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { AddBlock } from '../blocks'
import { SlateEditable } from '../enums'
import { useSlate, useSlateComponent, useSlateKit } from '../hooks'
import { CompiledSlateComponent, SlateUpdates } from '../types'
import { addToChildren, isAcceptsAfter, isAcceptsBefore } from '../utils'
import { SlateComponentRenderer } from './SlateComponentRenderer.component'

type BlockContainerProps = {
  childId: number | 'all'
  componentAdder?: AddBlock
}

export const BlockContainer = ({
  childId,
  componentAdder: ComponentAdder,
}: BlockContainerProps): ReactElement | null => {
  const { kit, updateActiveBlock } = useSlateKit()
  ComponentAdder = ComponentAdder || kit.loadComponentAdder()
  const { mode, editable, slate, updateSlate } = useSlate()
  const { componentId = '' } = useSlateComponent()
  const component = slate.components[componentId]
  const permitToAdd = [SlateEditable.ALL, SlateEditable.ADD_COMPONENT].includes(
    editable,
  )

  if (!component) childId = 'all'

  const slateComponent = component as CompiledSlateComponent
  const componentChildren = slateComponent
    ? slateComponent?.children || []
    : slate.rootComponents
  let childrenIds =
    childId === 'all' ? componentChildren : componentChildren[childId] || []

  if (!Array.isArray(childrenIds)) childrenIds = [childrenIds]
  const children: ReactElement[] = childrenIds.map(child => (
    <SlateComponentRenderer key={child.toString()} componentIds={child} />
  ))

  if (mode === 'live') return <>{children}</>
  if (mode === 'preview') return null

  const onAdd = (afterId?: string | string[]) => e => {
    const id = uuidv4()
    const changes: SlateUpdates = {
      addedComponents: [
        {
          id,
          name: 'BlockPreview',
          props: {},
          acceptsAfter: true,
          acceptsBefore: true,
          acceptsChildren: true,
          removable: true,
        },
      ],
    }
    const newChildren = addToChildren({
      children: componentChildren,
      newId: id,
      afterId,
      childId: childId === 'all' ? undefined : childId,
    })
    if (slateComponent) {
      changes.updatedComponents = [
        {
          ...slateComponent,
          children: newChildren,
        },
      ]
    } else {
      changes.rootComponents = newChildren as string[]
    }
    updateSlate(changes)
    updateActiveBlock({
      id,
      name: 'Block Preview',
      Settings: kit.loadSettings('BlockPreview'),
    })
    e.stopPropagation()
  }
  const insertComponentAdder = (afterId?: string | string[]) => {
    const key = afterId ? `add-block-${afterId}` : 'add-block'
    return ComponentAdder ? (
      <ComponentAdder key={key} onAdd={onAdd(afterId)} />
    ) : null
  }
  const acceptsBefore =
    permitToAdd &&
    isAcceptsBefore(slate.components, children[0]?.props?.componentIds || [])
  const content = acceptsBefore ? [insertComponentAdder()] : []

  children.forEach(child => {
    content.push(child)
    if (
      permitToAdd &&
      isAcceptsAfter(slate.components, child.props.componentIds)
    ) {
      content.push(insertComponentAdder(child.props.componentIds))
    }
  })

  return <>{content.filter(c => c)}</>
}
