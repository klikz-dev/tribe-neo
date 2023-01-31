import { useEffect, useState } from 'react'

import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { Types } from '@tribeplatform/gql-client/'
import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { useAuthMember } from '@tribeplatform/react-sdk/hooks'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { getIcon } from '../../lib/icons'
import { ComposerControls } from './ComposerModalContent'
import { PostModal } from './PostModal'

type ComposerProps = {
  space?: Types.Space
  buttons?: any[]
  inputText?: boolean
  infoText?: string
}

export const PostComposer = ({
  space,
  buttons,
  inputText = true,
  infoText,
}: ComposerProps) => {
  const [open, setOpen] = useState(false)

  const { data: member } = useAuthMember()

  useEffect(() => {
    ComposerControls.preload()
  }, [])

  if (space) {
    const [canCreatePost] = hasScopesPermission(space, ['createPost'])
    if (!canCreatePost) return null
  }

  const openModal = () => setOpen(true)

  return (
    <>
      <Card className="mb-5">
        {inputText ? (
          <Card.Content className="flex space-x-5">
            <Link
              to={`/member/${member?.id}`}
              className="flex-shrink-0 hover:opacity-90 h-10 w-10"
            >
              <Avatar
                size="md"
                src={
                  member?.profilePicture && 'urls' in member?.profilePicture
                    ? member?.profilePicture?.urls?.thumb
                    : undefined
                }
              />
            </Link>
            <Link
              to="#"
              onClick={openModal}
              className="bg-surface-100 hover:bg-surface-200 text-basicSurface-500 rounded-md p-2 px-3 h-10 flex-grow"
            >
              What&apos;s on your mind?
            </Link>
          </Card.Content>
        ) : null}
        {buttons?.length ? (
          <div
            className={clsx(
              'flex text-center space-x-2',
              inputText ? 'border-t p-2' : 'p-2',
            )}
          >
            {buttons?.map(({ text, icon, color }) => {
              const Icon = getIcon(icon, 'solid')
              return (
                <Link
                  key={text}
                  to="#"
                  onClick={openModal}
                  className="hover:bg-surface-200 font-medium rounded-lg flex-1 p-2 flex justify-center items-center space-x-2"
                >
                  <Icon className={`text-${color} w-6 h-6 flex-shrink-0`} />
                  <div>{text}</div>
                </Link>
              )
            })}
          </div>
        ) : null}
        {infoText ? (
          <div className="rounded-lg bg-surface-200 text-center px-5 p-2 mt-2">
            {infoText}
          </div>
        ) : null}
      </Card>
      {open && <PostModal space={space} onClose={() => setOpen(false)} />}
    </>
  )
}
