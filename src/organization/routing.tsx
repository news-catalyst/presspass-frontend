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

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/organizations" {...authProps}>
      <OrganizationsList
        actions={props.actions}
        archie={props.archie}
        invitations={props.invitations}
        memberships={props.memberships}
        organizations={props.organizations}
        users={props.users}
      />
    </ProtectedRoute>,
    <ProtectedRoute
      exact
      path="/organizations/create"
      render={routeProps => <OrganizationCreatePage {...props} />}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id"
      render={routeProps => (
        <OrganizationPage
          {...props}
          organization={routeProps.match.params.id}
        />
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id/manage"
      render={routeProps => (
        <ManageOrganizationPage
          {...props}
          plans={props.plans}
          organization={routeProps.match.params.id}
        />
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id/invitation"
      render={routeProps => (
        <InvitationPage {...props} id={routeProps.match.params.id} />
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id/invite"
      render={routeProps => (
        <InvitePage {...props} organization={routeProps.match.params.id} />
      )}
      {...authProps}
    />,
    <ProtectedRoute
      exact
      path="/organizations/:id/request"
      render={routeProps => (
        <RequestInvitePage
          {...props}
          organization={routeProps.match.params.id}
        />
      )}
      {...authProps}
    />
  ];
  return routes;
};
