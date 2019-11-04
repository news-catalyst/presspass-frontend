export const LOGIN = "LOGIN";

export interface AuthState {
    loggedIn: boolean,
    key: string,
}

export interface LoginAction {
    type: typeof LOGIN;
    payload: string;
}

export type AuthAction = LoginAction;