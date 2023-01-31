import { ComposerMediaClose } from './MediaClose'

interface ComposerLoadingProps {
  handleClose: (e: React.MouseEvent<HTMLInputElement>) => void
}

export const ComposerLoading = ({ handleClose }: ComposerLoadingProps) => {
  return (
    <div className="relative flex justify-center items-center bg-surface-200 h-80 w-full my-3">
      <ComposerMediaClose onClick={handleClose} />

      <div
        style={{ borderTopColor: 'transparent' }}
        className="w-10 h-10 border-4 border-black opacity-40 border-solid rounded-full animate-spin"
      />
    </div>
  )
}
