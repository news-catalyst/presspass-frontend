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
    <div
      onClick={handleEmailPrimarySubmit}
      className="card-footer-item"
    >
      Make primary
    </div>
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
    )
  }


  let email = props.email;
  return (
    <div className="email-card card">
      <header className="card-header">
        <p className="card-header-title">{email.email}</p>
      </header>
      <div className="card-content">
        <div className="content">
          <p>Verified: {email.verified ? 'yes' : 'no'}</p>
          <p>Primary: {email.primary ? 'yes' : 'no'}</p>
        </div>
      </div>
      <footer className="card-footer">
        <MakeEmailPrimaryButton actions={props.actions} email={email} />
        <div
          onClick={handleRemoveEmailSubmit}
          className="card-footer-item"
        >
           Remove
        </div>
      </footer>
    </div>
  );
};

export default EmailCard;
