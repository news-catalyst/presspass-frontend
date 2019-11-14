import React, { useState, SyntheticEvent } from "react";
import { AppActions } from "../store";
import { registerAccount } from "../store/auth/api";
import Field from "../common/Field";

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
        // tell them to check for confirmation email
      } else {
        setErrors(status.body);
      }
    });
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
        <Field label="New Password" errors={errors.new_password1}>
          <input
            type="password"
            className={errors.password1 ? "input is-danger" : "input"}
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Field>
        <Field label="Confirm New Password" errors={errors.new_password2}>
          <input
            type="password"
            className={errors.password2 ? "input is-danger" : "input"}
            value={passwordConfirm}
            onChange={event => setPasswordConfirm(event.target.value)}
          />
        </Field>
        <button className="button is-link" type="submit">
          Register
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;