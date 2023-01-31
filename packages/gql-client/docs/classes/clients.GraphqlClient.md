[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / GraphqlClient

# Class: GraphqlClient

[clients](../modules/clients.md).GraphqlClient

## Hierarchy

- `BaseGraphQLClient`

  ↳ **`GraphqlClient`**

## Table of contents

### Constructors

- [constructor](clients.GraphqlClient.md#constructor)

### Methods

- [authorizedRequest](clients.GraphqlClient.md#authorizedrequest)
- [batchRequests](clients.GraphqlClient.md#batchrequests)
- [rawRequest](clients.GraphqlClient.md#rawrequest)
- [request](clients.GraphqlClient.md#request)
- [setEndpoint](clients.GraphqlClient.md#setendpoint)
- [setHeader](clients.GraphqlClient.md#setheader)
- [setHeaders](clients.GraphqlClient.md#setheaders)
- [setToken](clients.GraphqlClient.md#settoken)

## Constructors

### constructor

• **new GraphqlClient**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`TribeClientOptions`](../modules/clients.md#tribeclientoptions) |

#### Overrides

BaseGraphQLClient.constructor

#### Defined in

[packages/client/src/clients/graphql.client.ts:69](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/graphql.client.ts#L69)

## Methods

### authorizedRequest

▸ **authorizedRequest**<`T`\>(`options`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `RequestOptions` |

#### Returns

`Promise`<`T`\>

#### Defined in

[packages/client/src/clients/graphql.client.ts:95](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/graphql.client.ts#L95)

___

### batchRequests

▸ **batchRequests**<`T`, `V`\>(`documents`, `requestHeaders?`): `Promise`<`T`\>

Send a GraphQL document to the server.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` = `any` |
| `V` | `Variables` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `documents` | `BatchRequestDocument`<`V`\>[] |
| `requestHeaders?` | `HeadersInit` |

#### Returns

`Promise`<`T`\>

#### Inherited from

BaseGraphQLClient.batchRequests

#### Defined in

node_modules/graphql-request/dist/index.d.ts:24

___

### rawRequest

▸ **rawRequest**<`T`, `V`\>(`query`, `variables?`, `requestHeaders?`): `Promise`<{ `data`: `T` ; `extensions?`: `any` ; `headers`: `Headers` ; `status`: `number`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `V` | `Variables` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `variables?` | `V` |
| `requestHeaders?` | `HeadersInit` |

#### Returns

`Promise`<{ `data`: `T` ; `extensions?`: `any` ; `headers`: `Headers` ; `status`: `number`  }\>

#### Inherited from

BaseGraphQLClient.rawRequest

#### Defined in

node_modules/graphql-request/dist/index.d.ts:11

___

### request

▸ **request**<`T`, `V`\>(`document`, `variables?`, `requestHeaders?`): `Promise`<`T`\>

Send a GraphQL document to the server.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `V` | `Variables` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `RequestDocument` |
| `variables?` | `V` |
| `requestHeaders?` | `HeadersInit` |

#### Returns

`Promise`<`T`\>

#### Inherited from

BaseGraphQLClient.request

#### Defined in

node_modules/graphql-request/dist/index.d.ts:20

___

### setEndpoint

▸ **setEndpoint**(`value`): `GraphQLClient`

Change the client endpoint. All subsequent requests will send to this endpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`GraphQLClient`

#### Inherited from

BaseGraphQLClient.setEndpoint

#### Defined in

node_modules/graphql-request/dist/index.d.ts:33

___

### setHeader

▸ **setHeader**(`key`, `value`): `GraphQLClient`

Attach a header to the client. All subsequent requests will have this header.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`GraphQLClient`

#### Inherited from

BaseGraphQLClient.setHeader

#### Defined in

node_modules/graphql-request/dist/index.d.ts:29

___

### setHeaders

▸ **setHeaders**(`headers`): `GraphQLClient`

#### Parameters

| Name | Type |
| :------ | :------ |
| `headers` | `HeadersInit` |

#### Returns

`GraphQLClient`

#### Inherited from

BaseGraphQLClient.setHeaders

#### Defined in

node_modules/graphql-request/dist/index.d.ts:25

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

[packages/client/src/clients/graphql.client.ts:126](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/graphql.client.ts#L126)
