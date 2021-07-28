import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Auth from './reducers/AuthReducer';

export const ConfigStore = () => {
    const store = createStore(
        //Reducers Here
        combineReducers({ 
            Auth : Auth
        }),
        applyMiddleware(thunk)
    )

    return store;
}