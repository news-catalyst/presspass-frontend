import React, { useState, SyntheticEvent } from 'react';

class LoginCredentials {
  constructor(private username: string, private password: string) { }

  login() {
    console.log("login request");
    this.performLoginRequest();
  }

  private serializeForLoginForm(csrf: string) {
    let data = {
      username: this.username,
      password: this.password,
    }
    return JSON.stringify(data);
  }

  private async performLoginRequest() {
    fetch("http://dev.squarelet.com/csrf/get", {
      method: "GET",
    }).then(async resp => {
      let csrf = (await resp.json()).csrfToken;
      fetch("http://dev.squarelet.com/rest-auth/login/", {
        method: "POST",
        body: this.serializeForLoginForm(csrf),
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf, // Necessary,
        }
      }).then(post_resp => {
        post_resp.text().then(e => console.log(e));
      })
    })
    .catch(e => console.log(e))
    .finally(() => console.log("done"));
  }
}

const Login: React.FC = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let formSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    new LoginCredentials(username, password).login();
  }

  return (
    <form onSubmit={formSubmit}>
      <h1>Login</h1>
      <input type="text" placeholder="Username" name="username" value={username} onChange={event => setUsername(event.target.value)} />
      <input type="password" placeholder="Password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
