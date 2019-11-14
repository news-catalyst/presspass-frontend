import React from "react";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import { ProtectedRoute } from "../common/routing";
import { AccountEditPage } from "./AccountEditPage";

export const AccountRouter = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/account" {...authProps}>
      <AccountEditPage actions={props.actions} />
    </ProtectedRoute>
  ];
  return routes;
};
