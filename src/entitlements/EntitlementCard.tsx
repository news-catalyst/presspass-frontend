import React from 'react';
import { Entitlement } from '../store/entitlements/types';

interface EntitlementCardProps {
  entitlement: Entitlement;
}

const EntitlementCard: React.FC<EntitlementCardProps> = (
  props: EntitlementCardProps
) => {
  let entitlement = props.entitlement;
  return (
    <a
      className="box"
      target="_blank"
      rel="noopener noreferrer"
      href={entitlement.client.website_url}
    >
      <h5 className="title is-size-5">{entitlement.name}</h5>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Name</span>
            <span className="tag is-info">{entitlement.name}</span>
          </div>
        </div>
      </div>
      <div className="content">
        <p>{entitlement.description}</p>
      </div>
    </a>
  );
};

export default EntitlementCard;
