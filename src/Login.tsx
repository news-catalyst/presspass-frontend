import React, { useState, SyntheticEvent } from 'react';

type LoginFormResponse = {
  non_field_errors: string[];
  username: string;
  password: string;
  key: string;
}

class LoginCredentials {
  constructor(private username: string, private password: string) { }

  login(): Promise<LoginFormResponse> {
    console.log("login request");
    return this.performLoginRequest();
  }

  private serializeForLoginForm() {
    let data = {
      username: this.username,
      password: this.password,
    }
    return JSON.stringify(data);
  }

  private async performLoginRequest(): Promise<LoginFormResponse> {
    let resp = await fetch("http://dev.squarelet.com/csrf/get", {
      method: "GET",
    });
    let csrf = (await resp.json()).csrfToken;
    let post_resp = await fetch("http://dev.squarelet.com/rest-auth/login/", {
      method: "POST",
      body: this.serializeForLoginForm(),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf, // Necessary,
      }
    })
    return await post_resp.json();
  }
}

const Login: React.FC = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  // Errors & Form Response
  let [response, setResponse] = useState<LoginFormResponse>({} as LoginFormResponse);

  let formSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let creds = new LoginCredentials(username, password);
    let resp = creds.login();
    resp.then(setResponse);
  }

  let overallErrors = null;
  if (response.non_field_errors) {
    overallErrors = (
      <div className="notification is-danger">
        {response.non_field_errors}
      </div>
    )
  }

  return (
    <form onSubmit={formSubmit}>
      <h1 className="title">Login</h1>
      {overallErrors}
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input type="text" className={response.username ? "input is-danger" : "input"} placeholder="Username" name="username" value={username} onChange={event => setUsername(event.target.value)} />
        </div>
        <p className="help is-danger">{response.username}</p>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input type="password" className={response.password ? "input is-danger" : "input"} placeholder="Password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
        </div>
        <p className="help is-danger">{response.password}</p>
      </div>
      <button type="submit" className="button is-primary">Login</button>
      {response.key ? response.key : null}
    </form>
  );
}

export default Login;
