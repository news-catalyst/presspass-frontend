import React from 'react';
import { Membership } from '../store/memberships/types';
import { Link } from 'react-router-dom';

interface MembershipCardProps {
  membership: Membership;
}

interface AdminTagProps {
  isAdmin: boolean;
}
const AdminTag: React.FC<AdminTagProps> = (props: AdminTagProps) => {
  if (props.isAdmin) {
    return <span className="tag is-primary">Admin</span>;
  } else {
    return <span className="tag is-dark">NOT Admin</span>;
  }
};
const MembershipCard: React.FC<MembershipCardProps> = (
  props: MembershipCardProps
) => {
  let membership = props.membership;
  return (
    <Link className="box" to={'/organizations/' + membership.organization}>
      <h5 className="title is-size-5">{membership.organization}</h5>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons"></div>
          <AdminTag isAdmin={membership.admin} />
        </div>
      </div>
    </Link>
  );
};

export default MembershipCard;
