import {
  OrganizationAction,
  UPSERT_ORGANIZATION,
  OrganizationState,
  UPSERT_ORGANIZATIONS,
  DELETE_ORGANIZATION
} from './types';

const initialState: OrganizationState = {
  organizations: {},
  hydrated: false
};

export function organizationReducers(
  state = initialState,
  action: OrganizationAction
): OrganizationState {
  switch (action.type) {
    case UPSERT_ORGANIZATIONS: {
      let incomingObject: OrganizationState = {
        organizations: Object.assign({}, state.organizations),
        hydrated: true
      };
      for (let organization of action.organizations) {
        incomingObject.organizations[organization.uuid] = organization;
      }
      return Object.assign({}, state, incomingObject);
    }
    case UPSERT_ORGANIZATION: {
      let incomingObject: OrganizationState = {
        organizations: Object.assign({}, state.organizations),
        hydrated: true
      };
      incomingObject.organizations[action.organization.uuid] =
        action.organization;
      return Object.assign({}, state, incomingObject);
    }
    case DELETE_ORGANIZATION: {
      let incomingObject: OrganizationState = {
        organizations: Object.assign({}, state.organizations),
        hydrated: true
      };
      delete incomingObject.organizations[action.organization.uuid];
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}
