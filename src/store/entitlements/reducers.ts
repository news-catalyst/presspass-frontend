import {
  EntitlementAction,
  UPSERT_ENTITLEMENT,
  EntitlementState,
  UPSERT_ENTITLEMENTS,
  DELETE_ENTITLEMENT
} from './types';

const initialState: EntitlementState = {
  entitlements: {},
  hydrated: false
};

export function entitlementReducers(
  state = initialState,
  action: EntitlementAction
): EntitlementState {
  switch (action.type) {
    case UPSERT_ENTITLEMENTS: {
      let incomingObject: EntitlementState = {
        entitlements: Object.assign({}, state.entitlements),
        hydrated: true
      };
      for (let entitlement of action.entitlements) {
        incomingObject.entitlements[entitlement.slug] = entitlement;
      }
      return Object.assign({}, state, incomingObject);
    }
    case UPSERT_ENTITLEMENT: {
      let incomingObject: EntitlementState = {
        entitlements: Object.assign({}, state.entitlements),
        hydrated: true
      };
      incomingObject.entitlements[action.entitlement.slug] = action.entitlement;
      return Object.assign({}, state, incomingObject);
    }
    case DELETE_ENTITLEMENT: {
      let incomingObject: EntitlementState = {
        entitlements: Object.assign({}, state.entitlements),
        hydrated: true
      };
      delete incomingObject.entitlements[action.entitlement.slug];
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}
