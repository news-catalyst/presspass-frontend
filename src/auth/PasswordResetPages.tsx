import React, { useState, SyntheticEvent } from "react";
import { Field } from "../common/field";
import { requestPasswordReset, submitPasswordReset } from "../store/auth/api";
import { AppActions } from "../store";

interface PasswordResetProps {
  actions: AppActions;
}

export const PasswordResetPage: React.FC<PasswordResetProps> = props => {
  let [errors, setErrors] = useState({} as any);
  let [requested, setRequested] = useState(false);
  let [email, setEmail] = useState("");

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    requestPasswordReset(props.actions, email).then(status => {
      if (status.ok) {
        setRequested(true);
      } else {
        setErrors(status.body);
      }
    });
  }

  if (requested) {
    return (
      <div className="notification width-limited is-success">
        <strong>Password reset requested.</strong> You have successfully
        requested a password reset. Check your email for the link.
      </div>
    );
  } else {
    return (
      <section>
        <h1 className="title is-size-1">Reset Password</h1>
        <form onSubmit={handleSubmit} className="limited-width">
          <Field errors={errors.email} label="Email">
            <input
              className={errors.email ? "input is-danger" : "input"}
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Field>
          <button className="button is-primary" type="submit">
            Reset
          </button>
        </form>
      </section>
    );
  }
};

interface PasswordResetSubmitProps {
  actions: AppActions;
  uid: string;
  token: string;
}

export const PasswordResetSubmitPage: React.FC<PasswordResetSubmitProps> = props => {
  let [errors, setErrors] = useState({} as any);
  let [saved, setSaved] = useState(false);
  let [newPassword, setNewPassword] = useState("");
  let [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    submitPasswordReset(
      props.actions,
      props.uid,
      props.token,
      newPassword,
      newPasswordConfirm
    ).then(status => {
      if (status.ok) {
        setSaved(true);
      } else {
        setErrors(status.body);
      }
    });
  }

  if (saved) {
    return (
      <div className="notification limited-width is-success">
        <strong>Password changed.</strong> You have successfully reset your
        password. You can now log in with your new password.
      </div>
    );
  } else {
    return (
      <section>
        <h1 className="title is-size-1">Reset Password</h1>
        <form onSubmit={handleSubmit} className="limited-width">
          {errors.non_field_errors ? (
            <div className="notification is-danger">
              {errors.non_field_errors}
            </div>
          ) : null}
          <Field errors={errors.new_password1} label="New Password">
            <input
              className={errors.new_password1 ? "input is-danger" : "input"}
              type="password"
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
            />
          </Field>
          <Field errors={errors.new_password2} label="Confirm New Password">
            <input
              className={errors.new_password2 ? "input is-danger" : "input"}
              type="password"
              value={newPasswordConfirm}
              onChange={event => setNewPasswordConfirm(event.target.value)}
            />
          </Field>
          <button className="button is-primary" type="submit">
            Reset
          </button>
        </form>
      </section>
    );
  }
};
