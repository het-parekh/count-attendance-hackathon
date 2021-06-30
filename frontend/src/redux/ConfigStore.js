import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigStore = () => {
    const store = createStore(
        //Reducers Here
        combineReducers({ 
        }),
        applyMiddleware(thunk, logger)
    )

    return store;
}