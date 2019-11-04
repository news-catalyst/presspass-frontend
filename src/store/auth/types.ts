export const LOGIN = "LOGIN";

export interface AuthState {
    loggedIn: boolean,
    key: string,
}

export interface LoginAction {
    type: typeof LOGIN;
    key: string;
}

export type AuthAction = LoginAction;