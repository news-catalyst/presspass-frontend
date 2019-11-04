import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from 'redux-thunk';
import { authReducers } from './auth/reducers';

const reducers = combineReducers({
    auth: authReducers,
});

export type State = ReturnType<typeof reducers>;

function configureStore() {
    const middleware = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middleware);
    const store = createStore(reducers, compose(
        middlewareEnhancer
    ));
    return store;
}

export default configureStore;