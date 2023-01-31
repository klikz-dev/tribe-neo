import { useState } from 'react'

import DownloadIcon from '@heroicons/react/outline/DownloadIcon'
import EyeIcon from '@heroicons/react/outline/EyeIcon'
import XIcon from '@heroicons/react/outline/XIcon'
import clsx from 'clsx'

import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'

import { Attachment, AttachmentsProps } from '../../@types'
import { icons } from '../icons'
import { AttachmentModal, PREVIEW_SUPPORTED_EXTENSION } from './AttachmentModal'
import { AttachmentName } from './AttachmentName'

const staticProps = {
  spinnerStyles: { borderTopColor: 'transparent' },
}

const extensionIconMap = {
  jpeg: 'jpg',
  jfif: 'jpg',
  pptx: 'ppt',
}

const getExtensionIconName = (extension: Attachment['extension']) => {
  // For unknown file extensions apply "unknown" icon
  if (!extension) return 'unknown'

  // If we have a map for this file extension, show the mapped icon
  if (extensionIconMap[extension]) return extensionIconMap[extension]

  // Otherwise use the extension name as it is
  return extension
}

export const Attachments = ({
  attachments,
  onAttachmentDelete,
  isReadOnly,
}: AttachmentsProps) => {
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(
    null,
  )

  return (
    <>
      <div>
        {attachments.map(attachment => {
          const { id, name, downloadUrl, isLoading } = attachment
          const extension = attachment?.extension?.toLowerCase()

          const canBePreviewed = PREVIEW_SUPPORTED_EXTENSION.includes(extension)

          const IconComponent =
            icons[getExtensionIconName(extension)] || icons.unknown

          return (
            <div
              key={id}
              className={clsx(
                'flex items-center justify-between space-x-3 bg-surface-50 px-6 py-4 rounded-md border border-neutral-300 mt-4 ignore-typography cursor-default',
                canBePreviewed && 'cursor-pointer',
              )}
              onClick={() => setPreviewAttachment(attachment)}
            >
              <div className="flex items-center space-x-3">
                <IconComponent
                  className="flex-shrink-0"
                  width={36}
                  height={36}
                />
                <AttachmentName {...attachment} />
              </div>
              <div className="flex items-center space-x-3">
                {isReadOnly ? (
                  <>
                    {canBePreviewed && (
                      <Tooltip>
                        <Tooltip.Trigger>
                          <EyeIcon
                            onClick={() => setPreviewAttachment(attachment)}
                            className="cursor-pointer x-6 h-6 text-basicSurface-300 hover:text-basicSurface-500"
                          />
                        </Tooltip.Trigger>
                        <Tooltip.Panel>Preview</Tooltip.Panel>
                      </Tooltip>
                    )}
                    <Tooltip>
                      <Tooltip.Trigger>
                        <a
                          href={downloadUrl}
                          download={name}
                          onClick={e => {
                            e.stopPropagation()
                          }}
                        >
                          <DownloadIcon className="cursor-pointer x-6 h-6 text-basicSurface-300 hover:text-basicSurface-500" />
                        </a>
                      </Tooltip.Trigger>
                      <Tooltip.Panel>Download</Tooltip.Panel>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    {isLoading && (
                      <div
                        style={staticProps.spinnerStyles}
                        className="w-5 h-5 border border-actionPrimary-800 rounded-full animate-spin"
                      />
                    )}
                    <Tooltip>
                      <Tooltip.Trigger>
                        <XIcon
                          onClick={e => {
                            e.stopPropagation()
                            onAttachmentDelete?.(attachment)
                          }}
                          className=" text-basicSurface-300 hover:text-basicSurface-500 cursor-pointer x-6 h-6"
                        />
                      </Tooltip.Trigger>
                      <Tooltip.Panel>Delete</Tooltip.Panel>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {previewAttachment && (
        <AttachmentModal
          attachment={previewAttachment}
          onClose={() => setPreviewAttachment(null)}
        />
      )}
    </>
  )
}
