import React from "react";

interface HomePageCardProps {
  group: string;
  title: string;
  body: string;
  image: string;
  textRight: boolean;
}
const HomePageCard: React.FC<HomePageCardProps> = (
  props: HomePageCardProps
) => {

  const imageColumn = (
    <div className="column is-5 is-offset-1">
      <figure className="image">
        <img src={props.image} />
      </figure>
    </div>
  );

  const textColumn = (
    <div className="column is-5 is-offset-1">
      <h5 className="is-size-5">For {props.group}</h5>
      <h2 className="title is-size-2">{props.title}</h2>
      <p className="is-size-5">{props.body}</p>
    </div>
  )

  return (
    <div className="box homepage-card">
      {props.textRight ? (
        <div className="columns is-vcentered has-padding-top-50 has-padding-bottom-50">
          {imageColumn}
          {textColumn}
        </div>
      ) : (
        <div className="columns is-vcentered has-padding-top-50 has-padding-bottom-50">
          {textColumn}
          {imageColumn}
        </div>
      )}
    </div>
  );
}

export default HomePageCard;
