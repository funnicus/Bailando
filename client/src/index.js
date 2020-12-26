import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { setContext } from 'apollo-link-context'
import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
  split
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import './index.css';
import App from './App';

//creating a auth context for actions which require a logged in user
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('bailando-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        }
    }
})

//creating a http and websocket connections to the graphql server
//queries need the http link and subscriptions need the active websocket link
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true
    }
})

//split link is used to determine, which kind of connection is needed
//below the first parameter in split() is a function, which checks if we need to use the websocket-link for subscriptions
//otherwise we use the http-link with an auth context
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    authLink.concat(httpLink),
)

//let's create a new apollo client with a InMemoryCache and the split link
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
})

//making the client object accessable to all components with ApolloProvider wrapper
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
