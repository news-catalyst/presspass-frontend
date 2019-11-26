// React/redux
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

// Local Redux store
import { State, AppProps } from "./store";
import * as authActions from "./store/auth/actions";
import * as clientActions from "./store/clients/actions";
import * as userActions from "./store/users/actions";
import { AuthProps } from "./store/auth/types";
import { forceCheckAuth } from "./store/auth/api";
import { fetchSelfUser } from "./store/users/api";

// Common
import Navbar from "./common/Navbar";
import { ProtectedRoute } from "./common/routing";
import NotFound from "./common/NotFound";

// Routes
import { getRoutes as authRoutes } from "./auth/routing";
import { getRoutes as clientsRoutes } from "./clients/routing";
import { getRoutes as accountRoutes } from "./account/routing";
import { getRoutes as entitlementsRoutes } from "./entitlements/routing";
import { getRoutes as organizationsRoutes } from "./organization/routing";

// Styles
import "./App.css";


const App = (props: AppProps) => {
  useEffect(() => {
    forceCheckAuth(props.actions);
    fetchSelfUser(props.actions);
  }, [props.actions]); // only run once

  const authProps = AuthProps(props);

  return (
    <Router>
      <div>
        <Navbar {...authProps} actions={props.actions} user={props.users.self} />
        <section className="section">
          <div className="container">
            <Switch>
              <ProtectedRoute exact path="/" {...authProps}>
                <Redirect to="/entitlements" />
              </ProtectedRoute>
              {authRoutes(props).map(route => route)}
              {clientsRoutes(props).map(route => route)}
              {accountRoutes(props).map(route => route)}
              {entitlementsRoutes(props).map(route => route)}
              {organizationsRoutes(props).map(route => route)}
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </section>
      </div>
    </Router>
  );
};

const mapStateToProps = (state: State) => ({
  auth: state.auth,
  clients: state.clients,
  users: state.users,
});

const mapDispatchToProps = (dispatch: any) => ({
  // TODO: assign type explicitly
  actions: bindActionCreators(
    Object.assign({}, authActions, clientActions, userActions),
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
