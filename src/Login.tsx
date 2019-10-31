import React, { useState, SyntheticEvent } from 'react';

class LoginCredentials {
  constructor(private username: string, private password: string) { }

  login() {
    console.log("login request");
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
