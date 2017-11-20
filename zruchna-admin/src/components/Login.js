import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from './UserElements/Input';
import LoginButton from './UserElements/LoginButton';

import Logged from './Logged'

import { fetchApp } from '../actions/fetching/fetchApp';

import '../styles/pages/login.css';

class Login extends Component {
    componentWillMount() {
        this.props.fetchAppRequest();
    }
    render() {
        const inputs = {
            login: {
                placeholder: 'Login',
                type: 'text'
            },
            password: {
                placeholder: 'Password',
                type: 'password'
            }
        };
        const { user_name, is_fetching, error, last_visit, is_logged } = this.props.fetchApp;
        return <p>Test</p>
    }
}

function mapStateToProps(state) {
    const { loginInput, fetchApp } = state;
    return {
        loginInput,
        fetchApp
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAppRequest: () => {
            dispatch(fetchApp());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
