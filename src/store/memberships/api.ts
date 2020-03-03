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
import { Membership, MembershipState } from './types';
import { OrganizationState, Organization } from '../organizations/types';

const serializeMembership = (membership: Membership) => ({
  user: membership.user,
  organization: membership.organization,
  admin: membership.admin
  // Explicitly setting each field is necessary here, because
  // not all of the fields in membership are write-available, and
  // including them in the request would result in a 400 response.
});

export const fetchMembershipsForUser = (actions: AppActions, uuid: string) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/users/${uuid}/memberships`,
    GET
  )
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertMemberships(data.results)]))
    .catch(error => {
      console.error('API Error fetchMembershipsForUser', error, error.code);
    });

export const ensureMembershipsForUser = (
  actions: AppActions,
  uuid: string,
  memberships: MembershipState
) => {
  if (!memberships.hydrated) {
    return fetchMembershipsForUser(actions, uuid);
  }
};

export const fetchMembershipsForOrganizations = (
  actions: AppActions,
  organizations: OrganizationState,
  memberships: MembershipState
) => {
  Object.values(organizations.organizations).map(
    (organization: Organization) => {
      cfetch(
        `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${organization.uuid}/memberships`,
        GET
      )
        .then(checkAuth(actions))
        .then(response => response.json())
        .then(data => Promise.all([actions.upsertMemberships(data.results)]))
        .catch(error => {
          console.error(
            'API Error fetchMembershipsForOrganizations',
            error,
            error.code
          );
        });
    }
  );
};

export const fetchMembershipsForOrganization = (
  actions: AppActions,
  uuid: string
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${uuid}/memberships`,
    GET
  )
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertMemberships(data.results)]))
    .catch(error => {
      console.error('API Error fetchMembershipsForUser', error, error.code);
    });

export const ensureMembershipsForOrganization = (
  actions: AppActions,
  uuid: string,
  memberships: MembershipState
) => {
  if (!memberships.hydrated) {
    return fetchMembershipsForOrganization(actions, uuid);
  }
};

export const updateMembership = (
  membership: Membership,
  actions: AppActions
) => {
  let formData = new FormData();
  let packagedMembership: any = serializeMembership(membership);
  for (let key of Object.keys(packagedMembership)) {
    formData.append(key, packagedMembership[key]);
  }
  return cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${membership.organization}/memberships/${membership.user}/`,
    PATCH(formData)
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        actions.upsertMembership(status.body as Membership);
        notify(
          `Successfully updated user ${membership.user}'s membership in organization ${membership.organization}.`,
          'success'
        );
      })
    );
};

export const createMembership = (
  membership: Membership,
  actions: AppActions
) => {
  let formData = new FormData();
  let packagedMembership: any = serializeMembership(membership);
  for (let key of Object.keys(packagedMembership)) {
    formData.append(key, packagedMembership[key]);
  }
  return (
    cfetch(
      `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${membership.organization}/memberships/${membership.user}`,
      PUT(formData)
    )
      .then(checkAuth(actions))
      // Cannot call upsert membership here, because IDs are assigned on the server side
      .then(response =>
        validate(response, (status: ItemizedResponse) => {
          actions.upsertMembership(status.body as Membership);
          notify(
            `Successfully created membership for user ${membership.user} in organization ${membership.organization}.`,
            'success'
          );
        })
      )
  );
};

export const deleteMembership = (membership: Membership, actions: AppActions) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${membership.organization}/memberships/${membership.user}`,
    DELETE
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, () => {
        actions.deleteMembership(membership);
        notify(
          `Successfully deleted user ${membership.user} from organization ${membership.organization}.`,
          'success'
        );
      })
    );
