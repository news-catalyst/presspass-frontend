import {
  InvitationAction,
  UPSERT_INVITATION,
  InvitationState,
  UPSERT_INVITATIONS,
  DELETE_INVITATION
} from './types';

const initialState: InvitationState = {
  invitations: {},
  hydrated: false
};

export function invitationReducers(
  state = initialState,
  action: InvitationAction
): InvitationState {
  switch (action.type) {
    case UPSERT_INVITATIONS: {
      let incomingObject: InvitationState = {
        invitations: Object.assign({}, state.invitations),
        hydrated: true
      };
      for (let invitation of action.invitations) {
        incomingObject.invitations[invitation.organization] = invitation;
      }
      return Object.assign({}, state, incomingObject);
    }
    case UPSERT_INVITATION: {
      let incomingObject: InvitationState = {
        invitations: Object.assign({}, state.invitations),
        hydrated: true
      };
      incomingObject.invitations[action.invitation.organization] = action.invitation;
      return Object.assign({}, state, incomingObject);
    }
    case DELETE_INVITATION: {
      let incomingObject: InvitationState = {
        invitations: Object.assign({}, state.invitations),
        hydrated: true
      };
      delete incomingObject.invitations[action.invitation.organization];
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}