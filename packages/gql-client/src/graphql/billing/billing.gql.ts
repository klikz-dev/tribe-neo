import gql from 'graphql-tag'

export const billingGQLQuery = () => gql`
  query BillingDetails {
    billingDetails {
      address {
        city
        country
        postalCode
        state
        streetAddress
      }
      billingEmail
      card {
        expirationMonth
        expirationYear
        lastFourDigits
        updatedAt
      }
      companyName
      vat {
        text
        vatId
        vatType
      }
    }
  }
`
