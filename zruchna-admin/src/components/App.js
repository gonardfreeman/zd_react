import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux/es';
import createHistory from 'history/createBrowserHistory';

import MainPage from './Pages/MainPage';
import Logged from './Pages/Logged';
import Users from './Pages/Users';
import User from './Pages/User';
import PrivateRoute from './CustomRoutes/PrivateRoute';

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
                            <PrivateRoute exact path="/users" component={Users}/>
                            <PrivateRoute path="/users/user/:id" component={User}/>
                        </div>
                    </ConnectedRouter>
                </ApolloProvider>
            </Provider>
        );
    }
}


export default App;
