import React, { useEffect, useState } from 'react';
import { AppActions } from '../store';
import { Invitation } from '../store/invitations/types';
import { fetchUser } from '../store/users/api';
import { acceptInvitation, rejectInvitation } from '../store/invitations/api';
import { Redirect } from 'react-router';
import { User, UsersState } from '../store/users/types';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { format } from 'date-fns';

interface InvitationRequestCardProps {
  actions: AppActions;
  invitation: Invitation;
  users: UsersState;
}

interface InvitationRequestActionProps {
  actions: AppActions;
  invitation: Invitation;
}

const InvitationRequestActions: React.FC<InvitationRequestActionProps> = (
  props: InvitationRequestActionProps
) => {
  let [saved, setSaved] = useState(false);
  let [errors, setErrors] = useState({});
  let accepted = !!props.invitation.accepted_at;
  let rejected = !!props.invitation.rejected_at;
  let invitation = props.invitation;

  // this is an open request for membership and the org manager can accept or reject
  let showActionButtons = !accepted && !rejected;

  const onAcceptClick = () => {
    acceptInvitation(invitation, props.actions, 'membership request').then(
      status => {
        if (status.ok) {
          setSaved(true);
        } else {
          setErrors(status.body);
        }
      }
    );
  };

  const onRejectClick = () => {
    rejectInvitation(invitation, props.actions, 'membership request').then(
      status => {
        if (status.ok) {
          console.log('successfully rejected the membership request');
          setSaved(true);
        } else {
          setErrors(status.body);
        }
      }
    );
  };

  // if (saved) {
  //   return <Redirect to={`/profile`} />;
  // }

  if (showActionButtons) {
    return (
      <footer className="card-footer">
        <a onClick={onAcceptClick} className="card-footer-item">
          Accept
        </a>
        <a onClick={onRejectClick} className="card-footer-item">
          Reject
        </a>
      </footer>
    );
  } else {
    return (
      <div>
        {accepted ? (
          <p>
            <strong>Accepted at:</strong>{' '}
            <small>{invitation.accepted_at}</small>
          </p>
        ) : (
          ''
        )}
        {rejected ? (
          <p>
            <strong>Rejected at:</strong>{' '}
            <small>{invitation.rejected_at}</small>
          </p>
        ) : (
          ''
        )}
      </div>
    );
  }
};

const InvitationRequestCard: React.FC<InvitationRequestCardProps> = (
  props: InvitationRequestCardProps
) => {
  let invitation = props.invitation;

  var formattedDate = format(
    new Date(invitation.created_at),
    'd MMM yyyy H:mma'
  );
  return (
    <div key={invitation.user_id} className="card">
      <div className="card-content">
        <div className="content">
          {invitation.user.email} requested membership at{' '}
          <small>{formattedDate}</small>.
        </div>
      </div>
      <InvitationRequestActions
        actions={props.actions}
        invitation={invitation}
      />
    </div>
  );
};

export default InvitationRequestCard;
