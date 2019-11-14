import React from "react";
import { ProtectedRoute } from "../common/routing";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import { Redirect } from "react-router";
import ClientsList from "./ClientsList";
import ClientPage from "./ClientPage";
import ClientEditPage from "./ClientEditPage";
import ClientCreatePage from "./ClientCreatePage";
import ClientDeletePage from "./ClientDeletePage";

export const ClientsRouter = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/" {...authProps}>
      <Redirect to="/clients" />
    </ProtectedRoute>,
    <ProtectedRoute exact path="/clients" {...authProps}>
      <ClientsList actions={props.actions} clients={props.clients} />
    </ProtectedRoute>,
    <ProtectedRoute exact path="/clients/create" {...authProps}>
      <ClientCreatePage actions={props.actions} />
    </ProtectedRoute>,
    <ProtectedRoute
      exact
      path="/clients/:client"
      render={routeProps => (
        <ClientPage {...props} client={routeProps.match.params.client} />
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/clients/:client/edit"
      render={routeProps => (
        <ClientEditPage {...props} client={routeProps.match.params.client} />
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/clients/:client/delete"
      render={routeProps => (
        <ClientDeletePage {...props} client={routeProps.match.params.client} />
      )}
      {...authProps}
    />
  ];
  return routes;
};
