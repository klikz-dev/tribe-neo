import { ReactElement } from 'react'

import {
  SlateComponentContext,
  useSlate,
  useSlateComponent,
  useSlateKit,
} from '../hooks'
import { compileProps } from '../utils/props-compiler.utils'
import { getSlateComponentProps } from '../utils/slate-component-props.utils'

type SlateRendererProps = {
  componentIds: string | string[]
}

export const SlateComponentRenderer = ({
  componentIds,
}: SlateRendererProps): ReactElement | null => {
  const slateKitProps = useSlateKit()
  const { kit } = slateKitProps
  const slateProps = useSlate()
  const { slate, context } = slateProps
  const { componentId: parentComponentId, componentLevel } = useSlateComponent()

  if (!slate || !componentIds) return null
  const flatComponentIds = Array.isArray(componentIds)
    ? componentIds
    : [componentIds]

  const result = flatComponentIds
    .map(componentId => {
      const component = slate.components[componentId]
      if (!component) return null

      const { name, props = {}, children = [] } = component
      if (!name) return null

      const childrenComponent = children.map(child => (
        <SlateComponentRenderer key={child.toString()} componentIds={child} />
      ))

      const compiledProps = compileProps(props, context)
      const loadedComponent = kit.loadComponent({
        key: componentId,
        name,
        compiledProps,
        children: childrenComponent,
      })
      return loadedComponent ? (
        <SlateComponentContext.Provider
          key={componentId}
          value={getSlateComponentProps(slateKitProps, slateProps, {
            componentId,
            parentComponentId,
            componentLevel,
          })}
        >
          {loadedComponent}
        </SlateComponentContext.Provider>
      ) : null
    })
    .filter(c => c)

  if (result.length === 1) return result[0]
  return <>{result}</>
}
