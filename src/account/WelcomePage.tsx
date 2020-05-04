import React, { useEffect, useState, SyntheticEvent } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { AppActions } from '../store';
import Field from '../common/Field';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { UsersState } from '../store/users/types';
import { ArchieState } from "../store/archie/types";
import { Email } from "../store/emails/types";
import { verifyEmail } from '../store/emails/api';
import { updateSelfUser } from '../store/users/api';

interface WelcomePageProps {
  actions: AppActions;
  archie: ArchieState;
  users: UsersState;
  email_key: string;
}

export const WelcomePage: React.FC<WelcomePageProps> = (
  props: WelcomePageProps
) => {
  if (props.users.self == null) {
    return <LoadingPlaceholder />;
  } else {
    return <HydratedWelcomePage {...props} />;
  }
};

export const HydratedWelcomePage: React.FC<WelcomePageProps> = (
  props: WelcomePageProps
) => {
  let location = useLocation();
  useEffect(() => {
    verifyEmail(props.actions, props.email_key);
  }, [props.actions]);

  let [errors, setErrors] = useState<any>({});
  let [name, setName] = useState(props.users.self!.name);
  let [avatar, setAvatar] = useState<File | undefined>(undefined);
  let [saved, setSaved] = useState(false);

  function handleProfileUpdateSubmit(event: SyntheticEvent) {
    event.preventDefault();
    let user = {
      ...props.users.self!,
      name,
      avatar
    };
    updateSelfUser(user, props.actions).then(status => {
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
      <p>
        {props.archie.copy.manage_profile.success}
      </p>
      <p>
        <i>(text tk)</i> Great, now all you have to do is <Link to="/organizations">find an organization</Link> to join.
      </p>
    </div>
  ) : null;

  return (
    <section className="section">
      <h1 className="title is-size-1">{props.archie.copy.welcome.title}</h1>
      <p className="container">{props.archie.copy.welcome.description}</p>

      {savedConfirmation}

      <form className="limited-width" onSubmit={handleProfileUpdateSubmit}>
        <Field label="Display Name" errors={errors.name}>
          <input
            type="text"
            className={errors.name ? 'input is-danger' : 'input'}
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Field>

        <Field
          label="Avatar"
          errors={errors.avatar}
          help="If you do not upload a file, the current photo will be kept."
        >
          <input
            className={errors.avatar ? 'input is-danger' : 'input'}
            type="file"
            placeholder="Your photo..."
            onChange={event =>
              setAvatar(
                event.target.files === null ? undefined : event.target.files[0]
              )
            }
          />
        </Field>

        <button className="button is-link" type="submit">
          {props.archie.copy.buttons.setup_profile}
        </button>
      </form>
    </section>
  );
};

