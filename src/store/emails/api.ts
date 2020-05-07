import {
  cfetch,
  checkAuth,
  validate,
  ItemizedResponse,
  notify,
  GET,
  JSON_POST,
  JSON_PATCH,
  DELETE
} from "../../utils";
import { AppActions } from "..";
import { EmailState, Email } from "./types";

export const addEmail = (
  actions: AppActions,
  email: Email
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/emails/`,
    JSON_POST({
      email: email.email,
    })
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        actions.upsertEmail(status.body as Email);
        notify("Successfully added an email address", "success")
      })
    );

export const primaryEmail = (
  actions: AppActions,
  email: Email
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/emails/${email.email}/`,
    JSON_PATCH({
      email: email,
      primary: true,
      action_primary: true,
    })
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        actions.upsertEmail(status.body as Email);
        notify("Successfully made new email address primary", "success")
      })
    );

export const fetchEmails = (actions: AppActions) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/emails/`, GET)
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertEmails(data.results)]))
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

export const deleteEmail = (
  actions: AppActions,
  email: Email
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/emails/${email.email}/`,
    DELETE
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, () => {
        actions.deleteEmail(email);
        notify("Successfully removed email address", "success")
      })
    );
