import React from 'react';
import { AppProps } from '../store';
import { AuthProps } from '../store/auth/types';
import { ProtectedRoute } from '../common/routing';
import { MembershipsList } from './MembershipsList';
import Container from "../common/Container";

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/memberships" {...authProps}>
      <Container>
        <MembershipsList
          actions={props.actions}
          archie={props.archie}
          users={props.users}
          memberships={props.memberships}
        />
      </Container>
    </ProtectedRoute>
  ];
  return routes;
};
