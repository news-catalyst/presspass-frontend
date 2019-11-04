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

  return (
    <form onSubmit={formSubmit}>
      <h1>Login</h1>
      <input type="text" placeholder="Username" name="username" value={username} onChange={event => setUsername(event.target.value)} />
      {response.username ? response.username : null}
      <input type="password" placeholder="Password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
      {response.password ? response.password : null}
      <button type="submit">Login</button>
      {response.non_field_errors ? response.non_field_errors : null}
      {response.key ? response.key : null}
    </form>
  );
}

export default Login;
