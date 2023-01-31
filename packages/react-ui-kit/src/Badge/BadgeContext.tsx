import { createContext, useContext } from 'react'

export const BADGE_SIZES = ['md', 'lg'] as const
export type BadgeSize = typeof BADGE_SIZES[number]

export const BADGE_VARIANTS = ['primary', 'secondary'] as const
export type BadgeVariant = typeof BADGE_VARIANTS[number]

export interface BadgeContext {
  variant: BadgeVariant
  size: BadgeSize
}

const BadgeContext = createContext<BadgeContext>(undefined)

export const BadgeProvider = ({ variant, size, children }) => (
  <BadgeContext.Provider
    value={{
      variant,
      size,
    }}
  >
    {children}
  </BadgeContext.Provider>
)

export const useBadge = () => {
  const context = useContext(BadgeContext)
  if (context === undefined) {
    throw new Error('useBadge must be used within a BadgeProvider')
  }
  return context
}
