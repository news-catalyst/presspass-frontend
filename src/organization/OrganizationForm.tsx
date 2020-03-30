// Form separated from page so that it can DRY-ly be used in both
// the 'create' component and the 'edit' component.

import React, { useState, SyntheticEvent } from 'react';
import { Organization } from '../store/organizations/types';
import Field from '../common/Field';
import { Plan, PlanState } from '../store/plans/types';
import { InvitationState } from '../store/invitations/types';
import { SubscriptionState } from '../store/subscriptions/types';
import { AppActions } from '../store';
import InvitationsList from '../invitation/InvitationsList';
import PlansList from '../plans/PlansList';
import SubscriptionsList from '../subscriptions/SubscriptionsList';
import { UsersState } from '../store/users/types';

interface OrganizationFormProps {
  actions: AppActions;
  errors: any;
  invitations: InvitationState;
  onSubmit: (parameter: Organization) => void;
  organization: Organization;
  plans: PlanState;
  subscriptions: SubscriptionState;
  users: UsersState;
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
        <h1 className="title">Membership Requests</h1>
        <InvitationsList
          organization={organization}
          users={props.users}
          invitations={props.invitations}
          actions={props.actions}
        />
      </div>
      <hr />
      <div className="container">
        <h1 className="title">Subscriptions</h1>
        <SubscriptionsList
          organization={organization}
          subscriptions={props.subscriptions}
          actions={props.actions}
        />
      </div>
      <hr />
      <div className="container">
        <h1 className="title">Available Plans</h1>
        <PlansList
          organization={organization}
          plans={props.plans}
          users={props.users}
          actions={props.actions}
        />
      </div>
      <br />
      <button type="submit" className="button is-link">
        Save
      </button>
    </form>
  );
};

export default OrganizationForm;
