import { SlateContextProps } from '../types/context.types'
import { SlateKitProps, SlateMode, SlateProps } from '../types/props.types'
import {
  CompiledSlateComponent,
  PartialSlateComponent,
  PartialSlateUpdates,
} from '../types/slate.types'
import { slateChangeMerger, slateUpdatesIsEmpty } from './change-slate.utils'
import { compileSlate } from './slate-compiler.utils'

export const getSlateProps = (
  slateKitProps: SlateKitProps,
  slateProps: Partial<Omit<SlateProps, 'context'>> & {
    context: Partial<SlateContextProps>
  },
  customMode?: SlateMode,
): SlateProps => {
  const {
    mode: slateKitMode,
    context: slateKitContext,
    updateSlateById,
    revertSlateUpdatesById,
  } = slateKitProps
  const { rawSlate: slate, context } = slateProps

  const mode: SlateMode =
    customMode || (slateKitMode === 'edit' ? 'edit' : 'live')

  const generalSlateUpdates = slateKitContext.slateUpdates || {}
  const slateUpdates = generalSlateUpdates[slate?.id] || {}
  const compiledSlate = compileSlate({ slate, slateUpdates })
  const blocksOutput = Object.values(compiledSlate.components).reduce(
    (preValue, value) => ({
      ...preValue,
      [value.id]: (value as CompiledSlateComponent)?.output,
    }),
    {},
  )
  const updateSlate = (newChanges: PartialSlateUpdates) => {
    const compiledUpdates = slateChangeMerger(
      compileSlate({ slate, slateUpdates: {} }),
      slateUpdates,
      newChanges,
    )
    if (slateUpdatesIsEmpty(compiledUpdates)) {
      revertSlateUpdatesById(slate.id)
    } else {
      updateSlateById(slate.id, compiledUpdates)
    }
  }
  const updateComponentById = (
    componentId: string,
    input: Omit<PartialSlateComponent, 'id'>,
  ) => {
    updateSlate({ updatedComponents: [{ id: componentId, ...input }] })
  }
  const revertSlateUpdates = () => {
    revertSlateUpdatesById(slate.id)
  }
  const updateBlockOutput = (componentId, output) => {
    updateComponentById(componentId, { output })
  }
  return {
    mode,
    editable: compiledSlate.editable,
    rawSlate: slate,
    slate: compiledSlate,
    context: {
      ...context,
      network: slateKitContext.network,
      visitor: slateKitContext.visitor,
      blocksOutput,
    } as SlateContextProps,
    updateSlate,
    updateComponentById,
    revertSlateUpdates,
    updateBlockOutput,
  }
}
