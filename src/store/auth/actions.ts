import { LOGIN, LOGOUT } from "./types";

export function loginWithKey(key: string) {
    return {
        type: LOGIN,
        key: key,
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}