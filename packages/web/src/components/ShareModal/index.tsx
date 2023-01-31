import { useState } from 'react'

import { useClipboard } from 'use-clipboard-copy'

import { Form } from '@tribeplatform/react-sdk/components'
import { Input } from '@tribeplatform/react-ui-kit/Input'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'

import { SocialShareButtons } from './SocialShareButtons'

export const ShareModal = ({ url, title, modalTitle, open, onClose }) => {
  const [copied, setCopied] = useState(false)
  const clipboard = useClipboard()
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header title={modalTitle || 'Share'} />
      <Modal.Content>
        <div className="flex flex-col space-y-5">
          {false && (
            <Form>
              <Form.Toggle
                disabled
                name="shareToWeb"
                label="Share to web"
                helperText="Publish and share link with anyone"
                checked
              />
            </Form>
          )}
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
          <SocialShareButtons url={url} title={title} />
        </div>
      </Modal.Content>
    </Modal>
  )
}
