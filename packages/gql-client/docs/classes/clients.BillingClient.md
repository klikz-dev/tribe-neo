[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / BillingClient

# Class: BillingClient

[clients](../modules/clients.md).BillingClient

## Table of contents

### Constructors

- [constructor](clients.BillingClient.md#constructor)

### Methods

- [details](clients.BillingClient.md#details)

## Constructors

### constructor

• **new BillingClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/billing.client.ts:8](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/billing.client.ts#L8)

## Methods

### details

▸ **details**(`accessToken?`): `Promise`<`BillingDetails`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessToken?` | `string` |

#### Returns

`Promise`<`BillingDetails`\>

#### Defined in

[packages/client/src/clients/billing.client.ts:12](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/billing.client.ts#L12)
