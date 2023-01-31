[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / SpaceMembershipClient

# Class: SpaceMembershipClient

[clients](../modules/clients.md).SpaceMembershipClient

## Table of contents

### Constructors

- [constructor](clients.SpaceMembershipClient.md#constructor)

### Methods

- [approveRequest](clients.SpaceMembershipClient.md#approverequest)
- [declineRequest](clients.SpaceMembershipClient.md#declinerequest)
- [getMemberRequests](clients.SpaceMembershipClient.md#getmemberrequests)
- [getRequests](clients.SpaceMembershipClient.md#getrequests)
- [request](clients.SpaceMembershipClient.md#request)

## Constructors

### constructor

• **new SpaceMembershipClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/spaceMembership.client.ts:24](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembership.client.ts#L24)

## Methods

### approveRequest

▸ **approveRequest**(`variables`, `fields?`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationApproveSpaceMembershipRequestArgs` | `undefined` |
| `fields` | `ActionFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/spaceMembership.client.ts:70](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembership.client.ts#L70)

___

### declineRequest

▸ **declineRequest**(`variables`, `fields?`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationDeclineSpaceMembershipRequestArgs` | `undefined` |
| `fields` | `ActionFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/spaceMembership.client.ts:84](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembership.client.ts#L84)

___

### getMemberRequests

▸ **getMemberRequests**(`variables`, `fields?`, `accessToken?`): `Promise`<`SpaceJoinRequest`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryMemberSpaceMembershipRequestArgs` | `undefined` |
| `fields` | `SpaceJoinRequestFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`SpaceJoinRequest`[]\>

#### Defined in

[packages/client/src/clients/spaceMembership.client.ts:28](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembership.client.ts#L28)

___

### getRequests

▸ **getRequests**(`variables`, `fields?`, `accessToken?`): `Promise`<`SpaceJoinRequest`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QuerySpaceMembershipRequestsArgs` | `undefined` |
| `fields` | `SpaceJoinRequestFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`SpaceJoinRequest`[]\>

#### Defined in

[packages/client/src/clients/spaceMembership.client.ts:42](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembership.client.ts#L42)

___

### request

▸ **request**(`variables`, `fields?`, `accessToken?`): `Promise`<`SpaceJoinRequest`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationRequestSpaceMembershipArgs` | `undefined` |
| `fields` | `SpaceJoinRequestFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`SpaceJoinRequest`\>

#### Defined in

[packages/client/src/clients/spaceMembership.client.ts:56](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembership.client.ts#L56)
