import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import {store, persistor} from "./store/store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'https://baked-backend-oyb42glamq-uc.a.run.app/'
});

const client = new ApolloClient({
    cache,
    link
});

const render = function() {
    ReactDOM.render(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </ApolloProvider>,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();


