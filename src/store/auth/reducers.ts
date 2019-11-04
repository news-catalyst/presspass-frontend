import { AuthAction, LOGIN, AuthState } from "./types";

const initialState: AuthState = {
    loggedIn: false,
    key: "",
}

export function authReducers(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, { auth: { loggedIn: true, token: action.payload } })
        default: return state
    }
}