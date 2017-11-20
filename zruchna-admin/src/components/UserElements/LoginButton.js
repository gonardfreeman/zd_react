import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLogin } from '../../actions/fetching/fetchLogged';
import login from '../../store/reducers/loginReducers';

class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }
    login() {
        const { login, password } = this.props.loginInput;
        let data = {
            login: !login ? '' : login,
            password: !password ? '' : password
        };
        this.props.loginFn(data);
    }
    render() {
        const { text } = this.props;
        console.log(this.props.login)
        const result = login_data => {
            if (!login_data.is_fetching && !login_data.error && !login.is_logged) {
                return (
                    <div>
                        <button onClick={this.login}>{text} Test</button>
                    </div>
                );
            }
            if (login_data.is_fetching) {
                return (
                    <div>
                        <p>Loading...</p>
                    </div>
                );
            }
            if (!login_data.is_logged && !!login_data.error) {
                return (
                    <div>
                        <button onClick={this.login}>{text}</button>
                        <p className="error">{login_data.error}</p>
                    </div>
                );
            }
        };
        return <div>{result(this.props.login)}</div>;
    }
}

function mapStateToProps(state) {
    const { loginInput, login } = state;
    return {
        loginInput,
        login
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
