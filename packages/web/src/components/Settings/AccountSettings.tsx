import { useMemo, useState } from 'react'

import {
  useApp,
  useAuthMember,
  useDeleteMember,
} from '@tribeplatform/react-sdk/hooks'
import { ActionPanel } from '@tribeplatform/react-ui-kit/ActionPanel'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { confirm } from '@tribeplatform/react-ui-kit/Dialog'

import { CookieConsentPreferencesModal } from '../Apps/CookieConsent'
import { DefaultApps } from '../Apps/DefaultApps'
import { ChangeEmail } from './ChangeEmail'
import { ConnectedAccounts } from './ConnectedAccounts'

export const AccountSettings = () => {
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false)

  const { data: member } = useAuthMember()
  const { mutate: deleteMember } = useDeleteMember()

  const { data: cookieConsentApp, isLoading: loading } = useApp({
    variables: {
      slug: DefaultApps.CookieConsentManager,
    },
  })
  const isCookieAppInstalled = useMemo(
    () => Boolean(!loading && cookieConsentApp?.installed),
    [cookieConsentApp, loading],
  )

  return (
    <div className="flex flex-col space-y-5">
      <ChangeEmail />
      <ConnectedAccounts member={member} />
      {isCookieAppInstalled && (
        <>
          <ActionPanel
            title="Cookies"
            description="Manage your cookie consent settings"
            placement="trailing-top"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsCookieModalOpen(true)}
            >
              Manage
            </Button>
          </ActionPanel>
          <CookieConsentPreferencesModal
            isOpen={isCookieModalOpen}
            onClose={() => setIsCookieModalOpen(false)}
          />
        </>
      )}

      {false && (
        <ActionPanel
          title="Delete account"
          description="Deactivate and remove your account from the community."
          placement="trailing-top"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={async () => {
              const confirmed = await confirm({
                title: 'Are you sure you want to delete your account?',
                description: 'This action is not reversible.',
                proceedLabel: 'Delete my account',
                danger: true,
              })
              if (confirmed) {
                await deleteMember({ id: member?.id })
                // document.location.href = '/'
              }
            }}
          >
            Delete my account
          </Button>
        </ActionPanel>
      )}
    </div>
  )
}
