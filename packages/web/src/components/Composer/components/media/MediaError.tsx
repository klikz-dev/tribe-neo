import { ComposerMediaClose } from './MediaClose'

interface ComposerMediaErrorProps {
  handleClose: (e: React.MouseEvent<HTMLInputElement>) => void
}

export const ComposerMediaError = ({
  handleClose,
}: ComposerMediaErrorProps) => {
  return (
    <div>
      <ComposerMediaClose onClick={handleClose} />
    </div>
  )
}
