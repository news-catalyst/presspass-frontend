import React from 'react';
import Login from './Login';
import './App.css';

const App: React.FC = () => {
  function login(key: string) {
    console.log("logged in");
    console.log(key);
  }
  return (
    <section className="section">
      <div className="container">
        <Login onLogin={login}/>
      </div>
    </section>
  );
}

export default App;
