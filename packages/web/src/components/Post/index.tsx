import { FC } from 'react'

import { ErrorBoundary } from '../Error/ErrorBoundry'
import { PostCard, PostCardProps } from './PostCard'
import { PostRow } from './PostRow'

export const Post: FC<
  PostCardProps & {
    view?: 'card' | 'row'
  }
> = ({
  view = 'card',
  post,
  context,
  activeTagId = '',
  replyBar = true,
  collapsible = true,
  ...rest
}) => {
  if (view === 'row') {
    return (
      <ErrorBoundary>
        <PostRow post={post} context={context} />
      </ErrorBoundary>
    )
  }
  return (
    <ErrorBoundary>
      <PostCard
        post={post}
        context={context}
        activeTagId={activeTagId}
        replyBar={replyBar}
        collapsible={collapsible}
        {...rest}
      />
    </ErrorBoundary>
  )
}
