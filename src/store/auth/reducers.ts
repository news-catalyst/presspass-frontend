import { AuthAction, LOGIN, AuthState } from "./types";

const initialState: AuthState = {
    loggedIn: false,
    key: "",
}

export function authReducers(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, { loggedIn: true, key: action.key })
        default: return state
    }
}