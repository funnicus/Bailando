import { gql } from 'apollo-server';

export const typeDef = gql`
  type Token {
    value: String!
  }
  type Mutation {
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`;