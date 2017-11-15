import {
  LOGIN_INPUT_CHANGE,
  PASSWORD_INPUT_CHANGE
} from '../../actions/loginActions';

const defaultState = {
  login: null,
  password: null
};

export default function changeInput(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_INPUT_CHANGE:
      return Object.assign({}, state, {
        login: action.login
      });
    case PASSWORD_INPUT_CHANGE:
      return Object.assign({}, state, {
        password: action.pwd
      });
    default:
      return state;
  }
}
