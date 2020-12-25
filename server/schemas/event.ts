import {  gql } from 'apollo-server';

export const typeDef = gql`
  type Event {
    name: String!
    id: String!
    summary: String!
    description: String!
    comments: [String!]
    votes: Int!
    user: String!
  }
`;