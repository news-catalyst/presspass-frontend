import React from 'react';
import { Organization } from '../store/organizations/types';
import { UsersState } from '../store/users/types';
import { Invitation, InvitationState } from '../store/invitations/types';
import { AppActions } from '../store';
import InvitationRequestCard from '../invitation/InvitationRequestCard';

interface InvitationsListProps {
  actions: AppActions;
  invitations: InvitationState;
  organization: Organization;
  users: UsersState;
}

const InvitationsList: React.FC<InvitationsListProps> = (
  props: InvitationsListProps
) => {
  let organization = props.organization;
  let invitations = Object.values(props.invitations.invitations).filter(
    invitation => {
      if (
        invitation.request &&
        invitation.accepted_at === null &&
        invitation.rejected_at === null
      )
        return invitation;
    }
  );

  if (invitations.length === 0) {
    return (
      <div className="invitations">
        <p>{props.organization.name} has no open requests for memberships.</p>
      </div>
    );
  }
  return (
    <div className="columns invitations">
      {invitations.map((invitation: Invitation) => (
        <div className="column is-4" key={invitation.uuid}>
          <InvitationRequestCard
            actions={props.actions}
            key={invitation.uuid}
            invitation={invitation}
            users={props.users}
          />
        </div>
      ))}
    </div>
  );
};
export default InvitationsList;
