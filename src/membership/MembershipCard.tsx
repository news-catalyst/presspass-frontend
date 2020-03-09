import React from 'react';
import { AppActions } from '../store';
import { Membership } from '../store/memberships/types';
import { Link } from 'react-router-dom';
import { deleteMembership } from '../store/memberships/api';

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
      className="card-footer-item"
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
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <Link to={'/organizations/' + membership.organization.uuid}>
            {membership.organization.name}
          </Link>
        </p>
        <p className="card-header-icon">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <AdminTag isAdmin={membership.admin} />
        </div>
      </div>
      <footer className="card-footer">
        <ManageButton membership={membership} />
        <a onClick={removeMembership} className="card-footer-item">
          Remove
        </a>
      </footer>
    </div>
  );
};

export default MembershipCard;
