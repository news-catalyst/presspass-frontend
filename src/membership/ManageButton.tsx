import React from 'react';
import { Link } from 'react-router-dom';
import { Membership } from '../store/memberships/types';
import { ArchieState } from '../store/archie/types';

interface ManageButtonProps {
  archie: ArchieState;
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
      {props.archie.copy.buttons.manage}
    </Link>
  );
};

export default ManageButton;
