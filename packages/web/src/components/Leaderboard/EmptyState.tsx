import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'

export const EmptyState = () => {
  return (
    <div className="grid grid-cols-1 gap-1">
      {[...Array(3)].map((_e, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className="flex space-x-3 items-center p-2 opacity-50"
        >
          <Avatar className="h-10 w-10" />
          <div className="h-5 bg-surface-300 rounded-full flex flex-grow" />
        </div>
      ))}
      <p className="text-sm p-2">
        Members will appear here once they start engaging in the community.
      </p>
    </div>
  )
}
