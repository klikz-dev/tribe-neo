[@tribeplatform/gql-client](../README.md) / [Modules](../modules.md) / [clients](../modules/clients.md) / ReportClient

# Class: ReportClient

[clients](../modules/clients.md).ReportClient

## Table of contents

### Constructors

- [constructor](clients.ReportClient.md#constructor)

### Methods

- [get](clients.ReportClient.md#get)
- [getLeaderboard](clients.ReportClient.md#getleaderboard)

## Constructors

### constructor

• **new ReportClient**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`GraphqlClient`](clients.GraphqlClient.md) |

#### Defined in

[packages/client/src/clients/report.client.ts:10](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/report.client.ts#L10)

## Methods

### get

▸ **get**(`variables`, `fields?`, `accessToken?`): `Promise`<`Report`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryReportArgs` | `undefined` |
| `fields` | `ReportFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Report`\>

#### Defined in

[packages/client/src/clients/report.client.ts:14](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/report.client.ts#L14)

___

### getLeaderboard

▸ **getLeaderboard**(`variables`, `fields?`, `accessToken?`): `Promise`<`Member`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variables` | `QueryLeaderboardArgs` | `undefined` |
| `fields` | `MemberFields` | `'basic'` |
| `accessToken?` | `string` | `undefined` |

#### Returns

`Promise`<`Member`[]\>

#### Defined in

[packages/client/src/clients/report.client.ts:28](https://gitlab.com/tribeplatform/tribe-neo/-/blob/master/packages/client/src/clients/report.client.ts#L28)
