// Redux & external redux libs
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

// Auth
import { login, logout } from "./auth/actions";
import { authReducers } from "./auth/reducers";
import { AuthState } from "./auth/types";

// Clients
import { upsertClient, upsertClients, deleteClient } from "./clients/actions";
import { clientReducers } from "./clients/reducers";
import { ClientState } from "./clients/types";

// Users
import { upsertSelfUser } from "./users/actions";
import { usersReducers } from "./users/reducers";
import { UsersState } from "./users/types";



const reducers = combineReducers({
  auth: authReducers,
  clients: clientReducers,
  users: usersReducers
});

export type State = ReturnType<typeof reducers>;

function configureStore() {
  const middleware = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleware);
  const store = createStore(reducers, composeWithDevTools(middlewareEnhancer));
  return store;
}

export interface AppActions {
  login: typeof login;
  logout: typeof logout;
  upsertClient: typeof upsertClient;
  upsertClients: typeof upsertClients;
  deleteClient: typeof deleteClient;
  upsertSelfUser: typeof upsertSelfUser;
}

export interface AppProps {
  auth: AuthState;
  actions: AppActions;
  clients: ClientState;
  users: UsersState;
}

export default configureStore;
