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
  if (props.isAdmin) {
    return (
      <div className="tags has-addons">
        <span className="tag is-success">Admin</span>
      </div>
    );
  } else {
    return null;
  }
};

interface InviteButtonProps {
  membership: Membership;
}
const InviteButton: React.FC<InviteButtonProps> = (
  props: InviteButtonProps
) => {
  if (!props.membership.admin) {
    return null;
  }
  return (
    <Link
      to={'/organizations/' + props.membership.organization.uuid + '/invite'}
      className="card-footer-item"
    >
      Invite
    </Link>
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
          <AdminTag isAdmin={membership.admin} />
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          Lorem ipsum about the org, maybe a link, not sure what might go here.
        </div>
      </div>
      <footer className="card-footer">
        <ManageButton membership={membership} />
        <InviteButton membership={membership} />
        <a onClick={removeMembership} className="card-footer-item">
          Remove
        </a>
      </footer>
    </div>
  );
};

export default MembershipCard;
