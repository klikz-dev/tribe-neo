[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / SpaceMembersClient

# Class: SpaceMembersClient

[clients](../modules/clients.md).SpaceMembersClient

## Table of contents

### Constructors

- [constructor](clients.SpaceMembersClient.md#constructor)

### Methods

- [add](clients.SpaceMembersClient.md#add)
- [listMembers](clients.SpaceMembersClient.md#listmembers)
- [listSpaces](clients.SpaceMembersClient.md#listspaces)
- [remove](clients.SpaceMembersClient.md#remove)

## Constructors

### constructor

• **new SpaceMembersClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/spaceMembers.client.ts:22](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembers.client.ts#L22)

## Methods

### add

▸ **add**(`variables`, `fields?`, `accessToken?`): `Promise`<`SpaceMember`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationAddSpaceMembersArgs` | `undefined` |
| `fields` | `SpaceMemberFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`SpaceMember`[]\>

#### Defined in

[packages/client/src/clients/spaceMembers.client.ts:26](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembers.client.ts#L26)

___

### listMembers

▸ **listMembers**(`variables`, `fields?`, `accessToken?`): `Promise`<`PaginatedSpaceMember`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QuerySpaceMembersArgs` | `undefined` |
| `fields` | `SpaceMemberFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`PaginatedSpaceMember`\>

#### Defined in

[packages/client/src/clients/spaceMembers.client.ts:40](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembers.client.ts#L40)

___

### listSpaces

▸ **listSpaces**(`variables`, `fields?`, `accessToken?`): `Promise`<`PaginatedSpaceMember`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryMemberSpacesArgs` | `undefined` |
| `fields` | `SpaceMemberFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`PaginatedSpaceMember`\>

#### Defined in

[packages/client/src/clients/spaceMembers.client.ts:54](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembers.client.ts#L54)

___

### remove

▸ **remove**(`variables`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationRemoveSpaceMembersArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/spaceMembers.client.ts:68](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceMembers.client.ts#L68)
