import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import {store} from "./store/store";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/'
});

const client = new ApolloClient({
    cache,
    link
});

const render = function() {
    ReactDOM.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();


