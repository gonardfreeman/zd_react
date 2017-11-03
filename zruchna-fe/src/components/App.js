import React, { Component } from 'react';
// import {Helmet} from "react-helmet";
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import { ConnectedRouter,routerMiddleware } from 'react-router-redux/es';
import createHistory from 'history/createBrowserHistory';

import client from '../apolloClient'
import configureStore from '../store/configureStore';

import WithData from './WithData'
import SecondView from './SecondView'

const history = createHistory();
const middleware = routerMiddleware(history);
const store = configureStore(middleware);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={WithData} />
            <Route path="/test" component={SecondView} />
          </div>
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
