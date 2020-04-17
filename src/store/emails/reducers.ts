import {
  EmailAction,
  UPSERT_EMAIL,
  EmailState,
  UPSERT_EMAILS,
  DELETE_EMAIL
} from './types';

const initialState: EmailState = {
  emails: [],
  hydrated: false
};

export function emailReducers(
  state = initialState,
  action: EmailAction
): EmailState {
  switch (action.type) {
    case UPSERT_EMAIL: {
      let incomingObject: EmailState = {
        emails: state.emails,
        hydrated: true
      };
      incomingObject.emails.push(action.email);
      return Object.assign({}, state, incomingObject);
    }
    case UPSERT_EMAILS: {
      let incomingObject: EmailState = {
        emails: state.emails,
        hydrated: true
      };
      incomingObject.emails = incomingObject.emails.concat(action.emails);
      return Object.assign({}, state, incomingObject);
    }
    case DELETE_EMAIL: {
      let incomingObject: EmailState = {
        emails: state.emails,
        hydrated: true
      };
      incomingObject.emails = incomingObject.emails.filter(e => e.email !== action.email.email);
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}
