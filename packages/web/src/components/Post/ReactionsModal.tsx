import { useState } from 'react'

import clsx from 'clsx'
import { Emoji } from 'emoji-mart-virtualized'
import InfiniteScroll from 'react-infinite-scroller'

import {
  PostReactionDetail,
  PostReactionParticipant,
} from '@tribeplatform/gql-client/types'
import { usePostReactionParticipants } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { XIcon } from '@tribeplatform/react-ui-kit/icons'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'
import { Tabs } from '@tribeplatform/react-ui-kit/Tabs'

import { ReactionMember, ReactionMemberLoading } from './ReactionMember'

export const ReactionsModal = ({
  open,
  onClose,
  reactions,
  postId,
}: {
  open: boolean
  onClose: () => void
  reactions: PostReactionDetail[]
  postId: string
}) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [activeReaction, setActiveReaction] = useState<string>(
    reactions?.length ? reactions[0]?.reaction : '',
  )

  const {
    data,
    fetchNextPage = false,
    hasNextPage,
    isLoading,
  } = usePostReactionParticipants({
    variables: {
      limit: 5,
      postId,
      reaction: activeReaction,
    },
    fields: 'all',
  })

  const { nodes: participants } =
    simplifyPaginatedResult<PostReactionParticipant>(data)

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Content padding={false}>
        <div className="flex border-b-2 border-neutral-200 rounded-t-lg">
          <div className="flex-grow overflow-y-auto no-scrollbar ml-3">
            <Tabs.Group
              onChange={index => {
                setActiveTab(index)
                setActiveReaction(reactions[index]?.reaction)
              }}
              defaultIndex={activeTab}
            >
              <Tabs.List
                size="sm"
                variant="bar"
                rounded="none"
                shadow={false}
                divide={false}
              >
                {reactions?.map(r => (
                  <Tabs.Tab key={r?.reaction} name={r?.reaction}>
                    <div className="flex">
                      <div className={clsx('rounded-full w-9 bg-surface-200')}>
                        <Emoji native emoji={r.reaction} size={18} />
                      </div>
                      <span className="px-2">{r.count}</span>
                    </div>
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.Group>
          </div>
          <div className="flex cursor-pointer mx-3" onClick={onClose}>
            <XIcon className="h-6 w-6 m-auto" aria-hidden="true" />
          </div>
        </div>

        <ul className="overflow-y-auto bg-surface-50 h-120 rounded-b-lg">
          <InfiniteScroll
            pageStart={0}
            loadMore={fetchNextPage}
            hasMore={hasNextPage || isLoading}
            threshold={800}
            useWindow={false}
            loader={<ReactionMemberLoading />}
          >
            {participants?.map(p => (
              <li
                key={p.participant.id}
                className={clsx('flex hover:bg-surface-100')}
              >
                <ReactionMember member={p.participant} />
              </li>
            ))}
          </InfiniteScroll>
        </ul>
      </Modal.Content>
    </Modal>
  )
}
