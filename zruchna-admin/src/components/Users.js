import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Users extends Component {
    render() {
        const {is_logged} = this.props.fetchApp;
        
        if (!is_logged) {
            return <Redirect to={{
                pathname: "/",
                state: {from: this.props.location}
            }}/>
        }
        return <h1>List of users</h1>
    }
}

function mapStateToProps(state) {
    const { fetchApp } = state;
    return {
        fetchApp
    };
}

export default connect(mapStateToProps)(Users);