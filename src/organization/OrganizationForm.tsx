// Form separated from page so that it can DRY-ly be used in both
// the 'create' component and the 'edit' component.

import React, { useState, SyntheticEvent } from 'react';
import { Organization } from '../store/organizations/types';
import Field from '../common/Field';
import { Plan, PlanState } from '../store/plans/types';
import { Subscription, SubscriptionState } from '../store/subscriptions/types';
import { AppActions } from '../store';
import PlanCard from '../plans/PlanCard';
import SubscriptionCard from '../subscriptions/SubscriptionCard';
import { UsersState } from '../store/users/types';

interface OrganizationFormProps {
  actions: AppActions;
  organization: Organization;
  plans: PlanState;
  subscriptions: SubscriptionState;
  users: UsersState;
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

  // build a list of plans noting which are subscribed
  Object.values(props.plans.plans).map((plan: Plan) => {
    plan.subscribed = Object.values(props.subscriptions.subscriptions).some(
      sub => sub.plan.id === plan.id
    );
    return plan;
  });

  let newOrganization: Organization = {
    ...organization,
    name: name,
    private: privateOrg,
    avatar: avatar
  };

  let errors = props.errors;

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
      <hr />
      <div className="container">
        <h1 className="title">Subscriptions</h1>
        <div className="columns">
          {Object.values(props.subscriptions.subscriptions).map(
            (subscription: Subscription) => (
              <div className="column is-4" key={subscription.id}>
                <SubscriptionCard
                  actions={props.actions}
                  key={subscription.id}
                  subscription={subscription}
                  organization={organization.uuid}
                />
              </div>
            )
          )}
        </div>
      </div>
      <hr />
      <div className="container">
        <h1 className="title">Available Plans</h1>
        <div className="columns is-multiline">
          {Object.values(props.plans.plans)
            .filter(plan => !plan.subscribed)
            .map((plan: Plan) => (
              <div className="column is-4" key={plan.id}>
                <PlanCard
                  actions={props.actions}
                  key={plan.id}
                  plan={plan}
                  users={props.users}
                  organization={organization.uuid}
                />
              </div>
            ))}
        </div>
      </div>
      <br />
      <button type="submit" className="button is-link">
        Save
      </button>
    </form>
  );
};

export default OrganizationForm;
