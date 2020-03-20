import React from 'react';
import { AppActions } from '../store';
import { Subscription } from '../store/subscriptions/types';
import { deleteSubscription } from '../store/subscriptions/api';

interface SubscriptionCardProps {
  subscription: Subscription;
  organization: string;
  actions: AppActions;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = (
  props: SubscriptionCardProps
) => {
  let subscription = props.subscription;
  let organization = props.organization;

  const removeSubscription = () => {
    deleteSubscription(subscription, organization, props.actions);
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{subscription.plan.name}</p>
      </header>

      <div className="card-content">
        <div className="content">
          <div className="media-content">
            <div className="content">
              Lorem ipsum about the subscription, maybe a link, not sure what
              might go here.
            </div>
          </div>
        </div>
      </div>
      <footer className="card-footer">
        <a onClick={removeSubscription} className="card-footer-item">
          Remove
        </a>
      </footer>
    </div>
  );
};

export default SubscriptionCard;
