import { AuthAction, LOGIN, AuthState } from "./types";
import Cookies from "js-cookie";

const initialState: AuthState = (Cookies.get("authToken") !== undefined ) ? {
    loggedIn: true,
    key: Cookies.get("authToken")!,
} : {
    loggedIn: false,
    key: "",
}

export function authReducers(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case LOGIN:
            {
                const expirationDate = new Date();
                expirationDate.setFullYear(expirationDate.getFullYear() + 1);
                Cookies.set("authToken", action.key, {
                    expires: expirationDate
                });
                return Object.assign({}, state, { loggedIn: true, key: action.key });
            }
        default: return state
    }
}