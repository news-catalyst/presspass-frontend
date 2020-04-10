import React from "react";
import { ProtectedRoute } from "../common/routing";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import ClientsList from "./ClientsList";
import ClientPage from "./ClientPage";
import ClientEditPage from "./ClientEditPage";
import ClientCreatePage from "./ClientCreatePage";
import ClientDeletePage from "./ClientDeletePage";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/clients" {...authProps}>
      <ClientsList actions={props.actions} archie={props.archie} clients={props.clients} />
    </ProtectedRoute>,
    <ProtectedRoute exact path="/clients/create" {...authProps}>
      <ClientCreatePage actions={props.actions} archie={props.archie} />
    </ProtectedRoute>,
    <ProtectedRoute
      exact
      path="/clients/:client"
      render={routeProps => (
        <ClientPage {...props} client={routeProps.match.params.client} archie={props.archie} />
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/clients/:client/edit"
      render={routeProps => (
        <ClientEditPage {...props} client={routeProps.match.params.client} archie={props.archie} />
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/clients/:client/delete"
      render={routeProps => (
        <ClientDeletePage {...props} client={routeProps.match.params.client} archie={props.archie} />
      )}
      {...authProps}
    />
  ];
  return routes;
};
