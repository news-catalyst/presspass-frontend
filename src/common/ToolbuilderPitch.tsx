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
          <p>{props.archie.copy.toolbuilder.lede}</p>
          <p>{props.archie.copy.toolbuilder.kicker}</p>

          <div className="columns">

            <div className="column is-two-thirds">
              <iframe className="airtable-embed" src="https://airtable.com/embed/shreAyueyX2OnUy2E?backgroundColor=orange" width={"100%"} height={"1250px"}></iframe>            </div>
            <div className="column is-one-third">
              <h2 className="is-size-3">FAQ</h2>

              {props.archie.copy.toolbuilder.faq.map(item => (
                <article className="message">
                  <div className="message-header">
                    <p>{item.question}</p>
                    {/* <p className="is-size-5 has-text-weight-bold">{item.question}</p> */}
                  </div>
                  <div className="message-body">
                    <p>{item.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolbuilderPitch;
