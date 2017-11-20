import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Logged extends Component {
    render() {
        const {user_name, last_visit, is_logged} = this.props.fetchApp;
        if (!is_logged) {
            return <Redirect to={{
                pathname: "/",
                state: {from: this.props.location}
            }}/>
        }
        return (
            <div>
                <div className="title">
                    <h1>Hello {user_name}</h1>
                </div>
                <div className="body">
                    <p>Your last visit was at: {last_visit}</p>
                </div>
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    const { fetchApp } = state;
    return {
        fetchApp
    };
}

export default connect(mapStateToProps)(Logged);