import { useContext, useEffect, useState } from 'react'

import { Container } from '@tribeplatform/react-ui-kit/Layout'
import { Portal } from '@tribeplatform/react-ui-kit/Portal'

import { CookieConsentPopUp } from './CookieConsentPopUp'
import { CookieConsentPreferencesModal } from './CookieConsentPreferencesModal'
import { CookieContext } from './CookieContext'
import { getCookieSettings } from './utils/cookie-settings'

export const CookieConsent = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(true)
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false)

  const { shouldShowCookiePopup } = useContext(CookieContext)

  useEffect(() => {
    if (
      !isPopUpOpen &&
      !isPreferencesModalOpen &&
      !getCookieSettings()?.hasUserConsent
    ) {
      setIsPopUpOpen(true)
    }
  }, [isPopUpOpen, isPreferencesModalOpen])

  const onManagePreferences = () => {
    setIsPreferencesModalOpen(true)
    setIsPopUpOpen(false)
  }

  if (!shouldShowCookiePopup) {
    return null
  }

  return (
    <>
      {isPopUpOpen && (
        <Portal>
          <div className="fixed inset-x-0 bottom-0 p-4">
            <Container size="md">
              <CookieConsentPopUp
                onManage={onManagePreferences}
                onClose={() => setIsPopUpOpen(false)}
              />
            </Container>
          </div>
        </Portal>
      )}
      <CookieConsentPreferencesModal
        isOpen={isPreferencesModalOpen}
        onClose={() => setIsPreferencesModalOpen(false)}
      />
    </>
  )
}
