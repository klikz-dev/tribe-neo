import { Member, Image, Emoji } from '@tribeplatform/gql-client/types'

import { Mention } from '../components/Composer/@types'

export const memberToMentionConverter = ({
  id,
  name,
  displayName,
  profilePicture,
}: Member): Mention => ({
  id,
  title: displayName || name,
  icon: (profilePicture as Image)?.url || (profilePicture as Emoji)?.text,
})
