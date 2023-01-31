[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / SpaceRolesClient

# Class: SpaceRolesClient

[clients](../modules/clients.md).SpaceRolesClient

## Table of contents

### Constructors

- [constructor](clients.SpaceRolesClient.md#constructor)

### Methods

- [list](clients.SpaceRolesClient.md#list)

## Constructors

### constructor

• **new SpaceRolesClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/spaceRoles.client.ts:8](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceRoles.client.ts#L8)

## Methods

### list

▸ **list**(`variables`, `fields?`, `accessToken?`): `Promise`<`SpaceRole`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QuerySpaceRolesArgs` | `undefined` |
| `fields` | `SpaceRoleFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`SpaceRole`[]\>

#### Defined in

[packages/client/src/clients/spaceRoles.client.ts:12](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/spaceRoles.client.ts#L12)
