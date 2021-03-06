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
        if (!incomingObject.invitations[action.organization_id]) {
          incomingObject.invitations[action.organization_id] = [];
        }

        const invitationList = incomingObject.invitations[action.organization_id];

        if (!invitationList.find((i => i.uuid === invitation.uuid))) {
          invitationList.push(invitation);
        }
      }
      return Object.assign({}, state, incomingObject);
    }
    case UPSERT_INVITATION: {
      let incomingObject: InvitationState = {
        invitations: Object.assign({}, state.invitations),
        hydrated: true
      };

      if (!incomingObject.invitations[action.organization_id]) {
        incomingObject.invitations[action.organization_id] = [];
      }

      const invitationList = incomingObject.invitations[action.organization_id];

      if (!invitationList.find((i => i.uuid === action.invitation.uuid))) {
        invitationList.push(action.invitation);
      }

      return Object.assign({}, state, incomingObject);
    }
    case DELETE_INVITATION: {
      let incomingObject: InvitationState = {
        invitations: Object.assign({}, state.invitations),
        hydrated: true
      };
      delete incomingObject.invitations[action.invitation.uuid];
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}
