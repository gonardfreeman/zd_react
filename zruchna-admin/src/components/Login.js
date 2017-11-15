import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from './UserElements/Input';
import LoginButton from './UserElements/LoginButton';

import '../styles/pages/login.css';

class Login extends Component {
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
    const { logged, name } = this.props;
    return (
      <div className="login_form">
        <h1 className="login_header">
          Welcome, {logged ? name : 'stranger'} to ZRUCHNA!
        </h1>
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
  const { loginInput } = state;
  return {
    loginInput
  };
}

export default connect(mapStateToProps)(Login);
