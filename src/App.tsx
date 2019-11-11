import React, { useEffect } from 'react';
import Login from './auth/LoginPage';
import { connect } from 'react-redux';
import { State, AppProps } from './store';
import * as authActions from './store/auth/actions';
import * as clientActions from './store/clients/actions';
import Navbar from './common/navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import './App.css';
import { bindActionCreators } from 'redux';
import { ProtectedRoute } from './common/routing';
import Logout from './auth/LogoutPage';
import ClientsList from './clients/ClientsList';
import ClientPage from './clients/ClientPage';
import ClientEditPage from './clients/ClientEditPage';
import ClientCreatePage from './clients/ClientCreatePage';
import ClientDeletePage from './clients/ClientDeletePage';
import { AccountEditPage } from './account/AccountEditPage';
import { RegisterPage } from './auth/RegisterPage';
import { forceCheckAuth } from './store/auth/api';

const App = (props: AppProps) => {
  useEffect(() => {
    forceCheckAuth(props.actions);
  }, [null]); // only run once
  const authProps = {
    isAuthenticated: props.auth.loggedIn,
    loginPath: "/login",
  };
  return (
    <Router>
      <div>
        <Navbar {...authProps} actions={props.actions} />
        <section className="section">
          <div className="container">
            <Switch>
              <Route path="/login">
                <Login actions={props.actions} auth={props.auth} />
              </Route>
              <Route path="/logout">
                <Logout actions={props.actions} />
              </Route>
              <Route path="/register">
                <RegisterPage actions={props.actions} />
              </Route>
              <ProtectedRoute exact path="/account" {...authProps}>
                <AccountEditPage actions={props.actions} />
              </ProtectedRoute>
              <ProtectedRoute exact path="/" {...authProps}>
                <Redirect to="/clients" />
              </ProtectedRoute>
              <ProtectedRoute exact path="/clients" {...authProps}>
                <ClientsList actions={props.actions} clients={props.clients} />
              </ProtectedRoute>
              <ProtectedRoute exact path="/clients/create" {...authProps}>
                <ClientCreatePage actions={props.actions} />
              </ProtectedRoute>
              <ProtectedRoute exact path="/clients/:client" render={(routeProps) => 
                <ClientPage {...props} client={routeProps.match.params.client} />
              } {...authProps} />
              <ProtectedRoute exact path="/clients/:client/edit" render={(routeProps) => 
                <ClientEditPage {...props} client={routeProps.match.params.client} />
              } {...authProps} />
              <ProtectedRoute exact path="/clients/:client/delete" render={(routeProps) => 
                <ClientDeletePage {...props} client={routeProps.match.params.client} />
              } {...authProps} />
              <ProtectedRoute path="/dashboard" {...authProps}>
                This is the dashboard
              </ProtectedRoute>
            </Switch>
          </div>
        </section>
      </div>
    </Router>
  );
}

const mapStateToProps = (state: State) => ({
  auth: state.auth,
  clients: state.clients,
});

const mapDispatchToProps = (dispatch: any) => ({ // TODO: assign type explicitly
  actions: bindActionCreators(Object.assign({}, authActions, clientActions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
