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

// Entitlements
import { upsertEntitlement, upsertEntitlements, deleteEntitlement } from "./entitlements/actions";
import { entitlementReducers } from "./entitlements/reducers";
import { EntitlementState } from "./entitlements/types";

// Users
import { upsertSelfUser } from "./users/actions";
import { usersReducers } from "./users/reducers";
import { UsersState } from "./users/types";



const reducers = combineReducers({
  auth: authReducers,
  clients: clientReducers,
  entitlements: entitlementReducers,
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
  upsertEntitlement: typeof upsertEntitlement;
  upsertEntitlements: typeof upsertEntitlements;
  deleteEntitlement: typeof deleteEntitlement;
  upsertSelfUser: typeof upsertSelfUser;
}

export interface AppProps {
  auth: AuthState;
  actions: AppActions;
  clients: ClientState;
  entitlements: EntitlementState;
  users: UsersState;
}

export default configureStore;
