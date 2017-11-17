import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { sessionReducer } from 'redux-react-session';

import changeInput from './loginInput';
import fetchApp from './fetchReducer';
import login from './loginReducers';

const rootReducer = combineReducers({
  routing: routerReducer,
  fetchApp: fetchApp,
  loginInput: changeInput,
  login: login,
  session: sessionReducer
});

export default rootReducer;
