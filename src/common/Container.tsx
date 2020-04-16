import React from "react";

const Container: React.FC = (props) => {
  return (
    <section className="section">
      <div className="container">
        {props.children}
      </div>
    </section>
  );
};

export default Container;
