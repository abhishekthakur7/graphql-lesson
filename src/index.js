import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import {createHttpLink } from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';
import { resolvers, typeDefs } from './graphql/resolvers';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

const httpLink = createHttpLink({    //link to grapghql server
  uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

//write data to local storage cache when index.js loads
client.writeData({
  data: {
    cartHidden: true
  }
});

client.query({
  query: gql`
  {
    collections{
      id 
      title
      items {
        id
        name
      }
    }
  }
  `
}).then(res => console.log(res));

ReactDOM.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
