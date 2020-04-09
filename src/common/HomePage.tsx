import React from "react";

const HomePage: React.FC = () => {
  return (
    <section className="hero is-medium is-warning is-rounded is-bold">
      <div className="hero-body">
        <div className="container">
          <p className="heading is-size-6">PressPass</p>
          <h1 className="title is-size-1">This is the homepage that unauthenticated visitors to our site will see at http://presspass.com.</h1>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
