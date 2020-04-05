import React from 'react';
import { Link } from 'react-router-dom';
import { AppActions } from '../store';
import { deleteMembership } from '../store/memberships/api';
import { Membership } from '../store/memberships/types';
import ManageButton from './ManageButton';

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
        <span className="tag is-light">Admin</span>
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

const MembershipCard: React.FC<MembershipCardProps> = (
  props: MembershipCardProps
) => {
  let membership = props.membership;
  let organization = membership.organization;

  const removeMembership = () => {
    deleteMembership(membership, props.actions);
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <Link to={'/organizations/' + organization.uuid}>
            {organization.name}
          </Link>
        </p>
        <p className="card-header-icon">
          <AdminTag isAdmin={membership.admin} />
        </p>
      </header>

      <div className="card-content">
        <div className="content">TK Members, TK Subscriptions</div>
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
