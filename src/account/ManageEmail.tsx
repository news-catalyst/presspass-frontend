import React, { useState, useEffect } from "react";
import { AppActions } from "../store";
import { primaryEmail, ensureEmails } from "../store/emails/api";
import Field from "../common/Field";
import { ArchieState } from "../store/archie/types";
import { EmailState } from "../store/emails/types";
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

  return (
    <section className="section">
      <h1 className="title is-size-1">{props.archie.copy.manage_email.title}</h1>
      <p>{props.archie.copy.manage_email.description}</p>

      <div className="columns is-multiline">
        {items.map(item => (
          <div className="column is-4" key={item.email}>
            <EmailCard key={item.email} email={item} {...props} />
          </div>
        ))}
      </div>
    </section>
  );
};
