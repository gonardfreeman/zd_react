import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import changeInput from './loginInput';
import fetchApp from './fetchReducer';
import login from './loginReducers';
import userInfoInputReducer from './userInfoReduers';

const rootReducer = combineReducers({
    routing: routerReducer,
    fetchApp: fetchApp,
    loginInput: changeInput,
    login: login,
    input: userInfoInputReducer,
});

export default rootReducer;
