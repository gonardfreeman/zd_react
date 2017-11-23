import {
    FETCH_APP_REQUEST,
    FETCH_APP_SUCCESS,
    FETCH_APP_ERROR
} from '../../actions/fetching/fetchApp';

const defaultState = {
    user_id: null,
    is_fetching: false,
    error: null,
    last_visit: null,
    is_logged: false,
    redirectToReferrer: false,
};

export default function fetchApp(state = defaultState, action) {
    switch (action.type) {
    case FETCH_APP_REQUEST:
        return Object.assign({}, state, {
            is_fetching: true,
            is_logged: false
        });
    case FETCH_APP_SUCCESS:
        return Object.assign({}, state, {
            user_id: action.data.user_id,
            last_visit: action.data.last_visit,
            is_fetching: false,
            is_logged: action.data.is_logged,
            redirectToReferrer: true,
        });
    case FETCH_APP_ERROR:
        return Object.assign({}, state, {
            error: action.data,
            is_fetching: false,
            is_logged: false
        });
    default:
        return state;
    }
}
