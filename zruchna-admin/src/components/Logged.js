import React, { Component } from 'react';
import { connect } from 'react-redux';


class Logged extends Component {
    render() {
        const {user_name, last_visit} = this.props.fetchApp;
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