[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / SlatesClient

# Class: SlatesClient

[clients](../modules/clients.md).SlatesClient

## Table of contents

### Constructors

- [constructor](clients.SlatesClient.md#constructor)

### Methods

- [update](clients.SlatesClient.md#update)

## Constructors

### constructor

• **new SlatesClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/slates.client.ts:8](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/slates.client.ts#L8)

## Methods

### update

▸ **update**(`variables`, `fields?`, `accessToken?`): `Promise`<`Slate`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationUpdateSlatesArgs` | `undefined` |
| `fields` | ``"all"`` | `'all'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Slate`[]\>

#### Defined in

[packages/client/src/clients/slates.client.ts:12](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/slates.client.ts#L12)
