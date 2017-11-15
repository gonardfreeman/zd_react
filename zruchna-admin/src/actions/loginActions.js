export const LOGIN_INPUT_CHANGE = 'LOGIN_INPUT_CHANGE';
export const PASSWORD_INPUT_CHANGE = 'PASSWORD_INPUT_CHANGE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function loginInputChange(login) {
  return {
    type: LOGIN_INPUT_CHANGE,
    login
  };
}

export function passwordInputChange(pwd) {
  return {
    type: PASSWORD_INPUT_CHANGE,
    pwd
  };
}
