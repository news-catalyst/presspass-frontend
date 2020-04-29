import React from "react";
import { ArchieState } from '../store/archie/types';

interface ToolbuilderProps {
  archie: ArchieState;
}
const ToolbuilderPitch: React.FC<ToolbuilderProps> = (
  props: ToolbuilderProps
) => {
  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="title is-size-1">{props.archie.copy.toolbuilder.title}</h1>
          <p>{props.archie.copy.toolbuilder.description}</p>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc3f7KZ0MennmLIPHuIGKvPmj3TvQ2p0n3H0jEBt4i_pEn7-Q/viewform?embedded=true" width="640" height="1003">Loading…</iframe>
        </div>
      </div>
    </section>
  );
};

export default ToolbuilderPitch;
