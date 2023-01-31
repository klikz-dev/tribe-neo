import { Link } from 'react-router-dom'

import { Image } from '@tribeplatform/gql-client/types'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'

import { getPagePermissions } from '../../../utils/page.permissions'
import { defaultNavbarControlItems, NavbarControlAction } from '../constants'
import { getNavbarControlPresentation } from '../utils'
import { NavbarControlCreateItem } from './NavbarControlCreateItem'
import { NavbarControlNotification } from './NavbarControlNotification'
import { NavbarControlProfile } from './NavbarControlProfile'

export const NavbarControl = ({ controlItems = defaultNavbarControlItems }) => {
  const { data: authToken } = useAuthToken()
  const { role, network, member } = authToken || {}
  const pagePermissions = getPagePermissions({ network, roleType: role?.type })

  const avatarUrl = (member?.profilePicture as Image)?.urls?.thumb
  const avatarName = member?.name

  const getPresentation = ({ item, props = {} }) =>
    getNavbarControlPresentation({
      item,
      avatarUrl,
      avatarName,
      props,
    })

  return (
    <div className="flex items-center space-x-4 flex-shrink-0">
      {controlItems
        .map(item => {
          switch (item.action) {
            case NavbarControlAction.CREATE_ITEM:
              return (
                <NavbarControlCreateItem
                  key={item.label}
                  item={item}
                  presentation={getPresentation({
                    item,
                    props: {
                      variant: 'primary',
                      rounded: true,
                      className: 'w-10 h-10 px-0 justify-center',
                      as: 'div',
                    },
                  })}
                />
              )
            case NavbarControlAction.SIGNUP:
              if (!pagePermissions.signup) return null
              return getPresentation({
                item,
                props: { variant: 'primary', as: Link, to: '/auth/signup' },
              })
            case NavbarControlAction.LOGIN:
              if (!pagePermissions.login) return null
              return getPresentation({
                item,
                props: {
                  variant: 'outline',
                  as: Link,
                  className: pagePermissions.signup ? 'hidden sm:flex' : '',
                  to: '/auth/login',
                },
              })
            case NavbarControlAction.SHOW_NOTIFICATION:
              if (!pagePermissions.notifications) return null
              return (
                <NavbarControlNotification
                  key={item.label}
                  item={item}
                  presentation={getPresentation({
                    item,
                    props: {
                      variant: 'outline',
                      rounded: true,
                      className: 'w-10 h-10 px-0 justify-center',
                      as: 'div',
                    },
                  })}
                />
              )
            case NavbarControlAction.SHOW_PROFILE:
              if (!pagePermissions.profile) return null
              return (
                <NavbarControlProfile
                  key={item.label}
                  item={item}
                  presentation={getPresentation({ item })}
                />
              )
            default:
              return null
          }
        })
        .filter(item => item)}
    </div>
  )
}
