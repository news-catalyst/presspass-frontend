import React from "react";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import { ProtectedRoute } from "../common/routing";
import { ChangePassword } from "./ChangePassword";
import { ProfilePage } from "./ProfilePage";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/account" {...authProps}>
      <ChangePassword actions={props.actions} />
    </ProtectedRoute>,
    <ProtectedRoute exact path="/profile" {...authProps}>
      <ProfilePage {...props} />
    </ProtectedRoute>
  ];
  return routes;
};
