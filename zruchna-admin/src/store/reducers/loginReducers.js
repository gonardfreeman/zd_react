import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_ERROR,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from '../../actions/fetching/fetchLogged';

const default_state = {
  is_fetching: false,
  is_logged: false,
  error: null
};

export default function login(state = default_state, action) {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return Object.assign({}, state, {
        is_fetching: true
      });
    case FETCH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        is_fetching: false
      });
    case FETCH_LOGIN_ERROR:
      return Object.assign({}, state, {
        is_fetching: false,
        error: action.error
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        is_fetching: false,
        is_logged: false,
        error: action.why
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        is_fetching: false,
        is_logged: true
      });
    default:
      return state;
  }
}
