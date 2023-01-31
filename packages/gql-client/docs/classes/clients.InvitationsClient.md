[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / InvitationsClient

# Class: InvitationsClient

[clients](../modules/clients.md).InvitationsClient

## Table of contents

### Constructors

- [constructor](clients.InvitationsClient.md#constructor)

### Methods

- [getLink](clients.InvitationsClient.md#getlink)
- [invite](clients.InvitationsClient.md#invite)
- [list](clients.InvitationsClient.md#list)
- [validate](clients.InvitationsClient.md#validate)
- [validateLink](clients.InvitationsClient.md#validatelink)

## Constructors

### constructor

• **new InvitationsClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/invitations.client.ts:23](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/invitations.client.ts#L23)

## Methods

### getLink

▸ **getLink**(`accessToken?`): `Promise`<`MemberInvitationLink`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessToken?` | `string` |

#### Returns

`Promise`<`MemberInvitationLink`\>

#### Defined in

[packages/client/src/clients/invitations.client.ts:27](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/invitations.client.ts#L27)

___

### invite

▸ **invite**(`variables`, `fields?`, `accessToken?`): `Promise`<`MemberInvitation`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationInviteMembersArgs` | `undefined` |
| `fields` | `MemberInvitationFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`MemberInvitation`[]\>

#### Defined in

[packages/client/src/clients/invitations.client.ts:49](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/invitations.client.ts#L49)

___

### list

▸ **list**(`variables`, `fields?`, `accessToken?`): `Promise`<`PaginatedMemberInvitation`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryMemberInvitationsArgs` | `undefined` |
| `fields` | `MemberInvitationFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`PaginatedMemberInvitation`\>

#### Defined in

[packages/client/src/clients/invitations.client.ts:77](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/invitations.client.ts#L77)

___

### validate

▸ **validate**(`variables`, `fields?`, `accessToken?`): `Promise`<`MemberInvitation`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryMemberInvitationValidityArgs` | `undefined` |
| `fields` | `MemberInvitationFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`MemberInvitation`\>

#### Defined in

[packages/client/src/clients/invitations.client.ts:63](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/invitations.client.ts#L63)

___

### validateLink

▸ **validateLink**(`variables`, `accessToken?`): `Promise`<`MemberInvitationLink`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `QueryInvitationLinkValidityArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`MemberInvitationLink`\>

#### Defined in

[packages/client/src/clients/invitations.client.ts:36](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/invitations.client.ts#L36)
