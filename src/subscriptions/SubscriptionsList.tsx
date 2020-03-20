import React from 'react';
import { Organization } from '../store/organizations/types';
import { Subscription, SubscriptionState } from '../store/subscriptions/types';
import { AppActions } from '../store';
import SubscriptionCard from '../subscriptions/SubscriptionCard';

interface SubscriptionsListProps {
  actions: AppActions;
  organization: Organization;
  subscriptions: SubscriptionState;
}

const SubscriptionsList: React.FC<SubscriptionsListProps> = (
  props: SubscriptionsListProps
) => {
  let organization = props.organization;

  let subscriptions = Object.values(props.subscriptions.subscriptions);
  if (subscriptions.length === 0) {
    return (
      <div className="subscriptions">
        <p>
          {props.organization.name} is not currently subscribed to any plans.
        </p>
      </div>
    );
  }
  return (
    <div className="columns subscriptions">
      {subscriptions.map((subscription: Subscription) => (
        <div className="column is-4" key={subscription.id}>
          <SubscriptionCard
            actions={props.actions}
            key={subscription.id}
            subscription={subscription}
            organization={organization.uuid}
          />
        </div>
      ))}
    </div>
  );
};
export default SubscriptionsList;
