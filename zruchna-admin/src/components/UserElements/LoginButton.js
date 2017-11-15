import React, { Component } from 'react';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
  login() {
    console.log('test');
  }
  render() {
    const text = this.props.text;
    return (
      <div>
        <button onClick={this.login}>{text}</button>
      </div>
    );
  }
}

export default LoginButton;
