import { FC } from 'react'

import { ActionPanel } from '@tribeplatform/react-ui-kit/ActionPanel'
import { Button } from '@tribeplatform/react-ui-kit/Button'

import { CookieKind, enableCookies } from './utils/cookie-settings'

type CookieConsentPopUpProps = {
  onManage: () => void
  onClose: () => void
}

export const CookieConsentPopUp: FC<CookieConsentPopUpProps> = ({
  onManage,
  onClose,
}) => {
  const onAcceptAll = () => {
    enableCookies([
      CookieKind.ADVERTISING_AND_TRACKING,
      CookieKind.ANALYTICS_AND_FUNCTIONAL,
    ])
    onClose()
  }
  return (
    <ActionPanel
      description="This website uses cookies to help personalise and improve content
            and services. You can review and update your cookie settings at any
            time."
      placement="trailing"
    >
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onManage}>
          Manage preferences
        </Button>
        <Button variant="primary" onClick={onAcceptAll}>
          I’m fine with cookies
        </Button>
      </div>
    </ActionPanel>
  )
}
