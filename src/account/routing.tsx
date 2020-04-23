import React from "react";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import { ProtectedRoute } from "../common/routing";
import { ManageEmail } from "./ManageEmail";
import { ChangePassword } from "./ChangePassword";
import { ProfilePage } from "./ProfilePage";
import { ManageProfile } from "./ManageProfile";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/profile/change-password" {...authProps}>
      <ChangePassword actions={props.actions} archie={props.archie} />
    </ProtectedRoute>,
    <ProtectedRoute exact path="/profile/manage-email" {...authProps}>
      <ManageEmail actions={props.actions} archie={props.archie} emails={props.emails} />
    </ProtectedRoute>,
    <ProtectedRoute exact path="/profile" {...authProps}>
      <ProfilePage {...props} />
    </ProtectedRoute>,
    <ProtectedRoute exact path="/profile/manage" {...authProps}>
      <ManageProfile actions={props.actions} archie={props.archie} users={props.users} />
    </ProtectedRoute>
  ];
  return routes;
};
