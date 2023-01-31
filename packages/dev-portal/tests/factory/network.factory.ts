import faker from 'faker'
import merge from 'lodash.merge'

import {
  Network,
  NetworkStatus,
  NetworkVisibility,
} from '@tribeplatform/gql-client/types'

import { image } from './image.factory'

export const network = (customData: Partial<Network> = {}): Network => {
  const defaultData: Network = {
    newDomain: '',
    aliases: [],
    id: `network-${faker.datatype.number()}`,
    name: faker.company.companyName(),
    companyName: faker.company.companyName(),
    billingEmail: null,
    domain: faker.internet.domainWord(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.past().toISOString(),
    visibility: NetworkVisibility.PUBLIC,
    locale: 'en',
    whoCanInvite: undefined,
    brandColor: faker.internet.color(),
    incidentEmails: [],
    logo: image(),
    // themes: themes(),
    defaultSpaces: undefined,
    members: undefined,
    createdById: '123',
    ownerId: '123',
    membership: undefined,
    roles: [],
    spaces: undefined,
    // topNavigation: {
    //   enabled: true,
    //   alignment: TopNavigationAlignment.LEFT,
    //   items: [navigationItem(), navigationItem()],
    // },
    memberCapacity: 10,
    seatsCapacity: 3,
    additionalSeatsCapacity: 3,
    customMemberCapacity: 3,
    seatCapacityDeclared: 4,
    memberCapacityDeclared: 3,
    hideDefaultAuthenticationForm: false,
    // subscriptionPlan: plan(),
    status: NetworkStatus.PUBLISHED,
    statusLocked: true,
    tribeBranding: true,
    // authMemberProps: {
    //   __typename: 'NetworkAuthMemberProps',
    //   context: PermissionContext.NETWORK,
    //   permissions: permissions(actionPermissions),
    // },
    customCodes: [],
    whoCanInviteIds: [],
    navigationSlates: {
      header: {
        id: 'header-slate',
        components: [],
        rootComponents: [],
      },
      sidebar1: {
        id: 'sidebar-slate',
        components: [],
        rootComponents: [],
      },
    },
  }
  return merge(defaultData, customData)
}
