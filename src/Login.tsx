import React from 'react';

const Login: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Username" name="username" />
      <input type="password" placeholder="Password" name="password" />
    </div>
  );
}

export default Login;
