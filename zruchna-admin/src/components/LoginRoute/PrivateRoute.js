import React from 'react';
import { Route, Redirect } from 'react-router';

export const PrivateRoute = ({component: Component, ...rest}) => (
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
)