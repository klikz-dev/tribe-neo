[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / SpacePostTypeClient

# Class: SpacePostTypeClient

[clients](../modules/clients.md).SpacePostTypeClient

## Table of contents

### Constructors

- [constructor](clients.SpacePostTypeClient.md#constructor)

### Methods

- [get](clients.SpacePostTypeClient.md#get)
- [list](clients.SpacePostTypeClient.md#list)
- [update](clients.SpacePostTypeClient.md#update)

## Constructors

### constructor

• **new SpacePostTypeClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/space-post-type.client.ts:19](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/space-post-type.client.ts#L19)

## Methods

### get

▸ **get**(`variables`, `fields?`, `accessToken?`): `Promise`<`SpacePostType`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QuerySpacePostTypeArgs` | `undefined` |
| `fields` | `SpacePostTypeFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`SpacePostType`\>

#### Defined in

[packages/client/src/clients/space-post-type.client.ts:37](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/space-post-type.client.ts#L37)

___

### list

▸ **list**(`variables`, `fields?`, `accessToken?`): `Promise`<`PaginatedSpacePostType`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QuerySpacePostTypesArgs` | `undefined` |
| `fields` | `SpacePostTypeFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`PaginatedSpacePostType`\>

#### Defined in

[packages/client/src/clients/space-post-type.client.ts:23](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/space-post-type.client.ts#L23)

___

### update

▸ **update**(`variables`, `fields?`, `accessToken?`): `Promise`<`SpacePostType`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationUpdateSpacePostTypesArgs` | `undefined` |
| `fields` | `SpacePostTypeFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`SpacePostType`\>

#### Defined in

[packages/client/src/clients/space-post-type.client.ts:51](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/space-post-type.client.ts#L51)
