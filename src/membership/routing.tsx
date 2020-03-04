import React from 'react';
import { AppProps } from '../store';
import { AuthProps } from '../store/auth/types';
import { ProtectedRoute } from '../common/routing';
import { MembershipsList } from './MembershipsList';

export const getRoutes = (props: AppProps) => {
  const authProps = AuthProps(props);
  const routes = [
    <ProtectedRoute exact path="/memberships" {...authProps}>
      <MembershipsList
        actions={props.actions}
        users={props.users}
        memberships={props.memberships}
      />
    </ProtectedRoute>
  ];
  return routes;
};
