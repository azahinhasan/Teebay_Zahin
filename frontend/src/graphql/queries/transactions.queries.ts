import { gql } from "@apollo/client";

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions {
    getUserTransactions {
      success
      message
      borrowed {
        id
        transactionDate
        rentalDateStart
        rentalDateEnd
        transactionType
        product {
          id
          name
          price
          rentPrice
          description
          categories {
            name
          }
        }
      }
      lent {
        id
        transactionDate
        rentalDateStart
        rentalDateEnd
        transactionType
        product {
          id
          name
          price
          rentPrice
          description
          categories {
            name
          }
        }
      }
      sold {
        id
        transactionDate
        rentalDateStart
        rentalDateEnd
        transactionType
        product {
          id
          name
          price
          rentPrice
          description
          categories {
            name
          }
        }
      }
      bought {
        id
        transactionDate
        rentalDateStart
        rentalDateEnd
        transactionType
        product {
          id
          name
          price
          rentPrice
          description
          categories {
            name
          }
        }
      }
    }
  }
`;
