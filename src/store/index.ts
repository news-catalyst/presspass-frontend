import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from 'redux-thunk';
import { authReducers } from './auth/reducers';
import { AuthState } from "./auth/types";
import { loginWithKey } from "./auth/actions";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
    auth: authReducers,
});

export type State = ReturnType<typeof reducers>;

function configureStore() {
    const middleware = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middleware);
    const store = createStore(reducers, composeWithDevTools(
        middlewareEnhancer
    ));
    return store;
}

export interface AppActions {
    loginWithKey: typeof loginWithKey;
}

export interface AppProps {
    auth: AuthState;
    actions: AppActions;
  }

export default configureStore;