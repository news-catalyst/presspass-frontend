import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { Link } from 'react-router-dom';
import { Membership, MembershipState } from '../store/memberships/types';
import { ensureMembershipsForUser } from '../store/memberships/api';
import MembershipCard from '../membership/MembershipCard';
import { UsersState } from '../store/users/types';
import LoadingPlaceholder from '../common/LoadingPlaceholder';

interface ProfilePageProps {
  actions: AppActions;
  users: UsersState;
  memberships: MembershipState;
}

export const ProfilePage: React.FC<ProfilePageProps> = (
  props: ProfilePageProps
) => {
  // load user's memberships list
  useEffect(() => {
    if (props.users.self !== null) {
      const uuid = props.users.self.uuid;
      ensureMembershipsForUser(props.actions, uuid, props.memberships);
    }
  }, [props.actions, props.memberships, props.users, props.users.self]);

  if (props.users.self == null) {
    return <LoadingPlaceholder />;
  } else {
    let name = props.users.self!.name;
    let username = props.users.self!.username;
    let email = props.users.self!.email;
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
              {Object.values(props.memberships.memberships).map(
                (membership: Membership) => (
                  <div className="column is-4">
                    <MembershipCard
                      key={membership.organization.uuid}
                      membership={membership}
                      actions={props.actions}
                    />
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
