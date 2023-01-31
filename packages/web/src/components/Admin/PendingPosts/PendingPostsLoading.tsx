export const PendingPostsLoading = ({ count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="bg-surface-50 px-4 py-6 shadow sm:p-6 sm:rounded-lg"
        >
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-surface-300 h-12 w-12" />
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-surface-300 rounded-full w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-surface-300 rounded-full" />
                <div className="h-4 bg-surface-300 rounded-full w-5/6" />
                <div className="h-4 bg-surface-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
