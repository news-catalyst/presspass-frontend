import React from "react";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import { ProtectedRoute } from "../common/routing";
import EntitlementsList from "./EntitlementsList";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/entitlements" {...authProps}>
      <EntitlementsList actions={props.actions} archie={props.archie} entitlements={props.entitlements} />
    </ProtectedRoute>
  ];
  return routes;
};
