[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / MembersClient

# Class: MembersClient

[clients](../modules/clients.md).MembersClient

## Table of contents

### Constructors

- [constructor](clients.MembersClient.md#constructor)

### Methods

- [cancelEmailUpdate](clients.MembersClient.md#cancelemailupdate)
- [delete](clients.MembersClient.md#delete)
- [get](clients.MembersClient.md#get)
- [list](clients.MembersClient.md#list)
- [update](clients.MembersClient.md#update)

## Constructors

### constructor

• **new MembersClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/members.client.ts:24](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/members.client.ts#L24)

## Methods

### cancelEmailUpdate

▸ **cancelEmailUpdate**(`variables`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationCancelEmailUpdateArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/members.client.ts:83](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/members.client.ts#L83)

___

### delete

▸ **delete**(`variables`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationDeleteMemberArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/members.client.ts:70](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/members.client.ts#L70)

___

### get

▸ **get**(`id`, `fields?`, `accessToken?`): `Promise`<`Member`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `fields` | `MemberFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Member`\>

#### Defined in

[packages/client/src/clients/members.client.ts:42](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/members.client.ts#L42)

___

### list

▸ **list**(`variables`, `fields?`, `accessToken?`): `Promise`<`PaginatedMember`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryMembersArgs` | `undefined` |
| `fields` | `MemberFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`PaginatedMember`\>

#### Defined in

[packages/client/src/clients/members.client.ts:28](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/members.client.ts#L28)

___

### update

▸ **update**(`variables`, `fields?`, `accessToken?`): `Promise`<`Member`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationUpdateMemberArgs` | `undefined` |
| `fields` | `MemberFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Member`\>

#### Defined in

[packages/client/src/clients/members.client.ts:56](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/members.client.ts#L56)
