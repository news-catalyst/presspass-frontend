import React, { useState, SyntheticEvent } from "react";
import { AppActions } from "../store";
import { addEmail } from "../store/emails/api";
import Field from "../common/Field";
import { ArchieState } from "../store/archie/types";

interface AddEmailPageProps {
  actions: AppActions;
  archie: ArchieState;
}

export const AddEmail: React.FC<AddEmailPageProps> = (
  props: AddEmailPageProps
) => {
  let [errors, setErrors] = useState<any>({});
  let [email, setEmail] = useState("");
  let [saved, setSaved] = useState(false);

  function handleAddEmailSubmit(event: SyntheticEvent) {
    event.preventDefault();
    addEmail(
      props.actions,
      email
    ).then(status => {
      if (status.ok) {
        setSaved(true);
        setErrors({});
      } else {
        setErrors(status.body);
      }
    });
  }

  let savedConfirmation = saved ? (
    <div className="notification is-success limited-width">
      {props.archie.copy.add_email.success}
    </div>
  ) : null;

  return (
    <section className="section">
      <h1 className="title is-size-1">{props.archie.copy.add_email.title}</h1>
      <p>{props.archie.copy.add_email.description}</p>

      {savedConfirmation}
      <form className="limited-width" onSubmit={handleAddEmailSubmit}>
        <Field label="New Email Address" errors={errors.email}>
          <input
            type="email"
            className={errors.email ? "input is-danger" : "input"}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </Field>
        <button className="button is-link" type="submit">
          {props.archie.copy.buttons.add_email}
        </button>
      </form>
    </section>
  );
};
