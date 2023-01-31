import { getAcceptPageData } from './accept'
import { getJoinPageData } from './join'
import { getPostData } from './post'

export const getPagesServerData = {
  accept: getAcceptPageData,
  'join-with-invite': getJoinPageData,
  post: getPostData,
}
