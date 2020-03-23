import React, { useEffect, useState } from 'react';
import { AppActions } from '../store';
import { OrganizationState, Organization } from '../store/organizations/types';
import { ensureOrganizations } from '../store/organizations/api';
import OrganizationCard from './OrganizationCard';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import Field from '../common/Field';

interface OrganizationsListProps {
  actions: AppActions;
  organizations: OrganizationState;
}

export const OrganizationsList: React.FC<OrganizationsListProps> = (
  props: OrganizationsListProps
) => {
  const [items, setItems] = useState(
    Object.values(props.organizations.organizations)
  );
  useEffect(() => {
    async function fetchData() {
      await ensureOrganizations(props.actions, props.organizations);
      if (props.organizations.hydrated) {
        setItems(Object.values(props.organizations.organizations));
      }
    }
    fetchData();
  }, [props.actions, props.organizations]);

  if (!props.organizations.hydrated) {
    return <LoadingPlaceholder />;
  }

  const filterList = event => {
    let initialItems = Object.values(props.organizations.organizations);
    let filteredItems = initialItems.filter(item => {
      return (
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    setItems(filteredItems);
  };
  return (
    <div className="organizations">
      <h1 className="title is-size-1">Organizations</h1>
      <form>
        <Field label="Search">
          <input
            type="text"
            placeholder="Search"
            onChange={filterList}
            className="input"
          />
        </Field>
      </form>
      <div className="columns is-multiline">
        {items
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((organization: Organization) => (
            <div className="column is-4" key={organization.uuid}>
              <OrganizationCard organization={organization} />
            </div>
          ))}
      </div>
    </div>
  );
};
