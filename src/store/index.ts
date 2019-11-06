import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from 'redux-thunk';
import { authReducers } from './auth/reducers';
import { AuthState } from "./auth/types";
import { clientReducers } from "./clients/reducers";
import { ClientState } from "./clients/types";
import { login, logout } from "./auth/actions";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
    auth: authReducers,
    clients: clientReducers,
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
    login: typeof login;
    logout: typeof logout;
}

export interface AppProps {
    auth: AuthState;
    actions: AppActions;
    clients: ClientState;
  }

export default configureStore;
