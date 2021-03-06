import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { Invitation, InvitationState } from '../store/invitations/types';
import InvitationCard from './InvitationCard';
import { ensureInvitationsForUser } from '../store/invitations/api';

interface InvitationListProps {
  actions: AppActions;
  invitations: InvitationState;
  uuid: string;
}

const InvitationList: React.FC<InvitationListProps> = (
  props: InvitationListProps
) => {
  useEffect(() => {
    ensureInvitationsForUser(props.actions, props.uuid, props.invitations);
  }, [props.actions, props.invitations]);

  let invites = Object.values(props.invitations.invitations);
  console.log('invitations: ', invites);
  return (
    <div>
      <h1 className="title is-size-3">Your Invitations</h1>
      <div className="columns is-multiline">
        {Object.values(invites).map((invitations: Invitation[]) => {
          invitations.map((invitation: Invitation) => (
            <div key={invitation.organization.uuid} className="column is-4">
              <InvitationCard actions={props.actions} invitation={invitation} />
            </div>
          ))
        })}
      </div>
    </div>
  );
};

export default InvitationList;
