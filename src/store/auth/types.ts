import { AppProps } from "..";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface AuthState {
  loggedIn: boolean;
}

export interface LoginAction {
  type: typeof LOGIN;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthAction = LoginAction | LogoutAction;

export const AuthProps = (props: AppProps) => ({
  isAuthenticated: props.auth.loggedIn,
  loginPath: "/login"
});
