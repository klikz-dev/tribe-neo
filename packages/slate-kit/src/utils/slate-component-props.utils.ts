import {
  SlateComponentProps,
  SlateKitProps,
  SlateProps,
} from '../types/props.types'
import { CompiledSlateComponent } from '../types/slate.types'

export const getSlateComponentProps = (
  slateKitProps: SlateKitProps,
  slateProps: SlateProps,
  componentProps: Partial<SlateComponentProps>,
): SlateComponentProps => {
  const { context: slateKitContext } = slateKitProps
  const { slate, context, updateComponentById, updateBlockOutput } = slateProps
  const { componentId, parentComponentId, componentLevel } = componentProps
  const component = slate.components[componentId] as CompiledSlateComponent

  return {
    component,
    componentId,
    parentComponentId,
    componentLevel: componentLevel + 1,
    activated: slateKitContext.activeBlock?.id === componentId,
    selected: slateKitContext.selectedBlocks[0]?.id === componentId,
    output: context.blocksOutput[componentId] || {},
    updateComponent: input => updateComponentById(componentId, input),
    updateOutput: output => updateBlockOutput(componentId, output),
    updateProps: props =>
      updateComponentById(componentId, {
        props,
      }),
    upsertProp: (key, value) => {
      updateComponentById(componentId, {
        props: { ...component.props, [key]: value },
      })
    },
  }
}
