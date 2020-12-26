import { gql } from '@apollo/client'

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!){
    createUser (
      username: $username,
      password: $password
    ) {
      username
      id
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`