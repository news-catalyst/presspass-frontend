import React, { useEffect } from 'react';
import { AppProps, AppActions } from '../store';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { Link } from 'react-router-dom';
import { Organization, OrganizationState } from '../store/organizations/types';
import { fetchOrganizationsForUser } from '../store/organizations/api';
import OrganizationCard from '../organization/OrganizationCard';
import { UsersState } from '../store/users/types';

interface ProfilePageProps {
  actions: AppActions;
  users: UsersState;
  organizations: OrganizationState;
}

export const ProfilePage: React.FC<ProfilePageProps> = (
  props: ProfilePageProps
) => {
  if (props.users.self == null) {
    return <LoadingPlaceholder />;
  } else {
    return <HydratedProfile {...props} />;
  }
};

export const HydratedProfile: React.FC<ProfilePageProps> = (
  props: ProfilePageProps
) => {
  let name = props.users.self!.name;
  let username = props.users.self!.username;
  let email = props.users.self!.email;
  let uuid = props.users.self!.uuid;
  let avatar = props.users.self!.avatar;

  useEffect(() => {
    fetchOrganizationsForUser(props.actions, uuid);
  }, [props.actions, props.organizations]);

  console.log(props.organizations);
  let membershipInfo = props.organizations.hydrated ? (
    <div className="memberships">
      <h1 className="title is-size-2">Memberships</h1>
      <div>
        TK TK Your organizations will be listed here once I figure out the
        syntax of things.
      </div>
    </div>
  ) : null;

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

          {membershipInfo}

          <Link to="/clients" className="button is-link is-outlined">
            Manage Clients
          </Link>
        </div>
      </div>
    </article>
  );
};
