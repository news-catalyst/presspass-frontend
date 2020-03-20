import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { OrganizationState, Organization } from '../store/organizations/types';
import { ensureOrganizations } from '../store/organizations/api';
import OrganizationCard from './OrganizationCard';

interface OrganizationsListProps {
  actions: AppActions;
  organizations: OrganizationState;
}

export const OrganizationsList: React.FC<OrganizationsListProps> = (
  props: OrganizationsListProps
) => {
  useEffect(() => {
    ensureOrganizations(props.actions, props.organizations);
  }, [props.actions, props.organizations]);

  return (
    <div className="organizations">
      <h1 className="title is-size-1">Organizations</h1>
      <div className="columns is-multiline">
        {Object.values(props.organizations.organizations)
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((organization: Organization) => (
            <div className="column is-4">
              <OrganizationCard organization={organization} />
            </div>
          ))}
      </div>
    </div>
  );
};
