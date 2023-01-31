import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Image, Post, PostStatus } from '@tribeplatform/gql-client/types'
import {
  useAddReply,
  useAuthMember,
  usePost,
} from '@tribeplatform/react-sdk/hooks'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { useLogin } from '../../hooks/useLogin'
import { getMappingFields } from '../../utils/post'
import { useAttachments } from '../Composer/hooks/useAttachments'
import { useQuitQuill } from '../Composer/hooks/useQuitQuill'
import { ReplyEditor } from '../ReplyList/ReplyEditor'

export type ReplyBarRef = {
  scrollIntoView: () => void
  expand: (toggle: boolean) => void
}

type ReplyBarProps = {
  post: Post
  defaultExpand?: boolean
}

export const ReplyBar = forwardRef<ReplyBarRef, ReplyBarProps>(
  ({ post, defaultExpand = false }, ref) => {
    const { canQuit } = useQuitQuill()
    const {
      attachments,
      resetAttachments,
      handleAttachmentSelect,
      handleAttachmentDelete,
    } = useAttachments([])

    const containerRef = useRef<HTMLDivElement>()
    const [expanded, setExpanded] = useState(defaultExpand)
    const editorRef = useRef<any>(null)
    const { data: member } = useAuthMember()
    const { mutate: addReply, isLoading } = useAddReply()
    const { isLoggedIn, showLogin } = useLogin()

    const picture = member?.profilePicture as Image

    const { data: fullPost } = usePost({
      id: post.id,
      useQueryOptions: {
        enabled: expanded,
      },
    })

    const availableReplyTypes =
      fullPost?.authMemberProps?.availableReplyTypes ||
      post?.authMemberProps?.availableReplyTypes

    useImperativeHandle(ref, () => ({
      scrollIntoView: () => {
        containerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        })
        editorRef.current?.focus()
      },
      expand: setExpanded,
    }))

    const quit = useCallback(() => {
      setExpanded(false)
      resetAttachments()
    }, [resetAttachments])

    const cancel = useCallback(
      quillRef => {
        if (canQuit(quillRef, attachments.length)) {
          quit()
        }
      },
      [attachments.length, canQuit, quit],
    )

    const onReply = useCallback(
      (content = '', quillRef) => {
        const isEmpty = quillRef?.current?.isEmpty()
        if (isLoading || isEmpty || content === '') {
          return
        }

        const postType = availableReplyTypes?.[0]
        if (!postType?.id) {
          return
        }
        const mappingFields = getMappingFields({
          content,
          postTypeName: postType.name,
        })

        const attachmentIds = attachments.map(({ id }) => id)

        addReply(
          {
            postId: post.id,
            input: {
              postTypeId: postType.id,
              mappingFields,
              attachmentIds,
              publish: true,
            },
          },
          {
            onSuccess: data => {
              if (data.status === PostStatus.BLOCKED) {
                toast({
                  title: 'Pending Review',
                  description:
                    'Your reply will be visible to others once it’s been reviewed by a moderator.',
                  status: 'info',
                })
              }

              quit()
            },
            onError: error => {
              const message = error?.response?.errors
                ?.map(e => e.message)
                ?.join('\n')
              toast({
                title: 'Reply failed',
                description:
                  message || 'Something went wrong, please try again.',
                status: 'error',
              })
            },
          },
        )
      },
      [isLoading, availableReplyTypes, attachments, addReply, post.id, quit],
    )

    const repliedToCount = post.repliedToIds?.length

    // If it is not a reply to a reply, show the avatar below
    const withAvatar = !repliedToCount || repliedToCount > 1

    const containerClasses = clsx(['flex space-x-4 bg-surface-50'])

    if (fullPost) {
      const [canCreateReply] = hasScopesPermission(post, ['createReply'])
      if ((isLoggedIn && !canCreateReply) || !availableReplyTypes?.length)
        return null
    }

    if (expanded) {
      return (
        <div className={containerClasses} ref={containerRef}>
          {withAvatar && (
            <div>
              <Link
                to={`/member/${member?.id}`}
                className="flex w-12 flex-shrink-0"
              >
                <Avatar
                  name={member?.name}
                  size="lg"
                  src={picture?.urls?.thumb || picture?.url}
                />
              </Link>
            </div>
          )}
          <div className="flex flex-col bg-surface-50 flex-grow max-w-full">
            <div
              className={clsx({
                'text-basicSurface-400': isLoading,
              })}
            >
              <ReplyEditor
                attachments={attachments}
                onAttachmentDelete={handleAttachmentDelete}
                onAttachmentSelect={handleAttachmentSelect}
                onReply={onReply}
                ref={editorRef}
                onCancel={cancel}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={containerClasses}>
        {withAvatar && (
          <Link
            to={`/member/${member?.id}`}
            className="flex flex-shrink-0 w-12 h-12 hover:opacity-90"
          >
            <Avatar
              name={member?.name}
              size="lg"
              src={picture?.urls?.thumb || picture?.url}
            />
          </Link>
        )}
        <Link
          to="#"
          onClick={e => {
            if (!isLoggedIn) {
              e.preventDefault()
              return showLogin()
            }
            setExpanded(true)
            setTimeout(() => {
              editorRef?.current?.focus()
            }, 300)
          }}
          className="cursor-pointer flex-grow rounded-md px-2.5 mt-1 h-10 flex items-center bg-surface-100 hover:bg-surface-200 text-basicSurface-500 hover:text-basicSurface-600"
        >
          What are your thoughts?
        </Link>
      </div>
    )
  },
)
