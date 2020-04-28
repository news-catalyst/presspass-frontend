import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppActions } from '../store';
import { AppProps } from '../store';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import OrganizationCard from './OrganizationCard';
import { ensureOrganizations } from '../store/organizations/api';
import { InvitationState } from '../store/invitations/types';
import { MembershipState } from '../store/memberships/types';
import { OrganizationState } from '../store/organizations/types';
import { ArchieState } from '../store/archie/types';

interface OrganizationPageProps extends AppProps {
  invitations: InvitationState;
  memberships: MembershipState;
  organization: string;
  organizations: OrganizationState;
  actions: AppActions;
  archie: ArchieState;
}

export const OrganizationPage = (props: OrganizationPageProps) => {
  useEffect(() => {
    ensureOrganizations(props.actions, props.organizations);
  }, [props.actions, props.organizations]);
  if (!props.organizations.hydrated) {
    return <LoadingPlaceholder />;
  }

  let organization = props.organizations.organizations[props.organization];
  return (
    <section className="organization-page">
      <OrganizationCard
        actions={props.actions}
        archie={props.archie}
        invitations={props.invitations}
        memberships={props.memberships}
        organization={organization}
      />
      <p>
        Organization page (id {organization.uuid}) (
        <Link to={`./${organization.uuid}/manage`}>{props.archie.copy.buttons.manage}</Link>)
      </p>
    </section>
  );
};
