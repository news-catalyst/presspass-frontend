import React from "react";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import { ProtectedRoute } from "../common/routing";
import EntitlementsList from "./EntitlementsList";
import Container from "../common/Container";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/entitlements" {...authProps}>
      <Container>
        <EntitlementsList actions={props.actions} archie={props.archie} entitlements={props.entitlements} />
      </Container>
    </ProtectedRoute>
  ];
  return routes;
};
