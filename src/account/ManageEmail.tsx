import React, { useState, useEffect, SyntheticEvent } from "react";
import { AppActions } from "../store";
import { addEmail, ensureEmails } from "../store/emails/api";
import Field from "../common/Field";
import { ArchieState } from "../store/archie/types";
import { Email, EmailState } from "../store/emails/types";
import EmailCard from "./EmailCard";

interface ManageEmailPageProps {
  actions: AppActions;
  archie: ArchieState;
  emails: EmailState;
}

export const ManageEmail: React.FC<ManageEmailPageProps> = (
  props: ManageEmailPageProps
) => {
  let [errors, setErrors] = useState<any>({});
  let [email, setEmail] = useState("");
  let [saved, setSaved] = useState(false);
  let [items, setItems] = useState(props.emails.emails);

  useEffect(() => {
    async function fetchData() {
      await ensureEmails(props.actions, props.emails);
      if (props.emails.hydrated) {
        setItems(props.emails.emails);
      }
    }
    fetchData();
  }, [props.actions, props.emails]);

  function handleAddEmailSubmit(event: SyntheticEvent) {
    event.preventDefault();
    let emailObj: Email = {
      email: email,
      verified: false,
      primary: false
    }
    addEmail(
      props.actions,
      emailObj,
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
    <>
      <h1 className="title is-size-1">{props.archie.copy.manage_email.title}</h1>
      <p>{props.archie.copy.manage_email.description}</p>
      <div className="add-email-form has-padding-top-50 has-padding-bottom-50">
      {savedConfirmation}
        <h4 className="title is-size-4">Add an email address</h4>
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
      </div>
      <h4 className="title is-size-4">Active emails</h4>
      <div className="columns is-multiline">
        {items.map(item => (
          <div className="column is-4" key={item.email}>
            <EmailCard email={item} {...props} />
          </div>
        ))}
      </div>
    </>
  );
};
