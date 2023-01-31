import {
  CSSProperties,
  forwardRef,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from 'react'

import clsx from 'clsx'
import { useHistory } from 'react-router'
import { Prompt } from 'react-router-dom'

import {
  Image,
  Post,
  SearchEntityType,
  UploadImagesArgs,
} from '@tribeplatform/gql-client/types'
import {
  useSearch,
  useCreateImages,
  useEmbed,
} from '@tribeplatform/react-sdk/hooks'

import { ErrorBoundary } from '../Error/ErrorBoundry'
import { ComposerRefImperativeHandle, Mention, ReactQuillProps } from './@types'
import { ComposerReadonly as ReactComposerReadonly } from './ComposerReadonly'

const ComposerPromise = () => import('./Composer')

export const preload = () => {
  ComposerPromise()
}

const ReactComposer = lazy(ComposerPromise)

export const ComposerReadonly = ({
  post,
  content,
}: {
  post?: Post
  content: string
}) => {
  const history = useHistory()

  const mentions: Mention[] = useMemo(
    () =>
      post?.mentions?.map(m => ({
        icon:
          (m.profilePicture as Image)?.urls?.small ||
          (m.profilePicture as Image)?.url,
        id: m.id,
        title: m.name,
      })),
    [post?.mentions],
  )

  const onMentionClick = useCallback(
    m => {
      history.push(`/member/${m.id}`)
    },
    [history],
  )

  return (
    <ReactComposerReadonly
      mentions={mentions}
      embeds={post?.embeds}
      value={content}
      onMentionClick={onMentionClick}
    />
  )
}

const staticProps = {
  composer: {
    embeds: [],
    mentions: [],
    attachments: [],
  },
}

export const Composer = forwardRef<
  ComposerRefImperativeHandle,
  ReactQuillProps & { containerClassName?: string; style?: CSSProperties }
>(({ modules, containerClassName, style, ...props }, ref) => {
  const { asyncQuery: search } = useSearch({ fields: 'all' })
  const { mutateAsync: createImages } = useCreateImages()
  const { asyncQuery: embed } = useEmbed()

  const handleImageUpload = useCallback(
    async files => {
      const args: UploadImagesArgs[] = Array.from(files).map(file => ({ file }))

      const uploadedImage = await createImages(args)

      return uploadedImage.map(ui => ({
        ...ui,
        mediaId: ui.id,
        mediaUrl: ui.url,
      }))
    },
    [createImages],
  )

  const mention = useMemo(
    () => ({
      search: async (query: string) => {
        const result = await search({
          input: {
            query,
          },
        })

        const members = result?.hits.find(
          hit => hit.entityType === SearchEntityType.MEMBER,
        )

        return members?.hits?.map(m => ({
          id: m.entityId,
          title: m.title,
          icon: (m?.media as Image)?.url,
        }))
      },
    }),
    [search],
  )

  const isTouched = (
    (ref as any)?.current as ComposerRefImperativeHandle
  )?.isTouched?.()

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <article
          className={clsx(
            'relative flex flex-col flex-grow',
            containerClassName,
          )}
          style={style}
        >
          <ReactComposer
            {...staticProps.composer}
            forwardedRef={ref}
            modules={{
              mention,
              embed: {
                onEmbed: async url => {
                  const data = await embed({
                    url,
                  })
                  return data
                },
              },
              image: {
                handleImageUpload,
              },
              ...modules,
            }}
            {...props}
          />
          <Prompt
            when={isTouched}
            message={() => 'Changes you made may not be saved.'}
          />
        </article>
      </Suspense>
    </ErrorBoundary>
  )
})
