import React from "react";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import { ProtectedRoute } from "../common/routing";
import { ManageEmail } from "./ManageEmail";
import { ChangePassword } from "./ChangePassword";
import { ProfilePage } from "./ProfilePage";
import { ManageProfile } from "./ManageProfile";
import { WelcomePage } from "./WelcomePage";
import Container from "../common/Container";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/profile/change-password" {...authProps}>
      <Container>
        <ChangePassword actions={props.actions} archie={props.archie} />
      </Container>
    </ProtectedRoute>,
    <ProtectedRoute exact path="/profile/manage-email" {...authProps}>
      <Container>
        <ManageEmail actions={props.actions} archie={props.archie} emails={props.emails} />
      </Container>
    </ProtectedRoute>,
    <ProtectedRoute exact path="/profile" {...authProps}>
      <Container>
        <ProfilePage {...props} />
      </Container>
    </ProtectedRoute>,
    <ProtectedRoute exact path="/profile/manage" {...authProps}>
      <Container>
        <ManageProfile actions={props.actions} archie={props.archie} users={props.users} />
      </Container>
    </ProtectedRoute>,
    <ProtectedRoute
      exact
      path="/profile/welcome/:key" {...authProps}
      render={routeProps => (
        <Container>
          <WelcomePage
            actions={props.actions}
            archie={props.archie}
            users={props.users}
            email_key={routeProps.match.params.key}
          />
        </Container>
      )}
      { ...authProps }
    >
    </ProtectedRoute>
  ];
  return routes;
};
