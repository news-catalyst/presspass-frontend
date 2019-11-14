import React from "react";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import { ProtectedRoute } from "../common/routing";
import { AccountEditPage } from "./AccountEditPage";
import { ProfilePage } from "./ProfilePage";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/account" {...authProps}>
      <AccountEditPage actions={props.actions} />
    </ProtectedRoute>,
    <ProtectedRoute exact path="/profile" {...authProps}>
      <ProfilePage {...props} />
    </ProtectedRoute>
  ];
  return routes;
};
