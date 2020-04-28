import React from "react";
import { ProtectedRoute } from "../common/routing";
import { AppProps } from "../store";
import { AuthProps } from "../store/auth/types";
import ClientsList from "./ClientsList";
import ClientPage from "./ClientPage";
import ClientEditPage from "./ClientEditPage";
import ClientCreatePage from "./ClientCreatePage";
import ClientDeletePage from "./ClientDeletePage";
import Container from "../common/Container";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/clients" {...authProps}>
      <Container>
        <ClientsList actions={props.actions} archie={props.archie} clients={props.clients} />
      </Container>
    </ProtectedRoute>,
    <ProtectedRoute exact path="/clients/create" {...authProps}>
      <Container>
        <ClientCreatePage actions={props.actions} archie={props.archie} />
      </Container>
    </ProtectedRoute>,
    <ProtectedRoute
      exact
      path="/clients/:client"
      render={routeProps => (
        <Container>
          <ClientPage {...props} client={routeProps.match.params.client} archie={props.archie} />
        </Container>
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/clients/:client/edit"
      render={routeProps => (
        <Container>
          <ClientEditPage {...props} client={routeProps.match.params.client} archie={props.archie} />
        </Container>
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/clients/:client/delete"
      render={routeProps => (
        <Container>
          <ClientDeletePage {...props} client={routeProps.match.params.client} archie={props.archie} />
        </Container>
      )}
      {...authProps}
    />
  ];
  return routes;
};
