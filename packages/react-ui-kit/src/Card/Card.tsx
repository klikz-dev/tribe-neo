import { FC } from 'react'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { BackgroundProvider } from '../BackgroundContext'
import { CardPadding, CardProvider, useCard } from './CardContext'
import { CardActions, CardFooter } from './CardFooter'
import { CardHeader } from './CardHeader'

export type CardProps = React.ComponentProps<'div'> & {
  padding?: CardPadding
  attached?: 'top' | 'bottom' | 'none'
}
/**
 * A “card” is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card.
 */
export const Card = ({
  children,
  className,
  padding = 'md',
  attached = 'none',
  ...rest
}: CardProps) => {
  let attachedClsx = ''
  if (attached === 'top') attachedClsx = 'sm:rounded-b-lg'
  else if (attached === 'bottom') attachedClsx = 'sm:rounded-t-lg'
  else attachedClsx = 'sm:rounded-lg'

  return (
    <div
      className={twMerge(
        clsx(
          'bg-surface-50 text-basicSurface-500 shadow flex flex-col justify-between isolate',
          attachedClsx,
          className,
        ),
      )}
      {...rest}
    >
      <CardProvider padding={padding}>
        <BackgroundProvider backgroundType="surface">
          {children}
        </BackgroundProvider>
      </CardProvider>
    </div>
  )
}

export type CardContentProps = React.ComponentProps<'div'>

const CardContent: FC<CardContentProps> = ({
  children,
  className,
  ...rest
}) => {
  const { padding } = useCard()

  return (
    <div
      className={twMerge(
        clsx(
          'flex-1',
          padding === 'md' && 'px-4 py-5 sm:p-6',
          padding === 'sm' && 'px-4 py-5 sm:px-3',
          className,
        ),
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export type CardMediaProps = React.ComponentProps<'div'>

const CardMedia: FC<CardMediaProps> = ({ children, className, ...rest }) => (
  <div className={className} {...rest}>
    {children}
  </div>
)

Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter
Card.Media = CardMedia
Card.Actions = CardActions
