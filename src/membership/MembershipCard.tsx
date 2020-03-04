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
const MembershipCard: React.FC<MembershipCardProps> = (
  props: MembershipCardProps
) => {
  let membership = props.membership;
  return (
    <Link className="box" to={'/organizations/' + membership.organization.uuid}>
      <h5 className="title is-size-5">{membership.organization.name}</h5>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons"></div>
          <AdminTag isAdmin={membership.admin} />
          <button className="button is-danger">Remove</button>
        </div>
      </div>
    </Link>
  );
};

export default MembershipCard;
