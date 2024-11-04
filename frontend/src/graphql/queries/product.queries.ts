import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      success
      message
      list {
        id
        name
        description
        price
        rentPrice
        totalViews
        rentDuration
        status
        user {
          id
          name
          email
        }
        categories {
          id
          name
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: Float!) {
    getProduct(id: $id) {
      success
      message
      id
      name
      description
      price
      rentPrice
      totalViews
      rentDuration
      status
      user {
        id
        name
        email
      }
      categories {
        id
        name
      }
    }
  }
`;

export const GET_ALL_OWN_PRODUCTS = gql`
  query GetAllOwnProducts {
    getAllOwnProducts {
      success
      message
      list {
        id
        name
        description
        price
        rentPrice
        totalViews
        rentDuration
        status
        user {
          id
          name
          email
        }
        categories {
          id
          name
        }
      }
    }
  }
`;