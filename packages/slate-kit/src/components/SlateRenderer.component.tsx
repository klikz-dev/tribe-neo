import { ReactElement } from 'react'

import { useParams } from 'react-router'

import { SlateDto } from '../dtos'
import { SlateContext, useSlate, useSlateKit } from '../hooks'
import { SlateContextProps } from '../types'
import { useQuery } from '../utils'
import { getSlateProps } from '../utils/slate-props.utils'
import { BlockContainer } from './BlockContainer.component'

type SlateRendererProps = {
  slate: SlateDto
  path?: string
  additionalContext?: Record<string, any>
}

export const SlateRenderer = ({
  slate,
  path: customPath,
  additionalContext = {},
}: SlateRendererProps): ReactElement | null => {
  const { kit } = useSlateKit()
  const urlParams = useParams()
  const queryParams = useQuery()
  const slateKitProps = useSlateKit()
  const { context: slateContext = {} as SlateContextProps } = useSlate()

  if (!slate) return null

  const { path: initialPath } = slateContext

  const SlateWrapper = kit.loadSlateWrapper()
  const content = <BlockContainer childId="all" />

  return (
    <SlateContext.Provider
      value={getSlateProps(slateKitProps, {
        rawSlate: slate,
        context: {
          path: customPath || initialPath,
          urlParams,
          queryParams,
          ...additionalContext,
        },
      })}
    >
      {SlateWrapper ? <SlateWrapper>{content}</SlateWrapper> : content}
    </SlateContext.Provider>
  )
}
