import { useState } from 'react'

import { useClipboard } from 'use-clipboard-copy'

import { Input } from '@tribeplatform/react-ui-kit/Input'
import { Link } from '@tribeplatform/react-ui-kit/Link'

export const ShareInviteMemberLink = ({ url }) => {
  const [copied, setCopied] = useState(false)
  const clipboard = useClipboard()

  return (
    <>
      <div className="text-basicSurface-900">Share invite link</div>
      <div className="text-sm mb-2 text-basicSurface-500">
        Anyone with this link can join as a member.
      </div>
      <Input
        onClick={e => e.currentTarget.select()}
        value={url}
        readOnly
        trailingAddon={
          <Link
            onClick={() => {
              clipboard.copy(url)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            variant="neutral"
          >
            {copied ? 'Copied' : 'Copy'}
          </Link>
        }
      />
    </>
  )
}
