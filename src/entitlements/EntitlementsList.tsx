import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { ensureEntitlements } from '../store/entitlements/api';
import EntitlementCard from './EntitlementCard';
import { EntitlementState, Entitlement } from '../store/entitlements/types';
import LoadingPlaceholder from '../common/LoadingPlaceholder';

interface EntitlementsListProps {
  actions: AppActions;
  entitlements: EntitlementState;
}

const EntitlementsList: React.FC<EntitlementsListProps> = (
  props: EntitlementsListProps
) => {
  useEffect(() => {
    ensureEntitlements(props.actions, props.entitlements);
  }, [props.actions, props.entitlements]);

  if (!props.entitlements.hydrated) {
    return <LoadingPlaceholder />;
  }

  return (
    <div className="entitlements">
      <h1 className="title is-size-1">Entitlements</h1>
      <div className="content">
        <p>Here is the list of resources you can access via your PressPass account. Click any of the cards to login to this resource.</p>
      </div>
      <div className="columns is-multiline">
        {Object.values(props.entitlements.entitlements).map(
          (entitlement: Entitlement) => (
            <div key={entitlement.id} className="column is-4">
              <EntitlementCard entitlement={entitlement} />
            </div>
          )
        )}
      </div>
      <div className="content">
        <p>Need more resources? Subscribe to more plans here.</p>
      </div>
    </div>
  );
};

export default EntitlementsList;
