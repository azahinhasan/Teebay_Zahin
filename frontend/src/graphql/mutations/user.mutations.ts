import { gql } from "@apollo/client";

// Query: Find User by ID
export const FIND_USER_BY_ID = gql`
  query FindUserById($input: FindUserByIdInput!) {
    findUserById(input: $input) {
      success
      message
      id
      name
      email
    }
  }
`;

// Mutation: Create User
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      message
      id
      name
      email
    }
  }
`;

// Mutation: Update User
export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
      message
      id
      name
      email
    }
  }
`;

// Mutation: Delete User
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
      message
      id
      name
      email
    }
  }
`;
