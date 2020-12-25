import { gql } from 'apollo-server';

export const typeDef = gql`
  type Mutation {
    createUser: String!
    login: String! 
  }
`;