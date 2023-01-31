export const LoadingState = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-1 gap-1">
      {[...Array(count)].map((_e, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className="flex space-x-3 items-center p-2 animate-pulse"
        >
          <div className="rounded-full bg-surface-300 h-10 w-10" />
          <div className="h-5 bg-surface-300 rounded-full flex flex-grow" />
        </div>
      ))}
    </div>
  )
}
