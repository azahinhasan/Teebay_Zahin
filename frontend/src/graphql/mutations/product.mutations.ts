import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductDto!) {
    createProduct(input: $input) {
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

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Float!, $input: UpdateProductDto!) {
    updateProduct(id: $id, input: $input) {
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

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
      message
    }
  }
`;

export const VIEW_PRODUCT = gql`
  mutation ViewProduct($id: Float!) {
    viewProduct(id: $id) {
      success
      message
      id
      name
      totalViews
    }
  }
`;
