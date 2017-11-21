import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        // console.log(rest, 'rest')
        return rest.fetchApp.is_logged ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location }
            }}/>
        )
        
    }}/>
);

function mapStateToProps(state) {
    const { fetchApp } = state;
    return {
        fetchApp,
    };
}

export default connect(mapStateToProps)(PrivateRoute);