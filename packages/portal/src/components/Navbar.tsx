import { Link as RouterLink } from 'wouter'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import { useGlobalToken } from '../hooks'
import { TribeLogo } from '../icons/svg'
import { AuthOptions } from './AuthOptions'

export const Navbar = () => {
  const { isLoggedIn } = useGlobalToken()

  return (
    <div className="bg-actionSecondary-50 text-basicSecondary-500 shadow-sm lg:static lg:overflow-y-visible">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Link href="/" as={RouterLink} data-testid="navbar-logo">
                <TribeLogo />
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8"></div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-6 items-center">
              {isLoggedIn ? (
                <AuthOptions />
              ) : (
                <Button
                  variant="outline"
                  href="https://app.tribe.so/create"
                  as="a"
                  target="_blank"
                >
                  Create your tribe
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
