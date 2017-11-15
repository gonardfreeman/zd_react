import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  loginInputChange,
  passwordInputChange
} from '../../actions/loginActions';

import '../../styles/elements/Inputs.css';

class Input extends Component {
  render() {
    const { placeholder, type } = this.props.opts;
    const { onLoginChange, onPasswordChange } = this.props;
    return (
      <div>
        <input
          className="login_input"
          type={type}
          onChange={type === 'password' ? onPasswordChange : onLoginChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoginChange: login => {
      dispatch(loginInputChange(login.currentTarget.value));
    },
    onPasswordChange: pwd => {
      dispatch(passwordInputChange(pwd.currentTarget.value));
    }
  };
}

export default connect(null, mapDispatchToProps)(Input);
