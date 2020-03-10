import React, { useEffect, useState } from 'react';
import { AppActions } from '../store';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { OrganizationState } from '../store/organizations/types';
import { ensureOrganizations } from '../store/organizations/api';

interface InvitePageProps {
  actions: AppActions;
  organization: number;
  organizations: OrganizationState;
}

export const InvitePage: React.FC<InvitePageProps> = (
  props: InvitePageProps
) => {
  useEffect(() => {
    ensureOrganizations(props.actions, props.organizations);
  }, [props.actions, props.organizations]);

  if (!props.organizations.hydrated) {
    return <LoadingPlaceholder />;
  }
  let organization = props.organizations.organizations[props.organization];
  // let [email, setEmail] = useState('');
  return (
    <div>
      Invite page for organization <b>{organization.name}</b>
    </div>
  );
};
