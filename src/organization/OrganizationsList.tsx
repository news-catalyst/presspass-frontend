import React, { useEffect, useState } from 'react';
import { AppActions } from '../store';
import { ensureInvitationsForUser } from '../store/invitations/api';
import { ensureMembershipsForUser } from '../store/memberships/api';
import { ensureOrganizations } from '../store/organizations/api';
import OrganizationCard from './OrganizationCard';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import Field from '../common/Field';
import { ArchieState } from '../store/archie/types';
import { InvitationState } from '../store/invitations/types';
import { MembershipState } from '../store/memberships/types';
import { OrganizationState, Organization } from '../store/organizations/types';
import { UsersState } from '../store/users/types';
import { Link } from 'react-router-dom'

interface OrganizationsListProps {
  actions: AppActions;
  archie: ArchieState;
  invitations: InvitationState;
  memberships: MembershipState;
  organizations: OrganizationState;
  users: UsersState;
}

interface OrganizationResultsProps {
  actions: AppActions;
  archie: ArchieState;
  invitations: InvitationState;
  items: Organization[];
  memberships: MembershipState;
  users: UsersState;
}

const OrganizationResults: React.FC<OrganizationResultsProps> = (
  props: OrganizationResultsProps
) => {
  return (
    <div className="columns is-multiline organizations-list">
      {props.items
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((organization: Organization) => (
          <div className="column is-4" key={organization.uuid}>
            <OrganizationCard
              actions={props.actions}
              archie={props.archie}
              invitations={props.invitations}
              memberships={props.memberships}
              organization={organization}
            />
          </div>
        ))}
    </div>
  )
}

export const OrganizationsList: React.FC<OrganizationsListProps> = (
  props: OrganizationsListProps
) => {
  const [items, setItems] = useState(
    Object.values(props.organizations.organizations)
  );
  const [showResults, setShowResults] = React.useState(false)

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
    let searchTerm = event.target.value.toLowerCase();
    let filteredItems = initialItems.filter(item => {
      return (
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    if (searchTerm !== undefined && searchTerm.length > 2) {
      setShowResults(true);
      setItems(filteredItems);
    } else {
      setShowResults(false);
      setItems([]);
    }
  };

  return (
    <div className="organizations">
      <div className="content">
        <div className="level">
          <div className="level-left">
            <h1 className="title is-size-1">{props.archie.copy.organizations.title}</h1>
          </div>
          <div className="level-right">
            <Link to="/organizations/create" className="button pp-primary">Create an organization</Link>
          </div>
        </div>
        <p>{props.archie.copy.entitlements.description}</p>

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
      </div>
      { showResults ? <OrganizationResults {...props} items={items} /> : null }

    </div>
  );
};
