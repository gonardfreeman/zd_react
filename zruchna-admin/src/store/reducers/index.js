import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import changeInput from './loginInput';
import fetchApp from './fetchReducer';
import login from './loginReducers';

const rootReducer = combineReducers({
    routing: routerReducer,
    fetchApp: fetchApp,
    loginInput: changeInput,
    login: login,
});

export default rootReducer;
