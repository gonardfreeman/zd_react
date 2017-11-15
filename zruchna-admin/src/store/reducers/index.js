import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import changeInput from './loginInput';

const rootReducer = combineReducers({
  routing: routerReducer,
  loginInput: changeInput
});

export default rootReducer;
