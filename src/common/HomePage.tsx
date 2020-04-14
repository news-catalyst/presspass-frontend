import React from "react";
import { ArchieState } from '../store/archie/types';

interface HomePageProps {
  archie: ArchieState;
}
const HomePage: React.FC<HomePageProps> = (
  props: HomePageProps
) => {
  return (
    <section className="hero is-large homepage-hero is-rounded">
      <div className="hero-body">
        <div className="container">
          <p className="heading is-size-1">{props.archie.copy.homepage.title}</p>
          <h1 className="title is-size-1">{props.archie.copy.homepage.slogan}</h1>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
