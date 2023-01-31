import DownloadIcon from '@heroicons/react/outline/DownloadIcon'

import { XIcon } from '@tribeplatform/react-ui-kit/icons'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'

import { Attachment } from '../../@types'
import { downloadFile } from '../../utils/url.utils'
import { AttachmentName } from './AttachmentName'

export type AttachmentModalProps = {
  attachment: Attachment
  onClose: () => void
}

export const PREVIEW_SUPPORTED_EXTENSION = [
  'jpg',
  'jpeg',
  'png',
  'jiff',
  'gif',
  'pdf',
  'svg',
]

export const AttachmentModal = ({
  attachment,
  onClose,
}: AttachmentModalProps) => {
  const { name, url, downloadUrl } = attachment
  const extension = attachment?.extension?.toLowerCase()

  return (
    <Modal size="full" open onClose={onClose} className="flex-col flex">
      <div className="px-4 py-5 sm:px-6 flex items-center justify-between border-b border-neutral-200">
        <AttachmentName {...attachment} />
        <div className="flex">
          <button
            type="button"
            className="mr-3 bg-surface-50 rounded-md text-basicSurface-400 hover:text-basicSurface-500 focus:outline-none focus-visible:ring"
            onClick={() => downloadFile(downloadUrl, name)}
          >
            <DownloadIcon className="w-6 h-6" />
          </button>

          <button
            type="button"
            className="bg-surface-50 rounded-md text-basicSurface-400 hover:text-basicSurface-500 focus:outline-none focus-visible:ring"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Modal.Content>
        {PREVIEW_SUPPORTED_EXTENSION.includes(extension) ? (
          <>
            {extension === 'pdf' ? (
              <iframe
                className="w-full h-full rounded-b"
                title={name}
                src={url}
              />
            ) : (
              <div
                className="flex items-center justify-center"
                style={{
                  height: 'calc(100vh - 200px)',
                }}
              >
                <img
                  src={url}
                  className="object-contain max-h-full"
                  alt={name}
                  loading="lazy"
                />
              </div>
            )}
          </>
        ) : (
          <p className="center">Preview not supported</p>
        )}
      </Modal.Content>
    </Modal>
  )
}
