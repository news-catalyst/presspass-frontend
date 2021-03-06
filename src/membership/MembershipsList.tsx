import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { UsersState } from '../store/users/types';
import { MembershipState, Membership } from '../store/memberships/types';
import { ensureMembershipsForUser } from '../store/memberships/api';
import MembershipCard from './MembershipCard';
import { Link } from 'react-router-dom';
import { ArchieState } from '../store/archie/types';

interface MembershipsListProps {
  actions: AppActions;
  archie: ArchieState;
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
      <div className="content">
        <h1 className="title is-size-1">{props.archie.copy.memberships.title}</h1>
        <p className="container">{props.archie.copy.memberships.description}</p>
      </div>

      <div className="columns is-multiline">
        {Object.values(props.memberships.memberships)
        .sort((a, b) =>
          a.organization.name > b.organization.name ? 1 : -1
        )
        .map(
          (membership: Membership) => (
            <div className="column is-4" key={membership.organization.uuid}>
              <MembershipCard
                actions={props.actions}
                archie={props.archie}
                key={membership.organization.uuid}
                membership={membership}
              />
            </div>
          )
        )}
      </div>
      <Link to="/organizations" className="button is-link is-outlined">
        {props.archie.copy.buttons.join}
      </Link>
    </div>
  );
};
