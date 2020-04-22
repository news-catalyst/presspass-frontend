import React, { useState, SyntheticEvent } from 'react';
import { AppActions } from '../store';
import { ArchieState } from '../store/archie/types';
import { Email, EmailState } from '../store/emails/types';
import { deleteEmail, primaryEmail } from "../store/emails/api";

interface EmailCardProps {
  actions: AppActions;
  archie: ArchieState;
  email: Email;
  emails: EmailState
}

interface EmailButtonProps {
  actions: AppActions;
  email: Email;
}

const MakeEmailPrimaryButton: React.FC<EmailButtonProps> = (
  props: EmailButtonProps
) => {
  let [errors, setErrors] = useState<any>({});
  let [saved, setSaved] = useState(false);

  if (props.email.primary) {
    return null;
  }

  function handleEmailPrimarySubmit(event: SyntheticEvent) {
    event.preventDefault();
    primaryEmail(
      props.actions,
      props.email
    ).then(status => {
      if (status.ok) {
        setSaved(true);
        setErrors({});
      } else {
        setErrors(status.body);
      }
    });
  }
  return (
    <button
      type="submit"
      onClick={handleEmailPrimarySubmit}
      className="button is-primary"
    >
      Make primary
    </button>
  )

}

const EmailCard: React.FC<EmailCardProps> = (
  props: EmailCardProps
) => {
  let [errors, setErrors] = useState<any>({});
  let [saved, setSaved] = useState(false);

  function handleRemoveEmailSubmit(event: SyntheticEvent) {
    event.preventDefault();
    deleteEmail(
      props.actions,
      props.email
    ).then(status => {
      if (status.ok) {
        setSaved(true);
        setErrors({});
      } else {
        setErrors(status.body);
      }
    });
  }


  let email = props.email;
  return (
    <div className="box">
      <p>Email address: {email.email}</p>
      <p>Verified: {email.verified ? 'yes' : 'no'}</p>
      <p>Primary: {email.primary ? 'yes' : 'no'}</p>

      <MakeEmailPrimaryButton actions={props.actions} email={email} />

      <button
        type="submit"
        onClick={handleRemoveEmailSubmit}
        className="button is-danger"
      >
         Remove
      </button>
    </div>
  );
};

export default EmailCard;
