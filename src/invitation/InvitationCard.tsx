import React from 'react';
import { Invitation } from '../store/invitations/types';
import { Link } from 'react-router-dom';

interface InvitationCardProps {
  invitation: Invitation;
}

const InvitationCard: React.FC<InvitationCardProps> = (
  props: InvitationCardProps
) => {
  let invitation = props.invitation;
  return (
    <Link className="box" to={'/organizations/' + invitation.organization}>
      <h5 className="title is-size-5">{invitation.organization}</h5>
      <div>
        {invitation.accepted_at !== null ? (
          <p>
            <strong>Accepted at:</strong>{' '}
            <small>{invitation.accepted_at}</small>
          </p>
        ) : (
          'include-accept-button'
        )}
        {invitation.rejected_at !== null ? (
          <p>
            <strong>Rejected at:</strong>{' '}
            <small>{invitation.rejected_at}</small>
          </p>
        ) : (
          'include-reject-button'
        )}
        <p>
          <strong>Created at:</strong> <small>{invitation.created_at}</small>
        </p>
      </div>
    </Link>
  );
};

export default InvitationCard;
