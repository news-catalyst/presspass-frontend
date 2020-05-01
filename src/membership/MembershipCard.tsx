import React from 'react';
import { Link } from 'react-router-dom';
import { AppActions } from '../store';
import { deleteMembership } from '../store/memberships/api';
import { Membership } from '../store/memberships/types';
import ManageButton from './ManageButton';
import { ArchieState } from '../store/archie/types';

interface MembershipCardProps {
  membership: Membership;
  actions: AppActions;
  archie: ArchieState
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
  archie: ArchieState;
  membership: Membership;
}
const InviteButton: React.FC<InviteButtonProps> = (
  props: InviteButtonProps
) => {
  if (!props.membership.admin || props.membership.organization.individual) {
    return null;
  }
  return (
    <Link
      to={'/organizations/' + props.membership.organization.uuid + '/invite'}
      className="card-footer-item"
    >
      {props.archie.copy.buttons.invite}
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
        <div className="card-header-icon">
          <AdminTag isAdmin={membership.admin} />
        </div>
      </header>

      <div className="card-content">
        <div className="content">TK Members, TK Subscriptions</div>
      </div>
      <footer className="card-footer">
        <ManageButton archie={props.archie} membership={membership} />
        <InviteButton archie={props.archie} membership={membership} />
        <a onClick={removeMembership} className="card-footer-item">
          {props.archie.copy.buttons.remove}
        </a>
      </footer>
    </div>
  );
};

export default MembershipCard;
