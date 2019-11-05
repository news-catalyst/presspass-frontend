import React from 'react';
import Login from './auth/Login';
import { connect } from 'react-redux';
import { State, AppProps } from './store';
import * as authActions from './store/auth/actions';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import { bindActionCreators } from 'redux';
import { ProtectedRoute } from './common/routing';

const App = (props: AppProps) => {
  const authProps = {
    isAuthenticated: props.auth.loggedIn,
    loginPath: "/login",
  };

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        <section className="section">
          <span>Key: {props.auth.key} </span>
          <div className="container">
            <Switch>
              <Route path="/login">
                <Login actions={props.actions} auth={props.auth} />
              </Route>
              <ProtectedRoute exact path="/" {...authProps}>
                This is the protected root
              </ProtectedRoute>
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
});

const mapDispatchToProps = (dispatch: any) => ({ // TODO: assign type explicitly
  actions: bindActionCreators(Object.assign({}, authActions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
