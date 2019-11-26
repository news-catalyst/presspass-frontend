import React from 'react';
import { AppProps } from '../store';
import LoadingPlaceholder from '../common/LoadingPlaceholder';

export const ProfilePage: React.FC<AppProps> = (props: AppProps) => {
    if (props.users.self == null) {
        return (<LoadingPlaceholder/>);
    }
    return (
        <div className="profile">
            <p>Name: {props.users.self.name}</p>
            <p>Username: {props.users.self.username}</p>
        </div>
    )
}
