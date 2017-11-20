import fetch from 'isomorphic-fetch';
import { MAINSITE } from '../../config/config';

import { fetchSucces } from './fetchApp';

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_ERROR = 'FETCH_LOGIN_ERROR';

function loginRequest() {
    return {
        type: FETCH_LOGIN_REQUEST
    };
}

function fetchLoginSuccess() {
    return {
        type: FETCH_LOGIN_SUCCESS
    };
}

function fetchLoginError(error) {
    return {
        type: FETCH_LOGIN_ERROR,
        error
    };
}

function loginSucces() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(why) {
    return {
        type: LOGIN_FAILURE,
        why
    };
}

export function fetchLogin(data) {
    return dispatch => {
        dispatch(loginRequest());
        return fetch(`http://${MAINSITE}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(resp => {
                if (resp.status >= 400) return dispatch(fetchLoginError(resp));
                return resp.json();
            })
            .then(json => {
                dispatch(fetchLoginSuccess());
                if (json.status === 200) {
                    dispatch(loginSucces());
                    dispatch(fetchSucces(json));
                } else {
                    dispatch(loginError(json.status));
                }
            });
    };
}
