import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

// Inspired by--but heavily adapted from--https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-router-using-typescript-and-react-router-4
export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    loginPath: string;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
    if (!props.isAuthenticated) {
        return (
            <Route>
                <Redirect to={props.loginPath} />
            </Route>
        )
    } else {
        return <Route {...props} />;
    }
}