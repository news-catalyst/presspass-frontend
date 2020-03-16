// Form separated from page so that it can DRY-ly be used in both
// the 'create' component and the 'edit' component.

import React, { useState, SyntheticEvent } from 'react';
import { Organization } from '../store/organizations/types';
import Field from '../common/Field';
import { Plan, PlanState } from '../store/plans/types';
import { organizationReducers } from '../store/organizations/reducers';
import { Subscription, SubscriptionState } from '../store/subscriptions/types';
import {
  createSubscription,
  deleteSubscription
} from '../store/subscriptions/api';
import { AppActions } from '../store';

interface PlansListProps {
  plans: PlanState;
}

const PlansList: React.FC<PlansListProps> = (props: PlansListProps) => {
  return (
    <div className="content">
      <h1 className="subtitle">Plans:</h1>
      <ul>
        {Object.values(props.plans.plans).map((plan: Plan) => (
          <li key={plan.id}>{plan.name}</li>
        ))}
      </ul>
    </div>
  );
};

interface SubscriptionsListProps {
  subscriptions: SubscriptionState;
}
const SubscriptionsList: React.FC<SubscriptionsListProps> = (
  props: SubscriptionsListProps
) => {
  return (
    <div className="content">
      <h1 className="subtitle">Subscriptions:</h1>
      <ul>
        {Object.values(props.subscriptions.subscriptions).map(
          (subscription: Subscription) => (
            <li key={subscription.id}>{subscription.plan.name}</li>
          )
        )}
      </ul>
    </div>
  );
};

interface OrganizationFormProps {
  actions: AppActions;
  organization: Organization;
  plans: PlanState;
  subscriptions: SubscriptionState;
  onSubmit: (parameter: Organization) => void;
  errors: any;
}

const OrganizationForm: React.FC<OrganizationFormProps> = (
  props: OrganizationFormProps
) => {
  let organization = props.organization;

  let [name, setName] = useState(organization.name);
  let [privateOrg, setPrivateOrg] = useState(organization.private);
  let [avatar, setAvatar] = useState<File | undefined>(undefined);
  let [subbedPlans, setSubbedPlans] = useState();

  let newOrganization: Organization = {
    ...organization,
    name: name,
    private: privateOrg,
    avatar: avatar
  };

  let errors = props.errors;

  // build a list of plans noting which are subscribed
  const subPlans = Object.values(props.plans.plans).map((plan: Plan) => {
    plan.subscribed = Object.values(props.subscriptions.subscriptions).some(
      sub => sub.plan.id === plan.id
    );
    return plan;
  });
  console.log(subPlans);
  // setSubbedPlans(subPlans);

  const handleSubscription = event => {
    let planId = parseInt(event.target.value, 10);
    if (event.target.checked) {
      createSubscription(planId, props.organization.uuid, props.actions).then(
        status => {
          if (status.ok) {
            console.log('success', status);
          } else {
            console.log('error', status);
          }
        }
      );
    } else {
      // first, find the subscription ID using the plan ID?
      console.log(props.subscriptions);
      let matchingSub = Object.values(props.subscriptions.subscriptions).find(
        (sub: Subscription) => {
          return sub.plan.id === planId;
        }
      );
      if (matchingSub) {
        console.log('found matching subscription: ', matchingSub);
        deleteSubscription(matchingSub, props.actions).then(status => {
          if (status.ok) {
            console.log('success', status);
          } else {
            console.log('error', status);
          }
        });
      } else {
        console.log('No matching subscription found for planID: ', planId);
      }
    }
    console.log(props.subscriptions);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onSubmit(newOrganization);
  };

  return (
    <form onSubmit={handleSubmit} className="limited-width">
      <Field label="Name" errors={errors.name}>
        <input
          className={errors.name ? 'input is-danger' : 'input'}
          type="text"
          placeholder="Your organization's name..."
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </Field>
      <Field
        label="Avatar"
        errors={errors.avatar}
        help="If you do not upload a file, the current photo will be kept."
      >
        <input
          className={errors.avatar ? 'input is-danger' : 'input'}
          type="file"
          placeholder="Your organization's logo..."
          onChange={event =>
            setAvatar(
              event.target.files === null ? undefined : event.target.files[0]
            )
          }
        />
      </Field>
      <Field errors={errors.private}>
        <label className={errors.private ? 'checkbox is-danger' : 'checkbox'}>
          <input
            type="checkbox"
            checked={privateOrg}
            onChange={event => setPrivateOrg(event.target.checked)}
          />
          This organization's information and membership is not made public
        </label>
      </Field>
      <SubscriptionsList subscriptions={props.subscriptions} />
      <PlansList plans={props.plans} />
      <br />
      <button type="submit" className="button is-link">
        Save
      </button>
    </form>
  );
};

export default OrganizationForm;
