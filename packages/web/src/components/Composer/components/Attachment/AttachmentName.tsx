import filesize from 'filesize'

import { Attachment } from '../../@types'

export const AttachmentName = ({ name, size }: Attachment) => (
  <div className="overflow-hidden max-w-lg">
    <p className="truncate">{name}</p>
    <p className="text-basicSurface-500">{filesize(size)}</p>
  </div>
)
