import { gql } from 'apollo-server';

export const typeDef = gql`
  type User {
    username: String!
    email: String!
    comments: [Comment!]
    events: [Event!]
    id: ID!
  }
`;