import { gql } from 'apollo-server';

export const typeDef = gql`
  type Query {
    _empty: String
    eventCount: Int!
    allEvents(name: String, id: String): [Event!]!
  }
`;