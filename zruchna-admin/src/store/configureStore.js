import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

export default function configureStore(middleware) {
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware, createLogger, middleware)
        )
    );
  

    if (module.hot) {
        module.hot.accept('./reducers/index', () => {
            const nextRootReducer = require('./reducers');
            store.replaceRducer(nextRootReducer);
        });
    }
    return store;
}
