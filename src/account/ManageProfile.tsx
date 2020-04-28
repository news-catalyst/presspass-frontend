import React, { useState, SyntheticEvent } from 'react';
import { AppActions } from '../store';
import Field from '../common/Field';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { UsersState } from '../store/users/types';
import { ArchieState } from "../store/archie/types";
import { updateSelfUser } from '../store/users/api';

interface ManageProfilePageProps {
  actions: AppActions;
  archie: ArchieState;
  users: UsersState;
}

export const ManageProfile: React.FC<ManageProfilePageProps> = (
  props: ManageProfilePageProps
) => {
  if (props.users.self == null) {
    return <LoadingPlaceholder />;
  } else {
    return <HydratedManageProfile {...props} />;
  }
};

export const HydratedManageProfile: React.FC<ManageProfilePageProps> = (
  props: ManageProfilePageProps
) => {
  let [errors, setErrors] = useState<any>({});
  let [saved, setSaved] = useState(false);
  let [name, setName] = useState(props.users.self!.name);
  let [email, setEmail] = useState(props.users.self!.email);
  let [username, setUsername] = useState(props.users.self!.username);
  let [avatar, setAvatar] = useState<File | undefined>(undefined);

  function handleProfileUpdateSubmit(event: SyntheticEvent) {
    event.preventDefault();
    let user = {
      ...props.users.self!,
      name,
      username,
      email,
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
      {props.archie.copy.manage_profile.success}
    </div>
  ) : null;

  // useEffect(() => {
  //   if (props.users.self) {
  //     setName(props.users.self.name);
  //   }
  // })

  return (
    <section className="section">
      <h1 className="title is-size-1">{props.archie.copy.manage_profile.title}</h1>
      <p className="container">{props.archie.copy.manage_profile.description}</p>
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
        <Field label="Username" errors={errors.username}>
          <input
            type="text"
            className={errors.username ? 'input is-danger' : 'input'}
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </Field>
        <Field label="Email" errors={errors.email}>
          <input
            type="text"
            className={errors.email ? 'input is-danger' : 'input'}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </Field>
        <Field
          label="Avatar"
          errors={errors.avatar}
          help="Please upload a square image less than 1 MB. If you do not upload a file, the current photo will be kept."
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
          {props.archie.copy.buttons.update_profile}
        </button>
      </form>
    </section>
  );
};
