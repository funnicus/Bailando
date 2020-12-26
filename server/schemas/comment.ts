import { gql } from 'apollo-server';

export const typeDef = gql`
  type Comment {
    name: String!
    id: ID!
    summary: String!
    description: String!
    comments: [String!]
    votes: Int!
    user: String!
  }
`;