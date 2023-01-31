import { CheckIcon } from '@tribeplatform/react-ui-kit/icons'

export const AppHighlightItem = ({ children }) => (
  <div className="flex space-x-3">
    <div className="flex flex-col justify-center">
      <CheckIcon className="w-5 h-5 text-success-700" />
    </div>
    <div>{children}</div>
  </div>
)
