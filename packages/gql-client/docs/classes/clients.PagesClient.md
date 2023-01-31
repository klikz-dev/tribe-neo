[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / PagesClient

# Class: PagesClient

[clients](../modules/clients.md).PagesClient

## Table of contents

### Constructors

- [constructor](clients.PagesClient.md#constructor)

### Methods

- [create](clients.PagesClient.md#create)
- [list](clients.PagesClient.md#list)
- [update](clients.PagesClient.md#update)

## Constructors

### constructor

• **new PagesClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/pages.client.ts:13](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/pages.client.ts#L13)

## Methods

### create

▸ **create**(`variables`, `fields?`, `accessToken?`): `Promise`<`Page`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationCreatePageArgs` | `undefined` |
| `fields` | `PageFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Page`\>

#### Defined in

[packages/client/src/clients/pages.client.ts:29](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/pages.client.ts#L29)

___

### list

▸ **list**(`fields?`, `accessToken?`): `Promise`<`Page`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fields` | `PageFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Page`[]\>

#### Defined in

[packages/client/src/clients/pages.client.ts:17](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/pages.client.ts#L17)

___

### update

▸ **update**(`variables`, `fields?`, `accessToken?`): `Promise`<`Page`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationUpdatePageArgs` | `undefined` |
| `fields` | `PageFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Page`\>

#### Defined in

[packages/client/src/clients/pages.client.ts:43](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/pages.client.ts#L43)
