import { FC } from 'react'

import { Cookie } from './utils/cookie-settings'

type CookiesBoxProps = {
  title: string
  description: string
  cookies?: Cookie[]
}

export const CookiesBox: FC<CookiesBoxProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cookies,
  title,
  description,
  children,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <h4 className="text-basicSurface-900">{title}</h4>
        {children}
      </div>
      <div className="bg-surface-100 text-basicSurface-400 p-4">
        {description}
      </div>
    </div>
  )
}
