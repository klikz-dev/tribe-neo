[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / DevClient

# Class: DevClient

[clients](../modules/clients.md).DevClient

## Table of contents

### Constructors

- [constructor](clients.DevClient.md#constructor)

### Methods

- [addAppCollaborator](clients.DevClient.md#addappcollaborator)
- [app](clients.DevClient.md#app)
- [appCollaborators](clients.DevClient.md#appcollaborators)
- [appPublications](clients.DevClient.md#apppublications)
- [apps](clients.DevClient.md#apps)
- [createApp](clients.DevClient.md#createapp)
- [createImages](clients.DevClient.md#createimages)
- [deleteApp](clients.DevClient.md#deleteapp)
- [eventTypes](clients.DevClient.md#eventtypes)
- [networks](clients.DevClient.md#networks)
- [publishAppPrivately](clients.DevClient.md#publishappprivately)
- [regenerateClientSecret](clients.DevClient.md#regenerateclientsecret)
- [removeAppCollaborator](clients.DevClient.md#removeappcollaborator)
- [testAppWebhook](clients.DevClient.md#testappwebhook)
- [unPublishAppPrivately](clients.DevClient.md#unpublishappprivately)
- [updateApp](clients.DevClient.md#updateapp)
- [uploadImages](clients.DevClient.md#uploadimages)

## Constructors

### constructor

• **new DevClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/dev.client.ts:57](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L57)

## Methods

### addAppCollaborator

▸ **addAppCollaborator**(`variables`, `fields?`, `accessToken?`): `Promise`<`AppCollaborator`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationGlobalAddAppCollaboratorArgs` | `undefined` |
| `fields` | `AppCollaboratorFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`AppCollaborator`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:234](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L234)

___

### app

▸ **app**(`variables`, `fields?`, `accessToken?`): `Promise`<`App`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryGlobalAppArgs` | `undefined` |
| `fields` | `GlobalAppFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`App`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:75](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L75)

___

### appCollaborators

▸ **appCollaborators**(`variables`, `fields?`, `accessToken?`): `Promise`<`AppCollaborator`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryGlobalAppCollaboratorsArgs` | `undefined` |
| `fields` | `AppCollaboratorFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`AppCollaborator`[]\>

#### Defined in

[packages/client/src/clients/dev.client.ts:220](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L220)

___

### appPublications

▸ **appPublications**(`variables`, `fields?`, `accessToken?`): `Promise`<`AppPublication`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryGlobalAppPublicationsArgs` | `undefined` |
| `fields` | ``"basic"`` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`AppPublication`[]\>

#### Defined in

[packages/client/src/clients/dev.client.ts:263](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L263)

___

### apps

▸ **apps**(`variables`, `fields?`, `accessToken?`): `Promise`<`PaginatedApp`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryGlobalAppsArgs` | `undefined` |
| `fields` | `GlobalAppFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`PaginatedApp`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:61](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L61)

___

### createApp

▸ **createApp**(`variables`, `fields?`, `accessToken?`): `Promise`<`App`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationGlobalCreateAppArgs` | `undefined` |
| `fields` | `GlobalAppFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`App`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:89](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L89)

___

### createImages

▸ **createImages**(`variables`): `Promise`<`SignedUrl`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `CreateImageInput`[] |

#### Returns

`Promise`<`SignedUrl`[]\>

#### Defined in

[packages/client/src/clients/dev.client.ts:159](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L159)

___

### deleteApp

▸ **deleteApp**(`variables`, `fields?`, `accessToken?`): `Promise`<`App`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationGlobalDeleteAppArgs` | `undefined` |
| `fields` | `GlobalAppFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`App`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:117](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L117)

___

### eventTypes

▸ **eventTypes**(`variables`, `fields?`, `accessToken?`): `Promise`<`EventType`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `any` | `undefined` |
| `fields` | `EventTypeFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`EventType`[]\>

#### Defined in

[packages/client/src/clients/dev.client.ts:320](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L320)

___

### networks

▸ **networks**(`variables`, `fields?`, `accessToken?`): `Promise`<`PaginatedNetwork`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryGlobalNetworksArgs` | `undefined` |
| `fields` | `PluralNetworkFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`PaginatedNetwork`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:131](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L131)

___

### publishAppPrivately

▸ **publishAppPrivately**(`variables`, `fields?`, `accessToken?`): `Promise`<`AppPublication`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationGlobalPublishAppPrivatelyArgs` | `undefined` |
| `fields` | ``"basic"`` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`AppPublication`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:277](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L277)

___

### regenerateClientSecret

▸ **regenerateClientSecret**(`variables`, `fields?`, `accessToken?`): `Promise`<`App`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationGlobalRegenerateClientSecretArgs` | `undefined` |
| `fields` | `GlobalAppFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`App`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:145](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L145)

___

### removeAppCollaborator

▸ **removeAppCollaborator**(`variables`, `fields?`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationGlobalRemoveAppCollaboratorArgs` | `undefined` |
| `fields` | `ActionFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:249](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L249)

___

### testAppWebhook

▸ **testAppWebhook**(`variables`, `fields?`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationGlobalTestAppWebhookArgs` | `undefined` |
| `fields` | `ActionFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:306](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L306)

___

### unPublishAppPrivately

▸ **unPublishAppPrivately**(`variables`, `fields?`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationGlobalUnPublishAppPrivatelyArgs` | `undefined` |
| `fields` | `ActionFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:292](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L292)

___

### updateApp

▸ **updateApp**(`variables`, `fields?`, `accessToken?`): `Promise`<`App`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationGlobalUpdateAppArgs` | `undefined` |
| `fields` | `GlobalAppFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`App`\>

#### Defined in

[packages/client/src/clients/dev.client.ts:103](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L103)

___

### uploadImages

▸ **uploadImages**(`input`): `Promise`<`Image`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `UploadImagesArgs`[] |

#### Returns

`Promise`<`Image`[]\>

#### Defined in

[packages/client/src/clients/dev.client.ts:171](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/dev.client.ts#L171)
