import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { ensureEntitlements } from '../store/entitlements/api';
import EntitlementCard from './EntitlementCard';
import { EntitlementState, Entitlement } from '../store/entitlements/types';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { ArchieState } from '../store/archie/types';

interface EntitlementsListProps {
  actions: AppActions;
  archie: ArchieState;
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
      <section className="section">
        <h1 className="title is-size-1">{props.archie.copy.entitlements.title}</h1>
        <p>{props.archie.copy.entitlements.description}</p>
      </section>
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
