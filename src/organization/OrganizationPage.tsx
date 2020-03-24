import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { OrganizationState } from '../store/organizations/types';
import { ensureOrganizations } from '../store/organizations/api';
import { AppProps } from '../store';
import OrganizationCard from './OrganizationCard';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { Link } from 'react-router-dom';
import { MembershipState } from '../store/memberships/types';

interface OrganizationPageProps extends AppProps {
  memberships: MembershipState;
  organization: string;
  organizations: OrganizationState;
  actions: AppActions;
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
        memberships={props.memberships}
        organization={organization}
      />
      <p>
        Organization page (id {organization.uuid}) (
        <Link to={`./${organization.uuid}/manage`}>manage</Link>)
      </p>
    </section>
  );
};
