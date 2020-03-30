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
    acceptInvitation(invitation, props.actions).then(status => {
      if (status.ok) {
        console.log('successfully accepted the membership request');
        setSaved(true);
      } else {
        setErrors(status.body);
      }
    });
  };

  const onRejectClick = () => {
    rejectInvitation(invitation, props.actions).then(status => {
      if (status.ok) {
        console.log('successfully rejected the membership request');
        setSaved(true);
      } else {
        setErrors(status.body);
      }
    });
  };

  if (saved) {
    return <Redirect to={`/profile`} />;
  }

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
  useEffect(() => {
    async function fetchData() {
      await fetchUser(props.actions, invitation.user);
    }
    fetchData();
  }, []);

  if (props.users.user == null) {
    return <LoadingPlaceholder />;
  }

  var formattedDate = format(
    new Date(invitation.created_at),
    'd MMM yyyy H:mma'
  );
  return (
    <div key={invitation.user} className="box">
      <h5 className="title is-size-5">
        {props.users.user.name} requested membership
      </h5>
      <div>
        <InvitationRequestActions
          actions={props.actions}
          invitation={invitation}
        />
        <p>
          <strong>Requested at:</strong> <small>{formattedDate}</small>
        </p>
      </div>
    </div>
  );
};

export default InvitationRequestCard;
