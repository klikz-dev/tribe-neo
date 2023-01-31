[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / clients

# Module: clients

## Table of contents

### Classes

- [AppClient](../classes/clients.AppClient.md)
- [AuthClient](../classes/clients.AuthClient.md)
- [BillingClient](../classes/clients.BillingClient.md)
- [CollectionsClient](../classes/clients.CollectionsClient.md)
- [DevClient](../classes/clients.DevClient.md)
- [GraphqlClient](../classes/clients.GraphqlClient.md)
- [InvitationsClient](../classes/clients.InvitationsClient.md)
- [MediaClient](../classes/clients.MediaClient.md)
- [MembersClient](../classes/clients.MembersClient.md)
- [ModerationClient](../classes/clients.ModerationClient.md)
- [NetworkClient](../classes/clients.NetworkClient.md)
- [NotificationsClient](../classes/clients.NotificationsClient.md)
- [PagesClient](../classes/clients.PagesClient.md)
- [PostsClient](../classes/clients.PostsClient.md)
- [ReportClient](../classes/clients.ReportClient.md)
- [RolesClient](../classes/clients.RolesClient.md)
- [SlatesClient](../classes/clients.SlatesClient.md)
- [SpaceMembersClient](../classes/clients.SpaceMembersClient.md)
- [SpaceMembershipClient](../classes/clients.SpaceMembershipClient.md)
- [SpacePostTypeClient](../classes/clients.SpacePostTypeClient.md)
- [SpaceRolesClient](../classes/clients.SpaceRolesClient.md)
- [SpacesClient](../classes/clients.SpacesClient.md)
- [TagsClient](../classes/clients.TagsClient.md)
- [ThemeClient](../classes/clients.ThemeClient.md)

### Type aliases

- [TribeClientOptions](clients.md#tribeclientoptions)

## Type aliases

### TribeClientOptions

Ƭ **TribeClientOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accessToken?` | `string` |
| `clientId?` | `string` |
| `clientSecret?` | `string` |
| `graphqlUrl?` | `string` |
| `notifyOnTokenExpiration?` | `boolean` |
| `onError?` | (`errors`: `ErrorResponse`[], `client`: [`GraphqlClient`](../classes/clients.GraphqlClient.md)) => `void` |

#### Defined in

[packages/client/src/clients/graphql.client.ts:12](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/graphql.client.ts#L12)
