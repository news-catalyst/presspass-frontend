import React from "react";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import { ProtectedRoute } from "../common/routing";
import { OrganizationPage } from "./OrganizationPage";
import { ManageOrganizationPage } from "./ManageOrganizationPage";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute
      exact
      path="/organizations/:id"
      render={routeProps => (
        <OrganizationPage {...props} id={routeProps.match.params.id} />
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id/manage"
      render={routeProps => (
        <ManageOrganizationPage {...props} id={routeProps.match.params.id} />
      )}
      {...authProps}
    />,
  ];
  return routes;
};
