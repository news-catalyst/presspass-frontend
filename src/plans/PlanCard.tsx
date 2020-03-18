import React from 'react';
import { AppActions } from '../store';
import { Plan } from '../store/plans/types';
import { createSubscription } from '../store/subscriptions/api';

interface PlanCardProps {
  plan: Plan;
  organization: string;
  actions: AppActions;
}

const SubscribeFooter: React.FC<PlanCardProps> = (props: PlanCardProps) => {
  const subscribeToPlan = () => {
    createSubscription(props.plan.id, props.organization, props.actions).then(
      status => {
        if (status.ok) {
          console.log('success', status);
        } else {
          console.log('error', status);
        }
      }
    );
  };

  if (props.plan.base_price > 0) {
    return <footer className="card-footer">Paid subs TK</footer>;
  }
  return (
    <footer className="card-footer">
      <a onClick={subscribeToPlan} className="card-footer-item">
        Subscribe
      </a>
    </footer>
  );
};
const PlanCard: React.FC<PlanCardProps> = (props: PlanCardProps) => {
  let plan = props.plan;
  let organization = props.organization;

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{plan.name}</p>
      </header>

      <div className="card-content">
        <div className="content">
          <div className="media-content">
            <div className="content">
              Lorem ipsum about the plan, maybe a link, not sure what might go
              here.
            </div>
          </div>
        </div>
      </div>
      <SubscribeFooter
        plan={plan}
        organization={organization}
        actions={props.actions}
      />
    </div>
  );
};

export default PlanCard;
