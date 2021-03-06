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
import Container from "../common/Container";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <Route path="/login">
      <Container>
        <LoginPage actions={props.actions} auth={props.auth} />
      </Container>
    </Route>,
    <Route path="/logout">
      <Container>
        <LogoutPage actions={props.actions} />
      </Container>
    </Route>,
    <Route path="/register">
      <Container>
        <RegisterPage actions={props.actions} archie={props.archie} />
      </Container>
    </Route>,
    <Route exact path="/resetpassword">
      <Container>
        <PasswordResetPage actions={props.actions} />
      </Container>
    </Route>,
    <Route
      exact
      path="/resetpassword/submit/:uid/:token"
      render={routeProps => (
        <Container>
          <PasswordResetSubmitPage
            actions={props.actions}
            uid={routeProps.match.params.uid}
            token={routeProps.match.params.token}
          />
        </Container>
      )}
      {...authProps}
    />
  ];
  return routes;
};
