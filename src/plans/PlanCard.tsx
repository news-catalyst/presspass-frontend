import React, { useState, SyntheticEvent } from 'react';
import Field from '../common/Field';
import { AppActions } from '../store';
import { Plan } from '../store/plans/types';
import { createSubscription } from '../store/subscriptions/api';
import PlanForm from './PlanForm';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_tAB5WRZLYKrFvFhM9lYjQs7q');

interface PlanCardProps {
  plan: Plan;
  organization: string;
  actions: AppActions;
}

interface SubscribeModalProps {
  show: boolean;
  hideModal: () => void;
  plan: Plan;
  organization: string;
  actions: AppActions;
}
const SubscribeModal: React.FC<SubscribeModalProps> = (
  props: SubscribeModalProps
) => {
  let [errors, setErrors] = useState<any>({});
  let [number, setNumber] = useState('');
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
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
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Subscribe to Plan</p>
          <button
            onClick={props.hideModal}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <Elements stripe={stripePromise}>
            <PlanForm />
          </Elements>
        </section>
      </div>
    </div>
  );
};

const SubscribeFooter: React.FC<PlanCardProps> = (props: PlanCardProps) => {
  let [show, setShow] = useState(false);

  let showModal = () => {
    setShow(true);
  };

  let hideModal = () => {
    setShow(false);
  };

  const subscribeToPlan = () => {
    // TODO needs the token from stripe
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
    return (
      <footer className="card-footer">
        <SubscribeModal
          plan={props.plan}
          organization={props.organization}
          actions={props.actions}
          show={show}
          hideModal={hideModal}
        />
        <a onClick={showModal} className="card-footer-item">
          Pay to Subscribe
        </a>
      </footer>
    );
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
              {plan.base_price > 0
                ? `This plan's base price is $${plan.base_price}.`
                : 'This is a free plan.'}
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
