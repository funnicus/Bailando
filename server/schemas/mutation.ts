import { gql } from 'apollo-server';

export const typeDef = gql`
  type Token {
    value: String!
  }
  type Mutation {
    createUser(username: String!, password: String!, email: String!): User
    login(username: String!, password: String!): Token
    createComment(content: String!, event: ID!): Comment
    createEvent(name: String!, summary: String!, description: String!): Event
  }
`;