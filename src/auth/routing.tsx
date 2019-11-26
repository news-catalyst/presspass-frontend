import React from "react";
import { Route } from "react-router";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import RegisterPage from "./RegisterPage";
import {
  PasswordResetPage,
  PasswordResetSubmitPage
} from "./PasswordResetPages";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <Route path="/login">
      <LoginPage actions={props.actions} auth={props.auth} />
    </Route>,
    <Route path="/logout">
      <LogoutPage actions={props.actions} />
    </Route>,
    <Route path="/register">
      <RegisterPage actions={props.actions} />
    </Route>,
    <Route exact path="/resetpassword">
      <PasswordResetPage actions={props.actions} />
    </Route>,
    <Route
      exact
      path="/resetpassword/submit/:uid/:token"
      render={routeProps => (
        <PasswordResetSubmitPage
          actions={props.actions}
          uid={routeProps.match.params.uid}
          token={routeProps.match.params.token}
        />
      )}
      {...authProps}
    />
  ];
  return routes;
};