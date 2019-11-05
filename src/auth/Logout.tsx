import React, { useEffect } from "react";
import { AppActions } from "../store";
import { Link } from "react-router-dom";

interface LogoutProps {
    actions: AppActions
}

export default (props: LogoutProps) => {
    useEffect(() => {
        props.actions.logout();
    }, [props.actions]);
    return (
        <div>
            <div className="notification limited-width">
                You have been logged out from PressPass. To log back in, <Link to="/login">click here</Link>.
            </div>
        </div>
    )
}