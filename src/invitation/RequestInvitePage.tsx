import React, { useEffect, useState, SyntheticEvent } from 'react';
import { AppActions } from '../store';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { OrganizationState } from '../store/organizations/types';
import { ensureOrganizations } from '../store/organizations/api';
import { requestInvitation } from '../store/invitations/api';
import { Link } from 'react-router-dom';

interface RequestInvitePageProps {
  actions: AppActions;
  organization: number;
  organizations: OrganizationState;
}

export const RequestInvitePage: React.FC<RequestInvitePageProps> = (
  props: RequestInvitePageProps
) => {
  let [errors, setErrors] = useState<any>({});
  let [saved, setSaved] = useState(false);

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

    requestInvitation(organization.uuid, props.actions).then(status => {
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
        <strong>Success!</strong> You've requested an invite to the{' '}
        {organization.name} organization.
        <p>
          <Link to="/profile">Return to your profile</Link>.
        </p>
      </div>
    );
  }

  return (
    <div>
      Request an invite to join the organization <b>{organization.name}</b>
      <form className="limited-width" onSubmit={handleFormSubmit}>
        <button className="button is-primary" type="submit">
          Send request
        </button>
      </form>
    </div>
  );
};
