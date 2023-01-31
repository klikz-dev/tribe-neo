[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / AppClient

# Class: AppClient

[clients](../modules/clients.md).AppClient

## Table of contents

### Constructors

- [constructor](clients.AppClient.md#constructor)

### Methods

- [appInstallations](clients.AppClient.md#appinstallations)
- [get](clients.AppClient.md#get)
- [install](clients.AppClient.md#install)
- [list](clients.AppClient.md#list)
- [networkSettings](clients.AppClient.md#networksettings)
- [spaceSettings](clients.AppClient.md#spacesettings)
- [uninstall](clients.AppClient.md#uninstall)
- [updateNetworkSettings](clients.AppClient.md#updatenetworksettings)

## Constructors

### constructor

• **new AppClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/app.client.ts:33](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/app.client.ts#L33)

## Methods

### appInstallations

▸ **appInstallations**(`variables`, `fields?`, `accessToken?`): `Promise`<`PaginatedAppInstallation`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryGetNetworkAppInstallationsArgs` | `undefined` |
| `fields` | `AppInstallationFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`PaginatedAppInstallation`\>

#### Defined in

[packages/client/src/clients/app.client.ts:132](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/app.client.ts#L132)

___

### get

▸ **get**(`variables`, `fields?`, `accessToken?`): `Promise`<`App`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryAppArgs` | `undefined` |
| `fields` | `AppFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`App`\>

#### Defined in

[packages/client/src/clients/app.client.ts:37](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/app.client.ts#L37)

___

### install

▸ **install**(`variables`, `fields?`, `accessToken?`): `Promise`<`AppInstallation`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationInstallAppArgs` | `undefined` |
| `fields` | `AppInstallationFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`AppInstallation`\>

#### Defined in

[packages/client/src/clients/app.client.ts:104](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/app.client.ts#L104)

___

### list

▸ **list**(`variables`, `fields?`, `accessToken?`): `Promise`<`PaginatedApp`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryAppsArgs` | `undefined` |
| `fields` | `AppFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`PaginatedApp`\>

#### Defined in

[packages/client/src/clients/app.client.ts:51](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/app.client.ts#L51)

___

### networkSettings

▸ **networkSettings**(`variables`, `accessToken?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `QueryGetAppNetworkSettingsArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/client/src/clients/app.client.ts:65](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/app.client.ts#L65)

___

### spaceSettings

▸ **spaceSettings**(`variables`, `accessToken?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `QueryGetAppSpaceSettingsArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/client/src/clients/app.client.ts:91](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/app.client.ts#L91)

___

### uninstall

▸ **uninstall**(`variables`, `fields?`, `accessToken?`): `Promise`<`AppInstallation`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationUninstallAppArgs` | `undefined` |
| `fields` | `AppInstallationFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`AppInstallation`\>

#### Defined in

[packages/client/src/clients/app.client.ts:118](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/app.client.ts#L118)

___

### updateNetworkSettings

▸ **updateNetworkSettings**(`variables`, `accessToken?`): `Promise`<`AppAction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationUpdateAppNetworkSettingsArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`AppAction`\>

#### Defined in

[packages/client/src/clients/app.client.ts:78](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/app.client.ts#L78)
