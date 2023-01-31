import { useEffect, useState } from 'react'

import CollectionIcon from '@heroicons/react/outline/CollectionIcon'
import ViewListIcon from '@heroicons/react/outline/ViewListIcon'
import InfiniteScroll from 'react-infinite-scroller'
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from 'react-query/types/core'

import { Post as PostType } from '@tribeplatform/gql-client/types'
import { Button, ButtonGroup } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { Post } from '../Post'
import { PostContext } from '../Post/PostCard'

export const PostCardListLoading = ({ count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="bg-surface-50 px-4 py-6 shadow sm:p-6 sm:rounded-lg"
        >
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-surface-300 h-12 w-12" />
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-surface-300 rounded-full w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-surface-300 rounded-full" />
                <div className="h-4 bg-surface-300 rounded-full w-5/6" />
                <div className="h-4 bg-surface-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export const PostRowListLoading = ({ count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="bg-surface-50 px-4 py-6 sm:p-6">
          <div className="animate-pulse flex space-x-4 items-center">
            <div className="rounded-full bg-surface-300 h-8 w-8" />
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-surface-300 rounded-full w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export type GenericPostListPorps = {
  posts: PostType[]
  pinnedPosts?: PostType[]
  context: PostContext
  activeTagId?: string
  fetchNextPage:
    | false
    | ((options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult>)
  hasNextPage: boolean
  isLoading: boolean
  isFetched: boolean
  isFetchingNextPage: boolean
  view?: 'card' | 'row'
}
export const GenericPostList = ({
  posts,
  context,
  pinnedPosts = [],
  activeTagId = '',
  fetchNextPage,
  hasNextPage,
  isLoading,
  isFetched,
  isFetchingNextPage,
  view = 'card',
}: GenericPostListPorps) => {
  const [activeView, setActiveView] = useState(view)

  useEffect(() => {
    setActiveView(view)
  }, [view])

  const content = (
    <>
      {pinnedPosts.map(post => {
        return (
          <Post
            key={post.id}
            post={post}
            context={context}
            activeTagId={activeTagId}
            view={activeView}
          />
        )
      })}
      {posts.map(post => {
        return (
          <Post
            key={post.id}
            post={post}
            context={context}
            activeTagId={activeTagId}
            view={activeView}
          />
        )
      })}
    </>
  )

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchNextPage}
      hasMore={hasNextPage && !isLoading}
      threshold={800}
    >
      {false && (
        <Card className="mb-3 p-3">
          <div className="flex">
            <div className="flex-grow" />
            <ButtonGroup>
              <Button
                className={activeView === 'card' ? 'bg-surface-100' : ''}
                onClick={() => setActiveView('card')}
              >
                <CollectionIcon className="w-4 h-4" />
              </Button>
              <Button
                className={activeView === 'row' ? 'bg-surface-100' : ''}
                onClick={() => setActiveView('row')}
              >
                <ViewListIcon className="w-4 h-4" />
              </Button>
            </ButtonGroup>
          </div>
        </Card>
      )}
      {activeView === 'row' ? (
        <Card className="flex flex-col divide-y divide-neutral-200">
          {content}
          {!isFetched || isLoading || isFetchingNextPage ? (
            <PostRowListLoading />
          ) : null}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {content}
          {!isFetched || isLoading || isFetchingNextPage ? (
            <PostCardListLoading />
          ) : null}
        </div>
      )}
    </InfiniteScroll>
  )
}
