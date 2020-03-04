import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { MembershipState } from '../store/memberships/types';
import { UsersState } from '../store/users/types';
import {
  ensureMembershipsForUser,
  deleteMembership
} from '../store/memberships/api';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { Redirect } from 'react-router';
import MembershipCard from './MembershipCard';

interface MembershipDeletePageProps {
  actions: AppActions;
  users: UsersState;
  memberships: MembershipState;
  membership: number;
}

export const MembershipDeletePage: React.FC<MembershipDeletePageProps> = (
  props: MembershipDeletePageProps
) => {
  useEffect(() => {
    if (props.users.self !== null) {
      const uuid = props.users.self.uuid;
      ensureMembershipsForUser(props.actions, uuid, props.memberships);
    }
  }, [props.actions, props.memberships, props.users, props.users.self]);

  if (props.memberships.hydrated) {
    return <HydratedMembershipDeletePage {...props} />;
  } else {
    return <LoadingPlaceholder />;
  }
};

const HydratedMembershipDeletePage = (props: MembershipDeletePageProps) => {
  let membership = props.memberships.memberships[props.membership];

  const handleSubmit = () => {
    deleteMembership(membership, props.actions);
  };

  if (membership === undefined) {
    return <Redirect to={`/memberships`} />;
  } else {
    return (
      <section className="membership-page limited-width">
        <p className="subtitle">Delete Membership</p>
        <h1 className="title is-size-1">{membership.organization.name}</h1>
        <MembershipCard membership={membership} />
        <p className="has-text-danger">
          Are you sure you would like to permanently remove your membership from
          this organization? This action cannot be undone.
        </p>
        <br></br>
        <button className="button is-danger" onClick={handleSubmit}>
          Remove me from {membership.organization.name}
        </button>
      </section>
    );
  }
};
