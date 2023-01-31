import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon'

export const EditorBackButton = ({ label, onClick }) => {
  return (
    <div
      className="flex flex-row items-center cursor-pointer text-gray-500 hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <p className="text-sm ml-1">{label}</p>
    </div>
  )
}
