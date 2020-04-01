import { AppActions } from '..';
import {
  checkAuth,
  cfetch,
  validate,
  ItemizedResponse,
  notify,
  GET,
  PATCH,
  JSON_POST,
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

export const fetchInvitation = (actions: AppActions, uuid: string) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/invitations/${uuid}?expand=organization`,
    GET
  )
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => {
      data.uuid = uuid; // necessary because the API lacks this ID in the response
      return data;
    })
    .then(data =>
      Promise.all([actions.upsertInvitation(data, data.organization.uuid)])
    )
    .catch(error => {
      console.error('API Error fetchInvitation', error, error.code);
    });

export const fetchInvitationsForUser = (actions: AppActions, uuid: string) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/users/${uuid}/invitations/?expand=organization`,
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
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${uuid}/invitations/?expand=user`,
    GET
  )
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertInvitations(data.results)]))
    .catch(error => {
      console.error(
        'API Error fetchInvitationsForOrganization',
        error,
        error.code
      );
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
        actions.upsertInvitation(
          status.body as Invitation,
          invitation.organization.uuid
        );
        notify(
          `Successfully updated user ${invitation.user}'s invitation in organization ${invitation.organization}.`,
          'success'
        );
      })
    );
};

export const acceptInvitation = (
  invitation: Invitation,
  actions: AppActions,
  invitationType: string
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
        actions.upsertInvitation(
          status.body as Invitation,
          invitation.organization.uuid
        );
        notify(
          `Successfully accepted invitation to join organization ${invitation.organization.name}.`,
          'success'
        );
      })
    );
};

export const rejectInvitation = (
  invitation: Invitation,
  actions: AppActions,
  invitationType: string
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
        actions.upsertInvitation(
          status.body as Invitation,
          invitation.organization.uuid
        );
        notify(
          `Successfully rejected invitation to join organization ${invitation.organization.name}.`,
          'success'
        );
      })
    );
};

export const createInvitation = (
  organization_id: string,
  email: string,
  actions: AppActions
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${organization_id}/invitations/`,
    JSON_POST({
      email: email
    })
  )
    .then(checkAuth(actions)) // Necessary
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        actions.upsertInvitation(status.body as Invitation, organization_id);
        notify('Successfully sent the invitation.', 'success');
      })
    );

export const requestInvitation = (
  organization_id: string,
  actions: AppActions
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${organization_id}/invitations/`,
    JSON_POST({
      request: true
    })
  )
    .then(checkAuth(actions)) // Necessary
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        // this is annoying: the invitation response data doesn't include the organization id :(
        // so i have to try to reconstruct it here
        actions.upsertInvitation(status.body as Invitation, organization_id);
        notify('Successfully requested an invite.', 'success');
      })
    );

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
