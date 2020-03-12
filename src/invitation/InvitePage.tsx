import React, { useEffect, useState, SyntheticEvent } from 'react';
import { AppActions } from '../store';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import Field from '../common/Field';
import { OrganizationState } from '../store/organizations/types';
import { ensureOrganizations } from '../store/organizations/api';
import { createInvitation } from '../store/invitations/api';
import { Link } from 'react-router-dom';
import { Invitation } from '../store/invitations/types';

interface InvitePageProps {
  actions: AppActions;
  organization: number;
  organizations: OrganizationState;
}

export const InvitePage: React.FC<InvitePageProps> = (
  props: InvitePageProps
) => {
  let [errors, setErrors] = useState<any>({});
  let [saved, setSaved] = useState(false);
  let [email, setEmail] = useState('');

  useEffect(() => {
    ensureOrganizations(props.actions, props.organizations);
  }, [props.actions, props.organizations]);

  if (!props.organizations.hydrated) {
    return <LoadingPlaceholder />;
  }

  // the list of orgs in the props is filled in by ensureOrganizations
  // the following line pulls the org out of the map by matching the prop 'organization' (an ID)
  let organization = props.organizations.organizations[props.organization];

  function handleFormSubmit(event: SyntheticEvent) {
    event.preventDefault();

    createInvitation(organization.uuid, email, props.actions).then(status => {
      if (status.ok) {
        setSaved(true);
        setErrors({});
      } else {
        setErrors(status.body);
      }
    });
  }

  if (saved) {
    return (
      <div className="notification is-success">
        <strong>Success!</strong> You've invited {email} to the org{' '}
        {organization.name}.
        <p>
          <Link to="/profile">Return to your profile</Link>.
        </p>
      </div>
    );
  }

  return (
    <div>
      Invite page for organization <b>{organization.name}</b>
      <form className="limited-width" onSubmit={handleFormSubmit}>
        <Field label="Email" errors={errors.email}>
          <input
            type="email"
            className={errors.email ? 'input is-danger' : 'input'}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </Field>
        <button className="button is-primary" type="submit">
          Send Invitations
        </button>
      </form>
    </div>
  );
};
