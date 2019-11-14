import React, { useEffect } from "react";
import { AppActions } from "../store";
import { Link } from "react-router-dom";
import { cfetch } from "../utils";

interface LogoutProps {
  actions: AppActions;
}

const LogoutPage: React.FC<LogoutProps> = (props: LogoutProps) => {
  useEffect(() => {
    cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/rest-auth/logout/`, {
      credentials: "include",
      method: "POST"
    }).then(() => {
      props.actions.logout();
    });
  }, [props.actions]);
  return (
    <div>
      <div className="notification limited-width">
        You have been logged out from PressPass. To log back in,&nbsp;
        <Link to="/login">click here</Link>.
      </div>
    </div>
  );
};

export default LogoutPage;