import fetch from 'isomorphic-fetch';
import { sessionService } from 'redux-react-session';

import { MAINSITE } from '../../config/config';

export const FETCH_APP_REQUEST = 'FETCH_APP_REQUEST';
export const FETCH_APP_SUCCESS = 'FETCH_APP_SUCCESS';
export const FETCH_APP_ERROR = 'FETCH_APP_ERROR';

export function fetchRequest() {
  return {
    type: FETCH_APP_REQUEST
  };
}

export function fetchSucces(data) {
  return {
    type: FETCH_APP_SUCCESS,
    data
  };
}

function fetchError(data) {
  return {
    type: FETCH_APP_ERROR,
    data
  };
}

export function fetchApp() {
  return dispath => {
    dispath(fetchRequest());
    return fetch(`http://${MAINSITE}/fetch`)
      .then(resp => {
        const { token } = resp;
        console.log(token);
        console.log(resp);
        if (resp.status >= 400) return dispath(fetchError(resp));
        return resp.json();
      })
      .then(json => {
        const { token } = resp;
        console.log(token);
        console.log(json);
        return dispath(fetchSucces(json));
      });
  };
}
