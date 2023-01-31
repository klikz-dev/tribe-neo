import { Keys } from '@tribeplatform/react-sdk/lib'

import { PageProps } from '../../@types'
import { getIdFromAddress } from '../../utils/post'

export const getPostData = async ({ context, path }: PageProps) => {
  try {
    const { client, queryClient } = context
    const id = getIdFromAddress((path?.params as any)?.address)
    const post = await client.posts.get(id, 'default')

    queryClient.setQueryData(Keys.getPostKey(id), post)
    // eslint-disable-next-line no-empty
  } catch (e) {}
}
