import { gql } from 'apollo-server';

export const typeDef = gql`
  type User {
    username: String!
    id: ID!
  }
`;