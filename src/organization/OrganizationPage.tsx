import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { OrganizationState } from '../store/organizations/types';
import { ensureOrganizations } from '../store/organizations/api';
import { AppProps } from '../store';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { Link } from 'react-router-dom';

interface OrganizationPageProps extends AppProps {
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
      <p className="subtitle">PressPass News Organization</p>
      <h1 className="title is-size-1">{organization.name}</h1>
      <table className="table">
        <tbody>
          <tr>
            <td className="has-text-weight-bold">Name</td>
            <td>{organization.name}</td>
          </tr>
          <tr>
            <td className="has-text-weight-bold">Avatar</td>
            <td>{organization.avatar}</td>
          </tr>
        </tbody>
      </table>
      <p>
        Organization page (id {organization.uuid}) (
        <Link to={`./${organization.id}/manage`}>manage</Link>)
      </p>
    </section>
  );
};
