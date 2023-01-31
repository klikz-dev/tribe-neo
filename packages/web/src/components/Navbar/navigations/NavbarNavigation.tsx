import { generatePath, Link as RouterLink } from 'react-router-dom'
import validator from 'validator'

import { Space } from '@tribeplatform/gql-client/types'
import { useSpacesByIds } from '@tribeplatform/react-sdk/hooks'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { useSlateKit } from '@tribeplatform/slate-kit/hooks'

import { defaultPages } from '../../../page-builder/default-pages'
import { mergePages } from '../../../page-builder/utils'
import { NavbarNavigationAction, NavbarNavigationItem } from '../constants'

export type NavbarNavigationProps = {
  navigationItems: NavbarNavigationItem[]
}

export const NavbarNavigation = ({
  navigationItems,
}: NavbarNavigationProps) => {
  const { context } = useSlateKit()
  const { pages: customPages } = context.network
  const pages = mergePages(defaultPages, customPages)
  const spacesIds = navigationItems
    .filter(
      item => item.action === NavbarNavigationAction.OPEN_SPACE && item.space,
    )
    .map(item => item.space)
  const { data: spaces = [] } = useSpacesByIds({
    variables: { ids: spacesIds },
  })
  const spacePage = pages.find(page => page.slug === 'space')

  const getLink = (
    label: string,
    link: string,
    external: boolean,
    newWindow: boolean,
  ) => {
    if (!link || !label) return null

    let cleanLink = link
    if (!cleanLink.startsWith('http') && !cleanLink.startsWith('/')) {
      cleanLink = `/${link}`
    }
    return (
      <Link
        as={external ? undefined : RouterLink}
        key={label}
        href={cleanLink}
        to={cleanLink}
        target={newWindow ? '_blank' : undefined}
        variant="neutral"
        className="truncate"
      >
        {label}
      </Link>
    )
  }

  const navigation = navigationItems
    .map(item => {
      const external =
        item.link &&
        validator.isURL(item.link, { require_valid_protocol: false })
      let cleanLink: string
      let space: Space
      switch (item.action) {
        case NavbarNavigationAction.OPEN_LINK:
          cleanLink = item.link
          if (external && !cleanLink.startsWith('http')) {
            cleanLink = `https://${item.link}`
          }
          return getLink(item.label, cleanLink, external, item.openInNewWindow)
        case NavbarNavigationAction.OPEN_PAGE:
          cleanLink = pages.find(page => page.slug === item.page)?.address?.path
          return getLink(item.label, cleanLink, false, item.openInNewWindow)
        case NavbarNavigationAction.OPEN_SPACE:
          space = spaces.find(space => space.id === item.space)
          if (!space || !spacePage) return null
          cleanLink = generatePath(spacePage?.address?.path, {
            slug: space.slug,
          })
          return getLink(item.label, cleanLink, false, item.openInNewWindow)
        default:
          return null
      }
    })
    .filter(item => item)

  return <>{navigation}</> || null
}
