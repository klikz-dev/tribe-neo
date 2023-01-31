[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / MediaClient

# Class: MediaClient

[clients](../modules/clients.md).MediaClient

## Table of contents

### Constructors

- [constructor](clients.MediaClient.md#constructor)

### Methods

- [createEmojis](clients.MediaClient.md#createemojis)
- [createFiles](clients.MediaClient.md#createfiles)
- [createImages](clients.MediaClient.md#createimages)
- [embed](clients.MediaClient.md#embed)
- [updateImage](clients.MediaClient.md#updateimage)
- [uploadFiles](clients.MediaClient.md#uploadfiles)
- [uploadImages](clients.MediaClient.md#uploadimages)

## Constructors

### constructor

• **new MediaClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/media.client.ts:28](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/media.client.ts#L28)

## Methods

### createEmojis

▸ **createEmojis**(`input`): `Promise`<`Emoji`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `CreateEmojiInput`[] |

#### Returns

`Promise`<`Emoji`[]\>

#### Defined in

[packages/client/src/clients/media.client.ts:50](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/media.client.ts#L50)

___

### createFiles

▸ **createFiles**(`variables`): `Promise`<`SignedUrl`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `CreateFileInput`[] |

#### Returns

`Promise`<`SignedUrl`[]\>

#### Defined in

[packages/client/src/clients/media.client.ts:74](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/media.client.ts#L74)

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

[packages/client/src/clients/media.client.ts:62](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/media.client.ts#L62)

___

### embed

▸ **embed**(`variables`): `Promise`<`Embed`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `EmbedInput` |

#### Returns

`Promise`<`Embed`\>

#### Defined in

[packages/client/src/clients/media.client.ts:32](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/media.client.ts#L32)

___

### updateImage

▸ **updateImage**(`variables`): `Promise`<`Image`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationUpdateImageArgs` |

#### Returns

`Promise`<`Image`\>

#### Defined in

[packages/client/src/clients/media.client.ts:41](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/media.client.ts#L41)

___

### uploadFiles

▸ **uploadFiles**(`input`, `handleError?`): `Promise`<`File`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `AttachmentUploadType` |
| `handleError?` | `ClientAttachmentErrorHandler` |

#### Returns

`Promise`<`File`[]\>

#### Defined in

[packages/client/src/clients/media.client.ts:87](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/media.client.ts#L87)

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

[packages/client/src/clients/media.client.ts:139](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/media.client.ts#L139)
