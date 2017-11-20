import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        props.fetchApp.is_logged ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location }
            }}/>
        )
    )}/>
);

export default PrivateRoute;