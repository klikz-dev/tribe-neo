import { Types } from '@tribeplatform/gql-client'

export const FEED_KEY = 'feed'

export const getFeedKey = (args?: Types.QueryFeedArgs) =>
  args ? [FEED_KEY, args] : [FEED_KEY]
