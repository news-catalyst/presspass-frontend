import React from 'react';
import { AppActions } from '../store';
import { Membership } from '../store/memberships/types';
import { Link } from 'react-router-dom';
import { deleteMembership } from '../store/memberships/api';
import { membershipReducers } from '../store/memberships/reducers';

interface MembershipCardProps {
  membership: Membership;
  actions: AppActions;
}

interface AdminTagProps {
  isAdmin: boolean;
}
const AdminTag: React.FC<AdminTagProps> = (props: AdminTagProps) => {
  return (
    <div className="tags has-addons">
      <span className="tag">Admin?</span>
      {props.isAdmin ? (
        <span className="tag is-success">Yes</span>
      ) : (
        <span className="tag is-danger">No</span>
      )}
    </div>
  );
};

interface ManageButtonProps {
  membership: Membership;
}
const ManageButton: React.FC<ManageButtonProps> = (
  props: ManageButtonProps
) => {
  if (!props.membership.admin) {
    return null;
  }
  return (
    <Link
      to={'/organizations/' + props.membership.organization.uuid + '/manage'}
      className="button"
    >
      Manage
    </Link>
  );
};

const MembershipCard: React.FC<MembershipCardProps> = (
  props: MembershipCardProps
) => {
  let membership = props.membership;
  const removeMembership = () => {
    deleteMembership(membership, props.actions);
  };

  return (
    <div className="box">
      <Link to={'/organizations/' + membership.organization.uuid}>
        <h5 className="title is-size-5">{membership.organization.name}</h5>
      </Link>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons"></div>
          <AdminTag isAdmin={membership.admin} />
          <ManageButton membership={membership} />
          <button onClick={removeMembership} className="button is-danger">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
