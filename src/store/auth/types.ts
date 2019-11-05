export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface AuthState {
    loggedIn: boolean,
    key: string,
}

export interface LoginAction {
    type: typeof LOGIN;
    key: string;
}

export interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthAction = LoginAction | LogoutAction;