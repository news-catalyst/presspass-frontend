import React from 'react';
import { Link } from 'react-router-dom';
import { Membership } from '../store/memberships/types';

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

export default ManageButton;
