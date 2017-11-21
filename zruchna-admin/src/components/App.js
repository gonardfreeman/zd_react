import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux/es';
import createHistory from 'history/createBrowserHistory';

import MainPage from './Pages/MainPage';
import Logged from './Logged';
import Users from './Users';
import PrivateRoute from './LoginRoute/PrivateRoute';

import '../styles/pages/App.css';


import client from '../apolloClient';
import configureStore from '../store/configureStore';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = configureStore(middleware);


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <ConnectedRouter history={history}>
                        <div className="wrapper">
                            <Route exact path="/" component={MainPage} />
                            <PrivateRoute path="/logged" component={Logged}/>
                            <PrivateRoute path="/users" component={Users}/>
                        </div>
                    </ConnectedRouter>
                </ApolloProvider>
            </Provider>
        );
    }
}

export default App;
