import { PostRepliesArgs } from '../../types'
import { PostFields } from './posts.fields'

export type RepliesFields = {
  fields: PostFields
  variables: PostRepliesArgs
}
