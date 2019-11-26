import React from "react";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import { ProtectedRoute } from "../common/routing";
import { ChangePassword } from "./ChangePassword";
import { ProfilePage } from "./ProfilePage";
import { ManageProfile } from "./ManageProfile";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/profile/change-password" {...authProps}>
      <ChangePassword actions={props.actions} />
    </ProtectedRoute>,
    <ProtectedRoute exact path="/profile" {...authProps}>
      <ProfilePage {...props} />
    </ProtectedRoute>,
    <ProtectedRoute exact path="/profile/manage" {...authProps}>
      <ManageProfile actions={props.actions} users={props.users} />
    </ProtectedRoute>
  ];
  return routes;
};
