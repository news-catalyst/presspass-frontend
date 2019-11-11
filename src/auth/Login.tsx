import React, { useState, SyntheticEvent } from 'react';
import { AppActions } from '../store';
import { AuthState } from '../store/auth/types';
import { Redirect, useLocation } from 'react-router';
import { cfetch } from '../utils';
import { Field } from '../common/field';

type LoginFormResponse = {
  non_field_errors: string[];
  username: string;
  password: string;
  responseCode: number;
}

interface LoginProps {
  auth: AuthState;
  actions: AppActions;
  location?: any;
}

class LoginCredentials {
  constructor(private username: string, private password: string) { }

  login(): Promise<LoginFormResponse> {
    return this.performLoginRequest();
  }

  private serializeForLoginForm() {
    let data = {
      username: this.username,
      password: this.password,
    }
    return JSON.stringify(data);
  }

  private async performLoginRequest(): Promise<LoginFormResponse> { // TODO: move to thunk
    let postResp = await cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/rest-auth/login/`, {
      method: "POST",
      credentials: "include",
      body: this.serializeForLoginForm(),
      headers: {
        "Content-Type": "application/json",
      }
    });
    let json = await postResp.json();
    return {
      ...json,
      responseCode: postResp.status
    }
  }
}

type Props = { onLogin: Function };

const Login = (props: LoginProps) => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let location = useLocation();

  // Errors & Form Response
  let [response, setResponse] = useState<LoginFormResponse>({} as LoginFormResponse);

  let formSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let creds = new LoginCredentials(username, password);
    let resp = creds.login();
    resp.then(response => {
      setResponse(response);
      if (response.responseCode === 200) {
        props.actions.login();
      }
    });
  }

  let overallErrors = null;
  if (response.non_field_errors) {
    overallErrors = (
      <div className="notification is-danger">
        {response.non_field_errors}
      </div>
    )
  }

  const redirectUrl = (location.state) ? location.state.return : "/";

  return (props.auth.loggedIn) ? (
    <div className="notification is-success">
      You are logged in. Please wait to be redirected.
        <Redirect to={redirectUrl} />
    </div>
  ) : (
      <form onSubmit={formSubmit} className="limited-width">
        <h1 className="title">Login</h1>
        {overallErrors}
        <Field label="Username" errors={[response.username]}>
          <input type="text" className={response.username ? "input is-danger" : "input"} placeholder="Username" name="username" value={username} onChange={event => setUsername(event.target.value)} />
        </Field>
        <Field label="Password" errors={[response.password]}>
          <input type="password" className={response.password ? "input is-danger" : "input"} placeholder="Password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
        </Field>
        <button type="submit" className="button is-primary">Login</button>
      </form>
    );
}

export default Login;
