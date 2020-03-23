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
          <strong>Client:</strong> {entitlement.client.name}
          <br />
          <strong>Link:</strong>{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={entitlement.client.website_url}
          >
            {entitlement.client.website_url}
          </a>
          <p>{entitlement.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EntitlementCard;
