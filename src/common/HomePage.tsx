import React from "react";
import { ArchieState } from '../store/archie/types';
import { Link } from "react-router-dom";
import HomePageCard from "./HomePageCard";

interface HomePageProps {
  archie: ArchieState;
}
const HomePage: React.FC<HomePageProps> = (
  props: HomePageProps
) => {
  return (
    <>
      <section className="hero homepage-hero is-rounded">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <figure className="image">
                  <img src="/wordmark.png" />
                </figure>
              </div>
            </div>
            <div className="columns is-vcentered">
              <div className="column is-5 is-offset-1">
                <h2 className="title is-size-2">{props.archie.copy.homepage.slogan}</h2>
                <p className="is-size-4 subtitle">{props.archie.copy.homepage.lede}</p>
                <Link className="button is-primary is-medium" to="/register">Register new account</Link>
              </div>
              <div className="column is-5 is-offset-1">
                <figure className="image">
                  <img src="/homepage.svg" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {props.archie.copy.homepage.cards.map((card, i) => (
            <HomePageCard
              key={`card-${i}`}
              group={card.group}
              title={card.title}
              body={card.body}
              image={card.image}
              textRight={i % 2 === 0}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
