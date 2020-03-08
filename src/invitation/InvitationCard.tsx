import React, { useEffect, useState } from 'react';
import { AppActions } from '../store';
import { Invitation } from '../store/invitations/types';
import { acceptInvitation, rejectInvitation } from '../store/invitations/api';
import { Link } from 'react-router-dom';

interface InvitationCardProps {
  actions: AppActions;
  invitation: Invitation;
}

const InvitationActions: React.FC<InvitationCardProps> = (
  props: InvitationCardProps
) => {
  let [saved, setSaved] = useState(false);
  let [errors, setErrors] = useState({});
  let accepted = !!props.invitation.accepted_at;
  let rejected = !!props.invitation.rejected_at;
  let invitation = props.invitation;

  // i've been invited, and I can say yes or no
  let showActionButtons = !accepted && !rejected && !invitation.request;

  // I've requested membership and it's pending
  let showRequestIsPendingStatus = !accepted && !rejected && invitation.request;

  // I've requested membership and it's either been approved or booed
  let showInvitationIsHandledStatus = accepted || rejected;

  const onAcceptClick = () => {
    acceptInvitation(invitation, props.actions).then(status => {
      if (status.ok) {
        console.log('successfully accepted the invite');
        setSaved(true);
      } else {
        setErrors(status.body);
      }
    });
  };

  const onRejectClick = () => {
    rejectInvitation(invitation, props.actions).then(status => {
      if (status.ok) {
        console.log('successfully rejected the invite');
        setSaved(true);
      } else {
        setErrors(status.body);
      }
    });
  };

  if (showActionButtons) {
    return (
      <div className="buttons">
        <button onClick={onAcceptClick} className="button is-success">
          accept
        </button>
        <button onClick={onRejectClick} className="button is-danger">
          reject
        </button>
      </div>
    );
  } else if (showRequestIsPendingStatus) {
    return (
      <div>
        <p>
          <strong>Your request is pending</strong>
        </p>
      </div>
    );
  } else if (showInvitationIsHandledStatus) {
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
  } else if (saved) {
    return <div>All done!</div>;
  } else {
    return <div>Unhandled invitation state.</div>;
  }
};

const InvitationCard: React.FC<InvitationCardProps> = (
  props: InvitationCardProps
) => {
  let invitation = props.invitation;

  return (
    <div key={invitation.uuid} className="box">
      <h5 className="title is-size-5">{invitation.organization.name}</h5>
      <div>
        <InvitationActions actions={props.actions} invitation={invitation} />
        <p>
          <strong>Created at:</strong> <small>{invitation.created_at}</small>
        </p>
      </div>
    </div>
  );
};

export default InvitationCard;
