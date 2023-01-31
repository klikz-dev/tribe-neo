import faker from 'faker'
import merge from 'lodash.merge'

export const network = (
  customData = {},
  //   { actionPermissions }: any = {},
) => {
  const defaultData = {
    newDomain: '',
    aliases: [],
    id: `network-${faker.random.number()}`,
    __typename: 'Network',
    name: faker.company.companyName(),
    companyName: faker.company.companyName(),
    billingEmail: null,
    domain: faker.internet.domainWord(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.past().toISOString(),
    visibility: 'public', // NetworkVisibility.PUBLIC,
    locale: 'en',
    whoCanInvite: undefined,
    brandColor: faker.internet.color(),
    incidentEmails: [],
    // logo: image(),
    // themes: themes(),
    defaultSpaces: undefined,
    members: undefined,
    createdById: '123',
    ownerId: '123',
    membership: undefined,
    // roles: [roleAdmin(), roleMember()],
    spaces: undefined,
    topNavigation: {
      __typename: 'TopNavigation',
      enabled: true,
      //   alignment: TopNavigationAlignment.LEFT,
      //   items: [navigationItem(), navigationItem()],
    },
    memberCapacity: 10,
    seatsCapacity: 3,
    additionalSeatsCapacity: 3,
    customMemberCapacity: 3,
    seatCapacityDeclared: 4,
    memberCapacityDeclared: 3,
    hideDefaultAuthenticationForm: false,
    // subscriptionPlan: plan(),
    // status: NetworkStatus.PUBLISHED,
    statusLocked: true,
    tribeBranding: true,
    authMemberProps: {
      __typename: 'NetworkAuthMemberProps',
      //   context: PermissionContext.NETWORK,
      //   permissions: permissions(actionPermissions),
    },
    customCodes: [],
    whoCanInviteIds: [],
  }
  return merge(defaultData, customData)
}
