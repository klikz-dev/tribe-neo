import { Page } from '@tribeplatform/gql-client/types'

import accept from './auth/accept.json'
import forgotPassword from './auth/forgot-password.json'
import join from './auth/join/[id].json'
import login from './auth/login.json'
import resetPassword from './auth/reset-password.json'
import signup from './auth/signup.json'
import verify from './auth/verify.json'
import collections from './collections.json'
import collection from './entity-pages/collection.json'
import member from './entity-pages/member.json'
import post from './entity-pages/post.json'
import space from './entity-pages/space.json'
import explore from './explore.json'
import home from './home.json'
import members from './members.json'
import notFound from './not-found.json'
import notifications from './notifications.json'
import search from './search.json'
import settings from './settings.json'
import spaces from './spaces.json'

export const defaultPages: Page[] = [
  accept,
  login,
  signup,
  join,
  verify,
  forgotPassword,
  resetPassword,
  explore,
  collections,
  settings,
  spaces,
  members,
  notifications,
  search,
  notFound,
  member,
  collection,
  post,
  space,
  home,
] as Page[]
