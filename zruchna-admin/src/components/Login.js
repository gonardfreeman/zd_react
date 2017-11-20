import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from './UserElements/Input';
import LoginButton from './UserElements/LoginButton';

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
        const { user_name, is_fetching, error, last_visit } = this.props.fetchApp;
        const last_visit_el = last_visit => {
            if (!last_visit) {
                return <p>We can't indetify you :(</p>;
            } else {
                return (
                    <p className="last_visit">
            Your last visit was{' '}
                        <span>{!last_visit ? 'long time ago' : last_visit}</span>
                    </p>
                );
            }
        };
        if (!error && is_fetching) {
            return <h1>Loading...</h1>;
        }
        if (error && !is_fetching) {
            return (
                <div className="error">
                    <h1>Error, status {this.props.fetchApp.error.status}</h1>
                    <p>Error message: {this.props.fetchApp.error.statusText}</p>
                </div>
            );
        }
        return (
            <div className="login_form">
                <h1 className="login_header">
          Welcome, {!user_name ? 'stranger' : user_name} to admin-site of
          ZRUCHNA!
                </h1>
                {last_visit_el(last_visit)}

                <div className="form">
                    <Input opts={inputs.login} />
                    <Input opts={inputs.password} />
                    <LoginButton text="Login" />
                </div>
            </div>
        );
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
