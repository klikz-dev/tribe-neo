import gql from 'graphql-tag'

export const clearNewDomainGQLMutation = () => gql`
  mutation ClearNewDomain {
    clearNewDomain {
      status
    }
  }
`

export const updateNewDomainGQLMutation = () => gql`
  mutation UpdateNewDomain($input: UpdateNewDomainInput!) {
    updateNewDomain(input: $input) {
      aaaarecordSuccess
      aaaarecords
      arecordSuccess
      arecords
      cnameSuccess
      cnames
      domain
      ns
      root
      success
      tribeARecords
      tribeCname
    }
  }
`

export const transferToNewDomainGQLMutation = () => gql`
  mutation TransferToNewDomain {
    transferToNewDomain {
      status
    }
  }
`

export const domainAvailabilityGQLQuery = () => gql`
  query DomainAvailability($input: DomainAvailabilityInput!) {
    domainAvailability(input: $input) {
      available
    }
  }
`

export const newDomainStatusGQLQuery = () => gql`
  query NewDomainStatus($domain: String!) {
    newDomainStatus(domain: $domain) {
      aaaarecordSuccess
      aaaarecords
      arecordSuccess
      arecords
      cnameSuccess
      cnames
      domain
      ns
      root
      success
      tribeARecords
      tribeCname
    }
  }
`
