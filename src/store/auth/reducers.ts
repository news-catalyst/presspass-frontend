import { AuthAction, LOGIN, LOGOUT, AuthState } from "./types";
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
        case LOGOUT:
            {
                Cookies.remove("authToken");
                // TODO: make call to server to invalidate token (for security; this is important)
                return Object.assign({}, state, { loggedIn: false, key: "" });
            }
        default: return state
    }
}