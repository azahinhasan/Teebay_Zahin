import { gql } from '@apollo/client';

// Mutation: Buy Product
export const BUY_PRODUCT = gql`
  mutation BuyProduct($data: BuyProductInput!) {
    buyProduct(data: $data) {
      success
      message
      id
      transactionDate
      transactionType
      product {
        id
        name
        price
      }
    }
  }
`;

// Mutation: Rent Product
export const RENT_PRODUCT = gql`
  mutation RentProduct($data: RentProductInput!) {
    rentProduct(data: $data) {
      success
      message
      id
      transactionDate
      rentalDateStart
      rentalDateEnd
      transactionType
      product {
        id
        name
        rentPrice
      }
    }
  }
`;