import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { Link } from 'react-router-dom';
import { Organization, OrganizationState } from '../store/organizations/types';
import { ensureOrganizationsForUser } from '../store/organizations/api';
import OrganizationCard from '../organization/OrganizationCard';
import { UsersState } from '../store/users/types';
import LoadingPlaceholder from '../common/LoadingPlaceholder';

interface ProfilePageProps {
  actions: AppActions;
  users: UsersState;
  organizations: OrganizationState;
}

export const ProfilePage: React.FC<ProfilePageProps> = (
  props: ProfilePageProps
) => {
  useEffect(() => {
    if (props.users.self !== null) {
      const uuid = props.users.self.uuid;
      ensureOrganizationsForUser(props.actions, uuid, props.organizations);
    }
  }, [props.actions, props.organizations, props.users, props.users.self]);

  if (props.users.self == null) {
    return <LoadingPlaceholder />;
  } else {
    let name = props.users.self!.name;
    let username = props.users.self!.username;
    let email = props.users.self!.email;
    let uuid = props.users.self!.uuid;
    let avatar = props.users.self!.avatar;

    return (
      <article className="media profile">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={avatar} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <h1 className="title is-size-1">Your Profile</h1>
            <table className="table">
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th>Username:</th>
                  <td>{username}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{email}</td>
                </tr>
                <tr>
                  <th>Password:</th>
                  <td>
                    <Link
                      to="/profile/change-password"
                      className="is-link is-outlined"
                    >
                      Change Password
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>

            <h1 className="title is-size-3">Your Memberships</h1>
            <div className="columns is-multiline">
              {Object.values(props.organizations.organizations).map(
                (organization: Organization) => (
                  <div className="column is-4">
                    <OrganizationCard organization={organization} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }
};
