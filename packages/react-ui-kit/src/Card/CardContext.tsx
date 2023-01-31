import { createContext, useContext } from 'react'

export const CARD_PADDINGS = ['sm', 'md'] as const
export type CardPadding = typeof CARD_PADDINGS[number]

export interface CardContext {
  padding: CardPadding
}

const CardContext = createContext<CardContext>(undefined)

export const CardProvider = ({ padding, children }) => (
  <CardContext.Provider
    value={{
      padding,
    }}
  >
    {children}
  </CardContext.Provider>
)

export const useCard = () => {
  const context = useContext(CardContext)
  if (context === undefined) {
    throw new Error('useCard must be used within a CardProvider')
  }
  return context
}
