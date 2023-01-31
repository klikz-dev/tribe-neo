import {
  QueryModerationItemArgs,
  QueryModerationItemReportersArgs,
  QueryModerationItemsArgs,
} from '@tribeplatform/gql-client/types'

export const MODERATION_ITEM_KEY = 'moderationItem'
export const MODERATION_ITEMS_KEY = 'moderationItems'
export const MODERATION_ITEM_REPORTERS_KEY = 'moderationItemReporters'
export const MODERATION_SETTINGS_KEY = 'moderationSettings'

export const getModerationItemKey = (args?: QueryModerationItemArgs) =>
  args ? [MODERATION_ITEM_KEY, args] : [MODERATION_ITEM_KEY]

export const getModerationItemsKey = (args?: QueryModerationItemsArgs) =>
  args ? [MODERATION_ITEMS_KEY, args] : [MODERATION_ITEMS_KEY]

export const getModerationItemReportersKey = (
  args?: QueryModerationItemReportersArgs,
) =>
  args ? [MODERATION_ITEM_REPORTERS_KEY, args] : [MODERATION_ITEM_REPORTERS_KEY]

export const getModerationSettingsKey = () => [MODERATION_SETTINGS_KEY]
