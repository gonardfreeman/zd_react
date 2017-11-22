import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Input from '../UserElements/Input';
import LoginButton from '../UserElements/LoginButton';

import { fetchApp } from '../../actions/fetching/fetchApp';

import '../../styles/pages/login.css';
import '../../styles/errors/iternal.css';

class MainPage extends Component {
    componentWillMount(){
        this.props.fetchAppRequest()
    }
    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.props.fetchApp;
        const { user_name, is_fetching, error, is_logged } = this.props.fetchApp;
        // TODO redirect from / if logged
        if (redirectToReferrer && is_logged) {
            return (
                <Redirect to={from}/>
            )
        }
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
        
        if (is_logged && !is_fetching) {
            return (
                <Redirect to={{
                    pathname: "/logged",
                    state: {from: this.props.location}
                }}/>
            )
        }
        if (is_fetching) {
            return (
                <p>Loading...</p>
            )
        }
        if (!!error && !is_fetching) {
            return (
                <div className="iternal_error">
                    <h1>Whoops random error appeared :(</h1>
                    <p><span className="error_status">{error.status} </span> - {error.statusText}</p>
                </div>
            )
        }
        return (
            <div>
                <Link to="/" className="absolute_home">Home</Link>
                <div className="title">
                    <h1>Hello {is_logged ? user_name : "stranger"}</h1>
                </div>
                <div className="loginForm">
                    <Input opts={inputs.login}/>
                    <Input opts={inputs.password}/>
                    <LoginButton text="Login Button" />
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);