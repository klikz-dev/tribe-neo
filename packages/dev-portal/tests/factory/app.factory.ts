import faker from 'faker'
import merge from 'lodash.merge'

import {
  App,
  PermissionContext,
  PlanName,
  PrimaryScopes,
  StoreItemStanding,
  StoreItemStatus,
} from '@tribeplatform/gql-client/types'

import { image } from './image.factory'
import { network } from './network.factory'

export const app = (customData: Partial<App> = {}): App => {
  const name =
    customData?.name ||
    `${faker.commerce.productAdjective()} ${faker.commerce.department()}`

  const appNetwork = network()

  const defaultData: App = {
    id: `app-${faker.datatype.number()}`,
    name,
    image: image(),
    imageIds: [],
    description: faker.commerce.productDescription(),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    enabledContexts: [PermissionContext.NETWORK, PermissionContext.SPACE],
    standing: StoreItemStanding.OFFICIAL,
    status: StoreItemStatus.PUBLIC,
    comingSoon: false,
    locked: false,
    slug: faker.helpers.slugify(name).toLowerCase(),
    banner: image(),
    about: '',
    authorName: '',
    authorUrl: '',
    embeds: [],
    embedIds: [],
    favicon: image(),
    installed: false,
    network: appNetwork,
    networkId: appNetwork.id,
    requiredPlan: PlanName.BASIC,
    privacyPolicyUrl: 'policy',
    secretToken: 'secretToken',
    termsOfServiceUrl: 'tos',
    requiredPermissions: [PrimaryScopes.ALL_ACCESS],
    docsUrl: '',
  }
  return merge(defaultData, customData)
}
