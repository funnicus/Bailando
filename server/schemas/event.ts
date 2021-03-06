import { gql } from 'apollo-server';

export const typeDef = gql`
  type Event {
    user: ID!
    name: String!
    summary: String!
    description: String!
    comments: [Comment!]
    votes: Int!
    date: String!
    id: ID!
  }
`;