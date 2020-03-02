import {
  MembershipAction,
  UPSERT_MEMBERSHIP,
  MembershipState,
  UPSERT_MEMBERSHIPS,
  DELETE_MEMBERSHIP
} from './types';

const initialState: MembershipState = {
  memberships: {},
  hydrated: false
};

export function membershipReducers(
  state = initialState,
  action: MembershipAction
): MembershipState {
  switch (action.type) {
    case UPSERT_MEMBERSHIPS: {
      let incomingObject: MembershipState = {
        memberships: Object.assign({}, state.memberships),
        hydrated: true
      };
      for (let membership of action.memberships) {
        incomingObject.memberships[membership.organization] = membership;
      }
      return Object.assign({}, state, incomingObject);
    }
    case UPSERT_MEMBERSHIP: {
      let incomingObject: MembershipState = {
        memberships: Object.assign({}, state.memberships),
        hydrated: true
      };
      incomingObject.memberships[action.membership.user] = action.membership;
      return Object.assign({}, state, incomingObject);
    }
    case DELETE_MEMBERSHIP: {
      let incomingObject: MembershipState = {
        memberships: Object.assign({}, state.memberships),
        hydrated: true
      };
      delete incomingObject.memberships[action.membership.user];
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}
