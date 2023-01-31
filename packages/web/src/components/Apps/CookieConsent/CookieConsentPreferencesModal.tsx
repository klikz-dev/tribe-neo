import { FC, useEffect, useState } from 'react'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'
import { Toggle } from '@tribeplatform/react-ui-kit/Toggle'

import { CookiesBox } from './CookiesBox'
import {
  CookieKind,
  disableCookie,
  disableCookies,
  enableCookie,
  getCookieSettings,
} from './utils/cookie-settings'

type CookieConsentPreferencesModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const CookieConsentPreferencesModal: FC<
  CookieConsentPreferencesModalProps
> = ({ isOpen, onClose }) => {
  const {
    [CookieKind.ESSENTIAL]: essentialCookies,
    [CookieKind.ADVERTISING_AND_TRACKING]: adsAndTrackCookies,
    [CookieKind.ANALYTICS_AND_FUNCTIONAL]: analyticsAndFuncCookies,
  } = getCookieSettings() || {}
  const [isAnalyticsSelected, setIsAnalyticsSelected] = useState(
    analyticsAndFuncCookies?.enabled,
  )
  const [isAdvertisingSelected, setIsAdvertisingSelected] = useState(
    adsAndTrackCookies?.enabled,
  )

  useEffect(() => {
    setIsAnalyticsSelected(analyticsAndFuncCookies?.enabled)
    setIsAdvertisingSelected(adsAndTrackCookies?.enabled)
  }, [adsAndTrackCookies?.enabled, analyticsAndFuncCookies?.enabled])

  const onRequiredOnly = () => {
    disableCookies([
      CookieKind.ADVERTISING_AND_TRACKING,
      CookieKind.ANALYTICS_AND_FUNCTIONAL,
    ])
    onClose()
  }
  const onSubmit = () => {
    if (isAnalyticsSelected) enableCookie(CookieKind.ANALYTICS_AND_FUNCTIONAL)
    if (isAdvertisingSelected) enableCookie(CookieKind.ADVERTISING_AND_TRACKING)
    if (!isAnalyticsSelected) disableCookie(CookieKind.ANALYTICS_AND_FUNCTIONAL)
    if (!isAdvertisingSelected)
      disableCookie(CookieKind.ADVERTISING_AND_TRACKING)
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={onClose} size="xl">
      <Modal.Header
        title="About the cookies on this site"
        description="Some cookies are required to use our services. To continue using this website, review the available cookie controls and make any optional changes you'd like before selecting accept below."
      />
      <Modal.Content>
        <div className="flex flex-col space-y-6">
          <CookiesBox
            cookies={essentialCookies?.cookies}
            title="Essential website cookies"
            description="These cookies are strictly necessary to provide you with the services and features available through our site."
          >
            <div className="text-basicPrimary-900">Necessary</div>
          </CookiesBox>

          <CookiesBox
            cookies={analyticsAndFuncCookies?.cookies}
            title="Analytics and functional cookies"
            description="These cookies collect information to help us understand how the site is being used and to see how visitors move around the site. "
          >
            <Toggle
              data-testid="Cookie-analytics-switch"
              onChange={value => {
                setIsAnalyticsSelected(value)
              }}
              checked={isAnalyticsSelected}
            />
          </CookiesBox>

          <CookiesBox
            cookies={adsAndTrackCookies?.cookies}
            title="Advertising and tracking cookies"
            description="These cookies are used to make advertising messages more relevant to you and your interests. "
          >
            <Toggle
              data-testid="Cookie-advertising-switch"
              onChange={value => setIsAdvertisingSelected(value)}
              checked={isAdvertisingSelected}
            />
          </CookiesBox>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button variant="primary" onClick={onSubmit} fullWidth>
          Submit preferences
        </Button>
        <Button variant="outline" onClick={onRequiredOnly} fullWidth>
          Required cookies only
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
