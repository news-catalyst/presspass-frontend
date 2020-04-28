import React from 'react';
import { AppProps } from '../store';
import { AuthProps } from '../store/auth/types';
import { ProtectedRoute } from '../common/routing';
import { OrganizationPage } from './OrganizationPage';
import { ManageOrganizationPage } from './ManageOrganizationPage';
import { OrganizationsList } from './OrganizationsList';
import { OrganizationCreatePage } from './OrganizationCreatePage';
import { InvitationPage } from '../invitation/InvitationPage';
import { InvitePage } from '../invitation/InvitePage';
import { RequestInvitePage } from '../invitation/RequestInvitePage';
import Container from "../common/Container";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/organizations" {...authProps}>
      <Container>
        <OrganizationsList
          actions={props.actions}
          archie={props.archie}
          invitations={props.invitations}
          memberships={props.memberships}
          organizations={props.organizations}
          users={props.users}
        />
      </Container>
    </ProtectedRoute>,
    <ProtectedRoute
      exact
      path="/organizations/create"
      render={routeProps => (
        <Container>
          <OrganizationCreatePage {...props} />
        </Container>
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id"
      render={routeProps => (
        <Container>
          <OrganizationPage
            {...props}
            organization={routeProps.match.params.id}
          />
        </Container>
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id/manage"
      render={routeProps => (
        <Container>
          <ManageOrganizationPage
            {...props}
            plans={props.plans}
            organization={routeProps.match.params.id}
          />
        </Container>
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id/invitation"
      render={routeProps => (
        <Container>
          <InvitationPage {...props} id={routeProps.match.params.id} />
        </Container>
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id/invite"
      render={routeProps => (
        <Container>
          <InvitePage {...props} organization={routeProps.match.params.id} />
        </Container>
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id/request"
      render={routeProps => (
        <Container>
          <RequestInvitePage
            {...props}
            organization={routeProps.match.params.id}
          />
        </Container>
      )}
      {...authProps}
    />
  ];
  return routes;
};
