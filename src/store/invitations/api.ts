import { AppActions } from '..';
import {
  checkAuth,
  cfetch,
  validate,
  ItemizedResponse,
  notify,
  GET,
  PATCH,
  PUT,
  DELETE
} from '../../utils';
import { Invitation, InvitationState } from './types';
import { OrganizationState, Organization } from '../organizations/types';

const serializeInvitation = (invitation: Invitation) => ({
  uuid: invitation.uuid,
  user: invitation.user,
  organization: invitation.organization,
  request: invitation.request,
  accept: invitation.accept,
  reject: invitation.reject
  // not all of the fields in invitation are write-available, and
  // including them in the request would result in a 400 response.
});

export const fetchInvitation = (actions: AppActions, id: string) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/invitations/${id}`, GET)
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertInvitation(data)]))
    .catch(error => {
      console.error('API Error fetchInvitation', error, error.code);
    });

export const fetchInvitationsForUser = (actions: AppActions, uuid: string) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/users/${uuid}/invitations`,
    GET
  )
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertInvitations(data.results)]))
    .catch(error => {
      console.error('API Error fetchInvitationsForUser', error, error.code);
    });

export const ensureInvitationsForUser = (
  actions: AppActions,
  uuid: string,
  invitations: InvitationState
) => {
  if (!invitations.hydrated) {
    return fetchInvitationsForUser(actions, uuid);
  }
};

export const fetchInvitationsForOrganizations = (
  actions: AppActions,
  organizations: OrganizationState,
  invitations: InvitationState
) => {
  Object.values(organizations.organizations).map(
    (organization: Organization) => {
      cfetch(
        `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${organization.uuid}/invitations`,
        GET
      )
        .then(checkAuth(actions))
        .then(response => response.json())
        .then(data => Promise.all([actions.upsertInvitations(data.results)]))
        .catch(error => {
          console.error(
            'API Error fetchInvitationsForOrganizations',
            error,
            error.code
          );
        });
    }
  );
};

export const fetchInvitationsForOrganization = (
  actions: AppActions,
  uuid: string
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${uuid}/invitations`,
    GET
  )
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertInvitations(data.results)]))
    .catch(error => {
      console.error('API Error fetchInvitationsForUser', error, error.code);
    });

export const ensureInvitationsForOrganization = (
  actions: AppActions,
  uuid: string,
  invitations: InvitationState
) => {
  if (!invitations.hydrated) {
    return fetchInvitationsForOrganization(actions, uuid);
  }
};

export const updateInvitation = (
  invitation: Invitation,
  actions: AppActions
) => {
  let formData = new FormData();
  let packagedInvitation: any = serializeInvitation(invitation);
  for (let key of Object.keys(packagedInvitation)) {
    formData.append(key, packagedInvitation[key]);
  }
  return cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/invitations/${invitation.uuid}/`,
    PATCH(formData)
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        actions.upsertInvitation(status.body as Invitation);
        notify(
          `Successfully updated user ${invitation.user}'s invitation in organization ${invitation.organization}.`,
          'success'
        );
      })
    );
};

export const acceptInvitation = (
  invitation: Invitation,
  actions: AppActions
) => {
  let formData = new FormData();
  let packagedInvitation: any = serializeInvitation(invitation);
  packagedInvitation.accept = true;
  packagedInvitation.reject = false;
  for (let key of Object.keys(packagedInvitation)) {
    formData.append(key, packagedInvitation[key]);
  }
  return cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/invitations/${invitation.uuid}/`,
    PATCH(formData)
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        actions.upsertInvitation(status.body as Invitation);
        notify(
          `Successfully accepted invitation to join organization ${invitation.organization.name}.`,
          'success'
        );
      })
    );
};

export const rejectInvitation = (
  invitation: Invitation,
  actions: AppActions
) => {
  let formData = new FormData();
  let packagedInvitation: any = serializeInvitation(invitation);
  packagedInvitation.accept = false;
  packagedInvitation.reject = true;
  for (let key of Object.keys(packagedInvitation)) {
    formData.append(key, packagedInvitation[key]);
  }
  return cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/invitations/${invitation.uuid}/`,
    PATCH(formData)
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        actions.upsertInvitation(status.body as Invitation);
        notify(
          `Successfully rejected invitation to join organization ${invitation.organization.name}.`,
          'success'
        );
      })
    );
};

export const createInvitation = (
  invitation: Invitation,
  actions: AppActions
) => {
  let formData = new FormData();
  let packagedInvitation: any = serializeInvitation(invitation);
  for (let key of Object.keys(packagedInvitation)) {
    formData.append(key, packagedInvitation[key]);
  }
  return (
    cfetch(
      `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${invitation.organization}/invitations/${invitation.user}`,
      PUT(formData)
    )
      .then(checkAuth(actions))
      // Cannot call upsert invitation here, because IDs are assigned on the server side
      .then(response =>
        validate(response, (status: ItemizedResponse) => {
          actions.upsertInvitation(status.body as Invitation);
          notify(
            `Successfully created invitation for user ${invitation.user} in organization ${invitation.organization}.`,
            'success'
          );
        })
      )
  );
};

export const deleteInvitation = (invitation: Invitation, actions: AppActions) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${invitation.organization}/invitations/${invitation.user}`,
    DELETE
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, () => {
        actions.deleteInvitation(invitation);
        notify(
          `Successfully deleted user ${invitation.user} from organization ${invitation.organization}.`,
          'success'
        );
      })
    );
