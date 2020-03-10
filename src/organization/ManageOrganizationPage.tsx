import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { OrganizationState, Organization } from '../store/organizations/types';
import { ensureOrganizations } from '../store/organizations/api';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { AppProps } from '../store';
import { Link } from 'react-router-dom';

interface ManageOrganizationPageProps extends AppProps {
  organization: string;
  organizations: OrganizationState;
  actions: AppActions;
}

export const ManageOrganizationPage = (props: ManageOrganizationPageProps) => {
  useEffect(() => {
    ensureOrganizations(props.actions, props.organizations);
  }, [props.actions, props.organizations]);
  if (!props.organizations.hydrated) {
    return <LoadingPlaceholder />;
  }

  let organization = props.organizations.organizations[props.organization];
  return (
    <section className="organization-page">
      <p className="subtitle">Manage PressPass News Organization</p>
      <h1 className="title is-size-1">{organization.name}</h1>
      <p>
        Manage organization page (id {organization.uuid}) (
        <Link to=".">view</Link>)
      </p>
    </section>
  );
};
