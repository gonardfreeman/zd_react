import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

// import client from '../../apolloClient'

const rootReducer = combineReducers({
    routing: routerReducer,
    // apollo: client.reducer()
})

export default rootReducer