export const Logo = ({ src, alt }) => {
  return (
    <div style={{ maxWidth: '300px' }} className="max-h-8 block">
      <img
        className="object-contain h-8 max-h-full max-w-full"
        src={src || '/images/default-logo.png'}
        alt={alt}
      />
    </div>
  )
}
