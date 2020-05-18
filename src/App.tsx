// React/redux
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Local Redux store
import { State, AppProps } from './store';
import * as authActions from './store/auth/actions';
import * as clientActions from './store/clients/actions';
import * as emailActions from './store/emails/actions';
import * as entitlementActions from './store/entitlements/actions';
import * as organizationActions from './store/organizations/actions';
import * as invitationActions from './store/invitations/actions';
import * as membershipActions from './store/memberships/actions';
import * as planActions from './store/plans/actions';
import * as subscriptionActions from './store/subscriptions/actions';
import * as userActions from './store/users/actions';
import { AuthProps } from './store/auth/types';
import { forceCheckAuth } from './store/auth/api';
import { fetchSelfUser } from './store/users/api';

// Common
import Navbar from './common/Navbar';
import NotFound from './common/NotFound';
import HomePage from './common/HomePage';
import ToolbuilderPitch from './common/ToolbuilderPitch';

// Routes
import { getRoutes as authRoutes } from './auth/routing';
import { getRoutes as accountRoutes } from './account/routing';
import { getRoutes as entitlementsRoutes } from './entitlements/routing';
import { getRoutes as membershipsRoutes } from './membership/routing';
import { getRoutes as organizationsRoutes } from './organization/routing';

const App = (props: AppProps) => {
  useEffect(() => {
    if (document.location.pathname !== "/index.html" && document.location.pathname !== "/pitch") {
      forceCheckAuth(props.actions);
      fetchSelfUser(props.actions);
    }
  }, [props.actions]); // only run once

  const authProps = AuthProps(props);

  return (
    <Router>
      <Navbar
        {...authProps}
        actions={props.actions}
        archie={props.archie}
        user={props.users.self}
      />
      <Switch>
          {authRoutes(props).map(route => route)}
          {accountRoutes(props).map(route => route)}
          {entitlementsRoutes(props).map(route => route)}
          {membershipsRoutes(props).map(route => route)}
          {organizationsRoutes(props).map(route => route)}
        <Route path="/pitch">
          <ToolbuilderPitch archie={props.archie} />
        </Route>
        <Route path="/">
          <HomePage archie={props.archie}/>
        </Route>
        <Route path="/index.html">
          <HomePage archie={props.archie}/>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: State) => ({
  archie: state.archie,
  auth: state.auth,
  clients: state.clients,
  emails: state.emails,
  entitlements: state.entitlements,
  memberships: state.memberships,
  invitations: state.invitations,
  organizations: state.organizations,
  plans: state.plans,
  subscriptions: state.subscriptions,
  users: state.users
});

const mapDispatchToProps = (dispatch: any) => ({
  // TODO: assign type explicitly
  actions: bindActionCreators(
    Object.assign(
      {},
      authActions,
      clientActions,
      emailActions,
      entitlementActions,
      membershipActions,
      invitationActions,
      organizationActions,
      planActions,
      subscriptionActions,
      userActions
    ),
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
