import React, { useEffect, useState } from 'react';
import { AppActions } from '../store';
import { ensureInvitationsForUser } from '../store/invitations/api';
import { ensureMembershipsForUser } from '../store/memberships/api';
import { ensureOrganizations } from '../store/organizations/api';
import OrganizationCard from './OrganizationCard';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import Field from '../common/Field';
import { InvitationState } from '../store/invitations/types';
import { MembershipState } from '../store/memberships/types';
import { OrganizationState, Organization } from '../store/organizations/types';
import { UsersState } from '../store/users/types';

interface OrganizationsListProps {
  actions: AppActions;
  invitations: InvitationState;
  memberships: MembershipState;
  organizations: OrganizationState;
  users: UsersState;
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
        setItems(
          Object.values(props.organizations.organizations).filter(
            (organization: Organization) => {
              return !organization.private && !organization.individual;
            }
          )
        );
      }
      // load user's memberships list
      if (props.users.self !== null) {
        const uuid = props.users.self.uuid;
        await ensureMembershipsForUser(props.actions, uuid, props.memberships);
        await ensureInvitationsForUser(props.actions, uuid, props.invitations);
      }
    }
    fetchData();
  }, [props.actions, props.organizations]);

  if (!props.organizations.hydrated) {
    return <LoadingPlaceholder />;
  }

  const filterList = event => {
    let initialItems = Object.values(props.organizations.organizations).filter(
      (organization: Organization) => {
        return !organization.private && !organization.individual;
      }
    );
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
              <OrganizationCard
                actions={props.actions}
                invitations={props.invitations}
                memberships={props.memberships}
                organization={organization}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
