import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { UsersState } from '../store/users/types';
import { MembershipState, Membership } from '../store/memberships/types';
import { ensureMembershipsForUser } from '../store/memberships/api';
import MembershipCard from './MembershipCard';
import { Link } from 'react-router-dom';

interface MembershipsListProps {
  actions: AppActions;
  memberships: MembershipState;
  users: UsersState;
}

export const MembershipsList: React.FC<MembershipsListProps> = (
  props: MembershipsListProps
) => {
  // load user's memberships list
  useEffect(() => {
    if (props.users.self !== null) {
      const uuid = props.users.self.uuid;
      ensureMembershipsForUser(props.actions, uuid, props.memberships);
    }
  }, [props.actions, props.memberships, props.users, props.users.self]);

  return (
    <div className="memberships">
      <h1 className="title is-size-1">Memberships</h1>
      <p>You are a member of the following organizations:</p>
      <div className="columns is-multiline">
        {Object.values(props.memberships.memberships).map(
          (membership: Membership) => (
            <div className="column is-4" key={membership.organization.uuid}>
              <MembershipCard actions={props.actions} membership={membership} />
            </div>
          )
        )}
      </div>
      <Link to="/organizations" className="button is-link is-outlined">
        + Join An Organization
      </Link>
    </div>
  );
};
