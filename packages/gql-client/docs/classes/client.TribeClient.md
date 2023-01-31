[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [client](../modules/client.md) / TribeClient

# Class: TribeClient

[client](../modules/client.md).TribeClient

## Table of contents

### Constructors

- [constructor](client.TribeClient.md#constructor)

### Properties

- [app](client.TribeClient.md#app)
- [auth](client.TribeClient.md#auth)
- [billing](client.TribeClient.md#billing)
- [collections](client.TribeClient.md#collections)
- [dev](client.TribeClient.md#dev)
- [invitations](client.TribeClient.md#invitations)
- [media](client.TribeClient.md#media)
- [members](client.TribeClient.md#members)
- [moderation](client.TribeClient.md#moderation)
- [network](client.TribeClient.md#network)
- [notifications](client.TribeClient.md#notifications)
- [pages](client.TribeClient.md#pages)
- [posts](client.TribeClient.md#posts)
- [report](client.TribeClient.md#report)
- [roles](client.TribeClient.md#roles)
- [slates](client.TribeClient.md#slates)
- [spaceMembers](client.TribeClient.md#spacemembers)
- [spaceMembership](client.TribeClient.md#spacemembership)
- [spacePostType](client.TribeClient.md#spaceposttype)
- [spaceRoles](client.TribeClient.md#spaceroles)
- [spaces](client.TribeClient.md#spaces)
- [tags](client.TribeClient.md#tags)
- [theme](client.TribeClient.md#theme)

### Methods

- [generateToken](client.TribeClient.md#generatetoken)
- [getLimitedToken](client.TribeClient.md#getlimitedtoken)
- [getTokens](client.TribeClient.md#gettokens)
- [search](client.TribeClient.md#search)
- [setToken](client.TribeClient.md#settoken)

## Constructors

### constructor

• **new TribeClient**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`TribeClientOptions`](../modules/clients.md#tribeclientoptions) |

#### Defined in

[packages/client/src/client.ts:95](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L95)

## Properties

### app

• **app**: [`AppClient`](clients.AppClient.md)

#### Defined in

[packages/client/src/client.ts:47](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L47)

___

### auth

• **auth**: [`AuthClient`](clients.AuthClient.md)

#### Defined in

[packages/client/src/client.ts:49](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L49)

___

### billing

• **billing**: [`BillingClient`](clients.BillingClient.md)

#### Defined in

[packages/client/src/client.ts:51](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L51)

___

### collections

• **collections**: [`CollectionsClient`](clients.CollectionsClient.md)

#### Defined in

[packages/client/src/client.ts:53](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L53)

___

### dev

• **dev**: [`DevClient`](clients.DevClient.md)

#### Defined in

[packages/client/src/client.ts:55](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L55)

___

### invitations

• **invitations**: [`InvitationsClient`](clients.InvitationsClient.md)

#### Defined in

[packages/client/src/client.ts:57](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L57)

___

### media

• **media**: [`MediaClient`](clients.MediaClient.md)

#### Defined in

[packages/client/src/client.ts:59](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L59)

___

### members

• **members**: [`MembersClient`](clients.MembersClient.md)

#### Defined in

[packages/client/src/client.ts:61](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L61)

___

### moderation

• **moderation**: [`ModerationClient`](clients.ModerationClient.md)

#### Defined in

[packages/client/src/client.ts:63](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L63)

___

### network

• **network**: [`NetworkClient`](clients.NetworkClient.md)

#### Defined in

[packages/client/src/client.ts:65](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L65)

___

### notifications

• **notifications**: [`NotificationsClient`](clients.NotificationsClient.md)

#### Defined in

[packages/client/src/client.ts:67](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L67)

___

### pages

• **pages**: [`PagesClient`](clients.PagesClient.md)

#### Defined in

[packages/client/src/client.ts:91](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L91)

___

### posts

• **posts**: [`PostsClient`](clients.PostsClient.md)

#### Defined in

[packages/client/src/client.ts:69](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L69)

___

### report

• **report**: [`ReportClient`](clients.ReportClient.md)

#### Defined in

[packages/client/src/client.ts:71](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L71)

___

### roles

• **roles**: [`RolesClient`](clients.RolesClient.md)

#### Defined in

[packages/client/src/client.ts:73](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L73)

___

### slates

• **slates**: [`SlatesClient`](clients.SlatesClient.md)

#### Defined in

[packages/client/src/client.ts:89](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L89)

___

### spaceMembers

• **spaceMembers**: [`SpaceMembersClient`](clients.SpaceMembersClient.md)

#### Defined in

[packages/client/src/client.ts:75](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L75)

___

### spaceMembership

• **spaceMembership**: [`SpaceMembershipClient`](clients.SpaceMembershipClient.md)

#### Defined in

[packages/client/src/client.ts:77](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L77)

___

### spacePostType

• **spacePostType**: [`SpacePostTypeClient`](clients.SpacePostTypeClient.md)

#### Defined in

[packages/client/src/client.ts:83](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L83)

___

### spaceRoles

• **spaceRoles**: [`SpaceRolesClient`](clients.SpaceRolesClient.md)

#### Defined in

[packages/client/src/client.ts:79](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L79)

___

### spaces

• **spaces**: [`SpacesClient`](clients.SpacesClient.md)

#### Defined in

[packages/client/src/client.ts:81](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L81)

___

### tags

• **tags**: [`TagsClient`](clients.TagsClient.md)

#### Defined in

[packages/client/src/client.ts:85](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L85)

___

### theme

• **theme**: [`ThemeClient`](clients.ThemeClient.md)

#### Defined in

[packages/client/src/client.ts:87](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L87)

## Methods

### generateToken

▸ **generateToken**(`options`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.memberId?` | `string` |
| `options.networkId` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/client/src/client.ts:176](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L176)

___

### getLimitedToken

▸ **getLimitedToken**(`variables`, `fields?`, `useBasicToken?`): `Promise`<`AppToken`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryLimitedTokenArgs` | `undefined` |
| `fields` | `LimitedTokenFields` | `'basic'` |
| `useBasicToken?` | `boolean` | `undefined` |

#### Returns

`Promise`<`AppToken`\>

#### Defined in

[packages/client/src/client.ts:148](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L148)

___

### getTokens

▸ **getTokens**(`variables`, `fields?`): `Promise`<`AuthToken`\>

Get the guest access token for a community.

**`query`** tokens(): AuthToken!

**`example`**
```typescript
 t.client.getTokens({networkDomain: 'community.tribe.so'})
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryTokensArgs` | `undefined` |
| `fields` | `AuthTokenFields` | `'default'` |

#### Returns

`Promise`<`AuthToken`\>

The AuthToken.

#### Defined in

[packages/client/src/client.ts:136](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L136)

___

### search

▸ **search**(`variables`, `fields?`, `accessToken?`): `Promise`<`SearchResult`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QuerySearchArgs` | `undefined` |
| `fields` | `SearchEntityFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`SearchResult`\>

#### Defined in

[packages/client/src/client.ts:162](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L162)

___

### setToken

▸ **setToken**(`accessToken`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessToken` | `string` |

#### Returns

`void`

#### Defined in

[packages/client/src/client.ts:123](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/client.ts#L123)
