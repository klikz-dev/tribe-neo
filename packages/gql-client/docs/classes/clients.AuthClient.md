[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / AuthClient

# Class: AuthClient

[clients](../modules/clients.md).AuthClient

## Table of contents

### Constructors

- [constructor](clients.AuthClient.md#constructor)

### Methods

- [authMember](clients.AuthClient.md#authmember)
- [confirmResetPassword](clients.AuthClient.md#confirmresetpassword)
- [joinNetwork](clients.AuthClient.md#joinnetwork)
- [joinNetworkWithInvitationLink](clients.AuthClient.md#joinnetworkwithinvitationlink)
- [joinNetworkWithToken](clients.AuthClient.md#joinnetworkwithtoken)
- [login](clients.AuthClient.md#login)
- [loginWithSso](clients.AuthClient.md#loginwithsso)
- [logout](clients.AuthClient.md#logout)
- [resendVerification](clients.AuthClient.md#resendverification)
- [sendResetPasswordEmail](clients.AuthClient.md#sendresetpasswordemail)
- [ssoMemberships](clients.AuthClient.md#ssomemberships)
- [ssoRedirect](clients.AuthClient.md#ssoredirect)
- [ssoUrl](clients.AuthClient.md#ssourl)
- [ssos](clients.AuthClient.md#ssos)
- [updateCustomSso](clients.AuthClient.md#updatecustomsso)
- [updateDefaultSsoStatus](clients.AuthClient.md#updatedefaultssostatus)
- [updatePasswordWithToken](clients.AuthClient.md#updatepasswordwithtoken)
- [verifyMember](clients.AuthClient.md#verifymember)

## Constructors

### constructor

• **new AuthClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/auth.client.ts:52](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L52)

## Methods

### authMember

▸ **authMember**(`fields?`): `Promise`<`Member`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fields` | `MemberFields` | `'basic'` |

#### Returns

`Promise`<`Member`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:88](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L88)

___

### confirmResetPassword

▸ **confirmResetPassword**(`variables`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationConfirmResetPasswordArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:233](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L233)

___

### joinNetwork

▸ **joinNetwork**(`variables`, `fields?`): `Promise`<`AuthToken`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationJoinNetworkArgs` | `undefined` |
| `fields` | `AuthTokenFields` | `'basic'` |

#### Returns

`Promise`<`AuthToken`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:117](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L117)

___

### joinNetworkWithInvitationLink

▸ **joinNetworkWithInvitationLink**(`variables`, `fields?`): `Promise`<`AuthToken`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationJoinNetworkWithInvitationLinkArgs` | `undefined` |
| `fields` | `AuthTokenFields` | `'basic'` |

#### Returns

`Promise`<`AuthToken`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:129](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L129)

___

### joinNetworkWithToken

▸ **joinNetworkWithToken**(`variables`, `fields?`): `Promise`<`AuthToken`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationJoinNetworkWithTokenArgs` | `undefined` |
| `fields` | `AuthTokenFields` | `'basic'` |

#### Returns

`Promise`<`AuthToken`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:141](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L141)

___

### login

▸ **login**(`variables`, `fields?`): `Promise`<`AuthToken`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryLoginNetworkArgs` | `undefined` |
| `fields` | `AuthTokenFields` | `'basic'` |

#### Returns

`Promise`<`AuthToken`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:65](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L65)

___

### loginWithSso

▸ **loginWithSso**(`variables`): `Promise`<`SsoUrl`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `QueryLoginWithSsoArgs` |

#### Returns

`Promise`<`SsoUrl`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:96](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L96)

___

### logout

▸ **logout**(`variables`): `Promise`<`Action`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationLogoutNetworkArgs` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:77](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L77)

___

### resendVerification

▸ **resendVerification**(`accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessToken?` | `string` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:56](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L56)

___

### sendResetPasswordEmail

▸ **sendResetPasswordEmail**(`variables`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationSendResetPasswordEmailArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:174](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L174)

___

### ssoMemberships

▸ **ssoMemberships**(`variables`): `Promise`<`SsoMembership`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `QuerySsoMembershipsArgs` |

#### Returns

`Promise`<`SsoMembership`[]\>

#### Defined in

[packages/client/src/clients/auth.client.ts:213](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L213)

___

### ssoRedirect

▸ **ssoRedirect**(`variables`, `fields?`): `Promise`<`AuthToken`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationSsoRedirectArgs` | `undefined` |
| `fields` | `AuthTokenFields` | `'basic'` |

#### Returns

`Promise`<`AuthToken`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:105](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L105)

___

### ssoUrl

▸ **ssoUrl**(`variables`): `Promise`<`SsoUrl`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `QuerySsoUrlArgs` |

#### Returns

`Promise`<`SsoUrl`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:224](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L224)

___

### ssos

▸ **ssos**(`variables`): `Promise`<`Sso`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `QuerySsosArgs` |

#### Returns

`Promise`<`Sso`[]\>

#### Defined in

[packages/client/src/clients/auth.client.ts:165](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L165)

___

### updateCustomSso

▸ **updateCustomSso**(`variables`, `accessToken?`): `Promise`<`Sso`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationUpdateCustomSsoArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`Sso`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:187](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L187)

___

### updateDefaultSsoStatus

▸ **updateDefaultSsoStatus**(`variables`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationUpdateDefaultSsoStatusArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:200](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L200)

___

### updatePasswordWithToken

▸ **updatePasswordWithToken**(`variables`, `accessToken?`): `Promise`<`Action`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `MutationUpdatePasswordWithTokenArgs` |
| `accessToken?` | `string` |

#### Returns

`Promise`<`Action`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:246](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L246)

___

### verifyMember

▸ **verifyMember**(`variables`, `fields?`): `Promise`<`AuthToken`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `MutationVerifyMemberArgs` | `undefined` |
| `fields` | `AuthTokenFields` | `'basic'` |

#### Returns

`Promise`<`AuthToken`\>

#### Defined in

[packages/client/src/clients/auth.client.ts:153](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/auth.client.ts#L153)
