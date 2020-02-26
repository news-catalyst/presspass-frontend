import React from 'react';
import { AppProps } from '../store';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { Link } from "react-router-dom";

export const ProfilePage: React.FC<AppProps> = (props: AppProps) => {
    if (props.users.self == null) {
        return (<LoadingPlaceholder/>);
    }
    return (
        <article className="media profile">
            <figure className="media-left">
                <p className="image is-64x64">
                    <img src={props.users.self.avatar}/>
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <h1 className="title is-size-1">Your Profile</h1>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Name:</th>
                                <td>{props.users.self.name}</td>
                            </tr>
                            <tr>
                                <th>Username:</th>
                                <td>{props.users.self.username}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{props.users.self.email}</td>
                            </tr>
                            <tr>
                                <th>Password:</th>
                                <td>
                                    <Link to="/profile/change-password" className="is-link is-outlined">
                                        Change Password
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/clients" className="button is-link is-outlined">
                        Manage Clients
                    </Link>
                </div>
            </div>
        </article>
    )
}
