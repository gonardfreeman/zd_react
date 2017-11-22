import {USER_INFO_INPUT_CHANGE} from '../../actions/inputFields/inputActions';

const defaultState = {
    value: null,
    type: null
}

export default function userInfoInputReducer(state=defaultState, action) {
    switch (action.type) {
    case USER_INFO_INPUT_CHANGE:
        return Object.assign({}, state, {
            value: action.input.value,
            type: action.input.id
        });
    default:
        return state;
    }
}