import faker from 'faker'
import merge from 'lodash.merge'

import { network } from './network.factory'

// TODO: add types
export const space = (
  customData: any = {},
  //   { actionPermissions }: any = {},
) => {
  const name =
    customData?.name ||
    `${faker.commerce.productAdjective()} ${faker.commerce.department()}`

  const defaultData = {
    id: `space-${faker.random.number()}`,
    __typename: 'Space',
    name,
    // spaceType: spaceType(),
    description: faker.commerce.productDescription(),
    // image: emoji(),
    slug: faker.helpers.slugify(name).toLowerCase(),
    // banner: image(),
    postsCount: faker.random.number(),
    membersCount: faker.random.number(1000),
    network: network(),
    createdAt: faker.date.recent().toISOString(),
    // createdBy: member(),
    members: undefined,
    private: false,
    pinnedPosts: [],
    inviteOnly: false,
    hidden: false,
    nonAdminsCanInvite: false,
    authMemberProps: {
      __typename: 'SpaceAuthMemberProps',
      membershipStatus: 'joined', // SpaceMembershipStatus.JOINED,
      context: 'space', // PermissionContext.SPACE,
      //   permissions: permissions(actionPermissions),
    },
    posts: undefined,
    roles: [],
    highlightedTags: [],
    seoDetail: {
      __typename: 'SpaceSeoDetail',
      title: '',
      description: '',
      image: null,
    },
    customOrderingIndexInGroup: 0,
    // collection: spaceCollection({}, []),
    createdById: '',
    groupId: '',
    networkId: '',
    spaceTypeId: '',
  }
  return merge(defaultData, customData)
}
