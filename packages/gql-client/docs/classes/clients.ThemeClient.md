[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / ThemeClient

# Class: ThemeClient

[clients](../modules/clients.md).ThemeClient

## Table of contents

### Constructors

- [constructor](clients.ThemeClient.md#constructor)

### Methods

- [upsert](clients.ThemeClient.md#upsert)

## Constructors

### constructor

• **new ThemeClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/theme.client.ts:8](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/theme.client.ts#L8)

## Methods

### upsert

▸ **upsert**(`variables`, `fields?`, `accessToken?`): `Promise`<`NewTheme`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationUpsertThemeArgs` | `undefined` |
| `fields` | `NewThemeFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`NewTheme`\>

#### Defined in

[packages/client/src/clients/theme.client.ts:12](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/theme.client.ts#L12)
