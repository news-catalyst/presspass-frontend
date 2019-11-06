import { AuthAction, LOGIN, LOGOUT, AuthState } from "./types";

const initialState: AuthState = {
    loggedIn: true
}

export function authReducers(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case LOGIN:
            {
                return Object.assign({}, state, { loggedIn: true });
            }
        case LOGOUT:
            {
                // TODO: make call to server to invalidate token (for security; this is important)
                return Object.assign({}, state, { loggedIn: false });
            }
        default: return state
    }
}
