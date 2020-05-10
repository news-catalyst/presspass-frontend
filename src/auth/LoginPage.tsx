import React, { useState, SyntheticEvent } from 'react';
import { AppActions } from '../store';
import { AuthState } from '../store/auth/types';
import { Redirect, useLocation } from 'react-router';
import { cfetch } from '../utils';
import Field from '../common/Field';
import { Link } from 'react-router-dom';
import { fetchSelfUser } from "../store/users/api";

type LoginFormResponse = {
  non_field_errors: string[];
  username: string;
  password: string;
  responseCode: number;
};

interface LoginProps {
  auth: AuthState;
  actions: AppActions;
  location?: any;
}

class LoginCredentials {
  constructor(private username: string, private password: string) {}

  login(): Promise<LoginFormResponse> {
    return this.performLoginRequest();
  }

  private serializeForLoginForm() {
    let data = {
      email: this.username,
      password: this.password
    };
    return JSON.stringify(data);
  }

  private async performLoginRequest(): Promise<LoginFormResponse> {
    // TODO: move to thunk
    let postResp = await cfetch(
      `${process.env.REACT_APP_SQUARELET_API_URL}/auth/login/`,
      {
        method: 'POST',
        credentials: 'include',
        body: this.serializeForLoginForm(),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    let json = await postResp.json();
    return {
      ...json,
      responseCode: postResp.status
    };
  }
}

const LoginPage: React.FC<LoginProps> = (props: LoginProps) => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  let location = useLocation();

  // Errors & Form Response
  let [response, setResponse] = useState<LoginFormResponse>(
    {} as LoginFormResponse
  );

  let formSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let creds = new LoginCredentials(username, password);
    let resp = creds.login();
    resp.then(response => {
      setResponse(response);
      if (response.responseCode === 200) {
        props.actions.login();
        fetchSelfUser(props.actions);
      }
    });
  };

  let overallErrors: null | JSX.Element = null;
  if (response.non_field_errors) {
    overallErrors = (
      <div className="notification is-danger">{response.non_field_errors}</div>
    );
  }

  // necessary as just linking to /register results in location missing the original return url
  let returnUrl = '/entitlements';
  if (location.state) {
    returnUrl = location.state.return;
  }
  const registerLocation = {
    pathname: '/register',
    state: { return: returnUrl }
  };
  const redirectUrl = location.state ? location.state.return : '/entitlements';

  return props.auth.loggedIn ? (
    <div className="notification is-success">
      You are logged in. Please wait to be redirected.
      <Redirect to={redirectUrl} />
    </div>
  ) : (
    <form onSubmit={formSubmit} className="limited-width">
      <h1 className="title">Login</h1>
      {overallErrors}
      <Field label="Email" errors={[response.username]}>
        <input
          type="email"
          className={response.username ? 'input is-danger' : 'input'}
          placeholder="Your email"
          name="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </Field>
      <Field label="Password" errors={[response.password]}>
        <input
          type="password"
          className={response.password ? 'input is-danger' : 'input'}
          placeholder="Password"
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </Field>
      <button type="submit" className="button is-primary">
        Login
      </button>
      <Link to="/resetpassword" className="button is-text">
        reset password
      </Link>
      <hr />
      <Link to={registerLocation} className="button is-primary is-outlined">
        Register New Account
      </Link>
    </form>
  );
};

export default LoginPage;
