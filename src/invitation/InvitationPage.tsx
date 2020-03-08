import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { InvitationState } from '../store/invitations/types';
import { fetchInvitation } from '../store/invitations/api';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import InvitationCard from './InvitationCard';

interface InvitationPageProps {
  actions: AppActions;
  invitations: InvitationState;
  id: string;
}

export const InvitationPage: React.FC<InvitationPageProps> = (
  props: InvitationPageProps
) => {
  useEffect(() => {
    fetchInvitation(props.actions, props.id);
  }, [props.actions, props.id]);

  if (!props.invitations.hydrated) {
    return <LoadingPlaceholder />;
  }

  let invitation = props.invitations.invitations[props.id];

  return (
    <section className="invitation-page">
      <p className="subtitle">Invitation from: </p>
      <InvitationCard actions={props.actions} invitation={invitation} />
    </section>
  );
};
