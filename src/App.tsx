import React from 'react';
import Login from './auth/Login';
import { connect } from 'react-redux';
import { State } from './store';
import * as authActions from './store/auth/actions';

import './App.css';
import { bindActionCreators } from 'redux';
import { AuthState } from './store/auth/types';

interface AppProps {
  auth: AuthState,
  actions: {
    loginWithKey: typeof authActions.loginWithKey,
  }
}

const App: React.FC = (props) => {
  console.log(props);

  function login(key: string) {
    console.log("logged in");
    console.log(key);
  }
  return (
    <section className="section">
      <div className="container">
        <Login onLogin={login} />
      </div>
    </section>
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
