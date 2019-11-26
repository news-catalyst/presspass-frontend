import React, { useState, SyntheticEvent } from "react";
import { AppActions } from "../store";
import { registerAccount } from "../store/auth/api";
import Field from "../common/Field";
import { Link } from "react-router-dom";

interface AccountEditPageProps {
  actions: AppActions;
}

const RegisterPage: React.FC<AccountEditPageProps> = (
  props: AccountEditPageProps
) => {
  let [errors, setErrors] = useState<any>({});
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setPasswordConfirm] = useState("");
  let [saved, setSaved] = useState(false);

  function handleFormSubmit(event: SyntheticEvent) {
    event.preventDefault();
    registerAccount(
      props.actions,
      username,
      email,
      password,
      passwordConfirm
    ).then(status => {
      if (status.ok) {
        setSaved(true);
        setErrors({});
      } else {
        setErrors(status.body);
      }
    });
  }

  if (saved) {
    return (
      <div className="notification is-success">
        <strong>Welcome!</strong> Thank you for signing up for PressPass. You will receive an email confirmation
        email shortly. In the meantime, you can continue to the <Link to="/">homepage</Link>.
      </div>
    )
  }

  return (
    <section>
      <h1 className="title is-size-1">Register</h1>
      <form className="limited-width" onSubmit={handleFormSubmit}>
        <Field label="Username" errors={errors.username}>
          <input
            type="text"
            className={errors.username ? "input is-danger" : "input"}
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </Field>
        <Field label="Email" errors={errors.email}>
          <input
            type="email"
            className={errors.email ? "input is-danger" : "input"}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </Field>
        <Field label="New Password" errors={errors.password1}>
          <input
            type="password"
            className={errors.password1 ? "input is-danger" : "input"}
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Field>
        <Field label="Confirm New Password" errors={errors.password2}>
          <input
            type="password"
            className={errors.password2 ? "input is-danger" : "input"}
            value={passwordConfirm}
            onChange={event => setPasswordConfirm(event.target.value)}
          />
        </Field>
        <button className="button is-primary" type="submit">
          Register
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
