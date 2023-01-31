[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / TagsClient

# Class: TagsClient

[clients](../modules/clients.md).TagsClient

## Table of contents

### Constructors

- [constructor](clients.TagsClient.md#constructor)

### Methods

- [create](clients.TagsClient.md#create)
- [list](clients.TagsClient.md#list)
- [update](clients.TagsClient.md#update)

## Constructors

### constructor

• **new TagsClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/tags.client.ts:19](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/tags.client.ts#L19)

## Methods

### create

▸ **create**(`variables`, `fields?`, `accessToken?`): `Promise`<`Tag`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationCreateTagArgs` | `undefined` |
| `fields` | `TagFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Tag`\>

#### Defined in

[packages/client/src/clients/tags.client.ts:37](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/tags.client.ts#L37)

___

### list

▸ **list**(`variables`, `fields`, `accessToken?`): `Promise`<`PaginatedTag`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `QueryTagsArgs` |
| `fields` | `TagFields` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`PaginatedTag`\>

#### Defined in

[packages/client/src/clients/tags.client.ts:23](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/tags.client.ts#L23)

___

### update

▸ **update**(`variables`, `fields?`, `accessToken?`): `Promise`<`Tag`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationUpdateTagArgs` | `undefined` |
| `fields` | `TagFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Tag`\>

#### Defined in

[packages/client/src/clients/tags.client.ts:51](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/tags.client.ts#L51)
