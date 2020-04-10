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
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{entitlement.name}</p>
      </header>
      <div className="card-content">
        <div className="content">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="button pp-primary-outline"
            href={entitlement.client.website_url}
          >
            Login to {entitlement.client.name}
          </a>
          <p>{entitlement.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EntitlementCard;
