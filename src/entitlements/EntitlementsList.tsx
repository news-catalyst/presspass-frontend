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
      <div className="columns is-multiline">
        {Object.values(props.entitlements.entitlements).map(
          (entitlement: Entitlement) => (
            <div key={entitlement.id} className="column is-4">
              <EntitlementCard entitlement={entitlement} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EntitlementsList;
