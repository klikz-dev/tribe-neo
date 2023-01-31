import CloseIcon from 'remixicon-react/CloseLineIcon'

export interface ComposerMediaCloseProps {
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void
}
export const ComposerMediaClose = ({ onClick }: ComposerMediaCloseProps) => (
  <div
    onClick={onClick}
    className="flex absolute top-2 right-2 cursor-pointer w-8 h-8 items-center justify-center bg-surface-50 rounded-full"
  >
    <CloseIcon size="70%" className="opacity-70" />
  </div>
)
