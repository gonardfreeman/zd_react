import fetch from 'isomorphic-fetch';
import MAINSITE from '../../config/config';

export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_ERROR = 'FETCH_LOGIN_ERROR';

export function loginRequest() {
  return {
    type: FETCH_LOGIN_REQUEST
  };
}

export function isLogged(logged) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    logged
  };
}

export function fetchLogin(data) {
  return dispatch => {
    dispatch(loginRequest());
    return fetch(`http://${MAINSITE}/login`, { method: 'POST', body: data })
      .then(resp => resp.json())
      .then(json => dispatch(isLogged(json.logged)));
  };
}
