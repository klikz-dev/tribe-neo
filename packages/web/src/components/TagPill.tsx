import { Link } from 'react-router-dom'

import { Badge } from '@tribeplatform/react-ui-kit/Badge'

import { isFunction } from './Composer/utils/react-utils'

type TagPillProps = {
  title: string
  active?: boolean
  className?: string
}

type TagPillWithLinkProps = TagPillProps & {
  link: string | (() => string)
  title: string
}

export const TagPill = ({ title, active, className }: TagPillProps) => (
  <Badge
    rounded
    size="lg"
    variant={active ? 'primary' : 'secondary'}
    className={className}
  >
    {title}
  </Badge>
)

export const TagPillWithLink = ({
  link,
  className,
  ...pillProps
}: TagPillWithLinkProps) => {
  let to = ''
  if (isFunction(link)) {
    to = link()
  } else {
    to = link
  }
  return (
    <Link to={to} className={className}>
      <TagPill {...pillProps} />
    </Link>
  )
}
