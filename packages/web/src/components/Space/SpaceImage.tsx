import clsx from 'clsx'
import { Emoji } from 'emoji-mart-virtualized'

export const SpaceImage = ({ space, size = 'md' }) => {
  const sizeClsx = [
    size === 'xs' && 'h-6 w-6',
    size === 'sm' && 'h-6 w-6',
    size === 'md' && 'h-24 w-24',
    size === 'lg' && 'h-24 w-24',
  ]

  const emojiSize = {
    xs: 16,
    sm: 20,
    md: 64,
    lg: 96,
  }

  return space?.image?.url ? (
    <div className={clsx('flex items-center justify-center', sizeClsx)}>
      <img
        alt={space.name}
        className={clsx(
          'text-basicSurface-400 group-hover:text-basicSurface-500 object-scale-down',
          'flex-shrink-0 rounded-md',
          sizeClsx,
          size === 'lg' ? 'bg-surface-50 rounded-md p-1' : '',
        )}
        aria-hidden="true"
        src={
          size === 'lg' || size === 'md'
            ? space?.image?.urls?.small
            : space?.image?.urls?.thumb
        }
      />
    </div>
  ) : (
    <div
      className={clsx(
        'text-basicSurface-400 group-hover:text-basicSurface-500',
        'flex items-center justify-center',
        sizeClsx,
      )}
    >
      <Emoji native emoji={`:${space?.image?.text}:`} size={emojiSize[size]} />
    </div>
  )
}
