import {
  cfetch,
  JSON_POST,
  JSON_PATCH,
  checkAuth,
  validate,
  notify,
  GET
} from "../../utils";
import { AppActions } from "..";
import { EmailState, Email } from "./types";

export const addEmail = (
  actions: AppActions,
  email: string
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/users/me/emails/`,
    JSON_POST({
      email: email,
    })
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, () =>
        notify("Successfully added an email address", "success")
      )
    );

export const primaryEmail = (
  actions: AppActions,
  email: Email
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/users/me/emails/fakeuuid/`,
    JSON_PATCH({
      email: email,
      primary: true,
      action_primary: true,
    })
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, () =>
        notify("Successfully made new email address primary", "success")
      )
    );

export const fetchEmails = (actions: AppActions) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/users/me/emails`, GET)
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertEmails(data)]))
    .catch(error => {
      console.error('API Error fetchEmails', error, error.code);
    });

export const ensureEmails = (
  actions: AppActions,
  emails: EmailState
) => {
  if (!emails.hydrated) {
    return fetchEmails(actions);
  }
};
