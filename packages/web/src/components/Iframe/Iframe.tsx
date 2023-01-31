import { useEffect, useState } from 'react'

import { Card } from '@tribeplatform/react-ui-kit/Card'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'

import { IframeSettings } from './settings/IframeSettings'

export const Iframe = ({ src, height, title, hidden = false }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!src?.startsWith('https://')) {
      setError('Please enter a valid url starting with https://')
    } else {
      setError('')
    }
  }, [src])

  if (hidden) return null

  let placeholder = null
  if (error) {
    placeholder = <div>{error}</div>
  } else if (loading) {
    placeholder = <SpinnerIcon className="animate-spin w-7 h-7" />
  }

  return (
    <Card className="mb-5 overflow-hidden">
      {title ? (
        <Card.Header>
          <h2>{title}</h2>
        </Card.Header>
      ) : null}
      <div className="relative">
        {placeholder ? (
          <div className="absolute left-0 right-0 bottom-0 top-0 bg-surface-50 flex justify-center items-center">
            {placeholder}
          </div>
        ) : null}
        <iframe
          onLoad={() => setLoading(false)}
          title="Block"
          src={src}
          className="border-none w-full"
          style={{ height: `${height}px` }}
        ></iframe>
      </div>
    </Card>
  )
}

Iframe.Settings = IframeSettings
Iframe.displayName = 'IFrame'
