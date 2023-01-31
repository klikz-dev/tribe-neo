import {
  MutationUpdateSlatesArgs,
  Slate,
} from '@tribeplatform/gql-client/types'
import { UseMutationOptions } from '@tribeplatform/react-sdk/lib'
import { SlateUpdates } from '@tribeplatform/slate-kit/types'
import { rawSlateComponentToDto } from '@tribeplatform/slate-kit/utils'

type SlateUpdatesOptions = UseMutationOptions<
  Slate[],
  Error,
  MutationUpdateSlatesArgs
>

const updateSlates = (
  originalUpdateSlates,
  input: { id: string; changes: SlateUpdates }[],
  options?: SlateUpdatesOptions,
) => {
  const cleanInput = input.map(({ id, changes }) => ({
    ...changes,
    id,
    addedComponents: changes.addedComponents?.map(c =>
      rawSlateComponentToDto(c),
    ),
    updatedComponents: changes.updatedComponents?.map(c =>
      rawSlateComponentToDto(c),
    ),
  }))
  originalUpdateSlates(
    { input: cleanInput },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        options?.onSuccess(data, variables, context)
      },
    },
  )
}

export const commitNavigationSlateUpdates = (
  originalUpdateSlates,
  slateUpdates: SlateUpdates,
  options?: SlateUpdatesOptions,
) => {
  const updates = Object.keys(slateUpdates)
    .filter(id => slateUpdates[id])
    .map(id => ({ id, changes: slateUpdates[id] as SlateUpdates }))
  if (updates.length > 0) {
    updateSlates(originalUpdateSlates, updates, options)
  } else {
    options?.onSettled(
      undefined,
      undefined,
      { input: updates },
      { snapshot: undefined },
    )
  }
}
