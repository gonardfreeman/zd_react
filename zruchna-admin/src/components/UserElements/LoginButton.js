import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLogin } from '../../actions/fetching/fetchLogged';


class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }
    async login() {
        const { login, password } = this.props.loginInput;
        let data = {
            login: !login ? '' : login,
            password: !password ? '' : password
        };
        try {
            await this.props.loginFn(data);
            this.props.history.push("/logged");
        } catch (e) {
            alert(e)
        }
        
    }
    render() {
        const { text, is_logged } = this.props;
        
        const result = login_data => {
            if (!login_data.error && !login_data.is_logged && !login_data.is_fetching && !is_logged) {
                return (
                    <div>
                        <button onClick={this.login}>{text}</button>
                    </div>
                )
            }
            if (login_data.is_fetching) {
                return (
                    <p>Loading...</p>
                )
            }
            if (login_data.error && !login_data.is_fetching) {
                return (
                    <div>
                        <button onClick={this.login}>{text}</button>
                        <p className="error">{login_data.error_msg}</p>
                    </div>
                )
            }
            if (is_logged || (login_data.is_logged && !login_data.is_fetching)) {
                return (
                    <div>
                        <p className="success">Login success</p>
                    </div>
                )
            }
        };
        return <div>{result(this.props.login)}</div>;
    }
}

function mapStateToProps(state) {
    const { loginInput, login, routing } = state;
    return {
        loginInput,
        login,
        routing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginFn: data => {
            dispatch(fetchLogin(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
