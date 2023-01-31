import { TagPill } from '../TagPill'

export const TagPills = ({ tags, activeTagId, className }) => {
  if (!tags?.length) return null
  return (
    <div className={`flex -ml-2 -mt-2 flex-wrap ${className}`}>
      {tags.map(({ id, title }) => (
        <TagPill
          active={activeTagId === id}
          key={id}
          title={title}
          className="ml-2 mt-2"
        />
      ))}
    </div>
  )
}
