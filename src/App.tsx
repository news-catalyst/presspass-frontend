import React, { useEffect } from "react";
import { connect } from "react-redux";
import { State, AppProps } from "./store";
import * as authActions from "./store/auth/actions";
import * as clientActions from "./store/clients/actions";
import Navbar from "./common/navbar";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import "./App.css";
import { bindActionCreators } from "redux";
import { forceCheckAuth } from "./store/auth/api";
import { AuthProps } from "./store/auth/types";
import { AuthRouter } from "./auth/Routing";
import { ClientsRouter } from "./clients/Routing";
import { AccountRouter } from "./account/Routing";
import { EntitlementsRouter } from "./entitlements/Routing";
import { ProtectedRoute } from "./common/routing";

const App = (props: AppProps) => {
  useEffect(() => {
    forceCheckAuth(props.actions);
  }, [props.actions]); // only run once
  const authProps = AuthProps(props);
  return (
    <Router>
      <div>
        <Navbar {...authProps} actions={props.actions} />
        <section className="section">
          <div className="container">
            <Switch>
              <ProtectedRoute exact path="/" {...authProps}>
                <Redirect to="/entitlements" />
              </ProtectedRoute>
              {AuthRouter(props).map(route => route)}
              {ClientsRouter(props).map(route => route)}
              {AccountRouter(props).map(route => route)}
              {EntitlementsRouter(props).map(route => route)}
            </Switch>
          </div>
        </section>
      </div>
    </Router>
  );
};

const mapStateToProps = (state: State) => ({
  auth: state.auth,
  clients: state.clients
});

const mapDispatchToProps = (dispatch: any) => ({
  // TODO: assign type explicitly
  actions: bindActionCreators(
    Object.assign({}, authActions, clientActions),
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
