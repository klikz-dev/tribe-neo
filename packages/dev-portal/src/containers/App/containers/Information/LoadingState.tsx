export const LoadingState = () => {
  return (
    <>
      <div className="bg-surface-50 px-4 py-6 shadow sm:p-6 sm:rounded-lg">
        <div className="animate-pulse flex space-x-4">
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
    </>
  )
}
