import clsx from 'clsx'

export type ColorCircleProps = React.ComponentProps<'div'> & {
  color: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  clickable?: boolean
  circleRef?: any
}

export const ColorCircle = ({
  color,
  size = 'md',
  clickable = false,
  circleRef,
  ...rest
}: ColorCircleProps) => {
  return (
    <div
      ref={circleRef}
      className={clsx(
        'rounded-full border border-basicSurface-300',
        clickable && 'cursor-pointer',
        clickable && 'hover:border-basicSurface-500',
        size === 'sm' && 'h-5 w-5',
        size === 'md' && 'h-6 w-6',
        size === 'lg' && 'h-8 w-8',
        size === 'xl' && 'h-10 w-10',
      )}
      style={{
        background: color,
      }}
      {...rest}
    />
  )
}
