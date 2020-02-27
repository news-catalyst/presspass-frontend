import { AppActions } from "..";
import {
  checkAuth,
  cfetch,
  validate,
  ItemizedResponse,
  notify,
  GET,
  PATCH,
  POST,
  DELETE
} from "../../utils";
import { Organization, OrganizationState } from "./types";

const serializeOrganization = (organization: Organization) => ({
  uuid: organization.uuid,
  name: organization.name || "",
  avatar: organization.avatar || "",
  slug: organization.slug,
  plan: organization.plan,
  max_users: organization.max_users,
  individual: organization.individual,
  private: organization.private,
  // Explicitly setting each field is necessary here, because
  // not all of the fields in organization are write-available, and
  // including them in the request would result in a 400 response.
});

export const fetchOrganizations = (actions: AppActions) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/organizations/`, GET)
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertOrganizations(data.results)]))
    .catch(error => {
      console.error("API Error fetchOrganizations", error, error.code);
    });

export const ensureOrganizations = (actions: AppActions, organizations: OrganizationState) => {
  if (!organizations.hydrated) {
    return fetchOrganizations(actions);
  }
};

export const updateOrganization = (organization: Organization, actions: AppActions) => {
  let formData = new FormData();
  let packagedOrganization: any = serializeOrganization(organization);
  for (let key of Object.keys(packagedOrganization)) {
    formData.append(key, packagedOrganization[key]);
  }
  return cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${organization.uuid}/`,
    PATCH(formData)
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        actions.upsertOrganization(status.body as Organization);
        notify(`Successfully updated ${organization.name}.`, "success");
      })
    );
};

export const createOrganization = (organization: Organization, actions: AppActions) => {
  let formData = new FormData();
  let packagedOrganization: any = serializeOrganization(organization);
  for (let key of Object.keys(packagedOrganization)) {
    formData.append(key, packagedOrganization[key]);
  }
  return (
    cfetch(
      `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/`,
      POST(formData)
    )
      .then(checkAuth(actions))
      // Cannot call upsert organization here, because IDs are assigned on the server side
      .then(response =>
        validate(response, (status: ItemizedResponse) => {
          actions.upsertOrganization(status.body as Organization);
          notify(`Successfully created ${organization.name}.`, "success");
        })
      )
  );
};

export const deleteOrganization = (organization: Organization, actions: AppActions) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${organization.uuid}`,
    DELETE
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, () => {
        actions.deleteOrganization(organization);
        notify(`Successfully deleted ${organization.name}.`, "success");
      })
    );
