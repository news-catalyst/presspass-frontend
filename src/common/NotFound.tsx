import React from "react";

const NotFound: React.FC = () => {
  return (
    <section className="hero is-medium is-warning is-rounded is-bold">
      <div className="hero-body">
        <div className="container">
          <p className="heading is-size-6">Error 404</p>
          <h1 className="title is-size-1">Page Not Found</h1>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
