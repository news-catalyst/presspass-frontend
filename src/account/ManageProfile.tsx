import React, { useState, SyntheticEvent } from 'react';
import { AppActions } from '../store';
import { updateSelfUser } from '../store/users/api';
import Field from '../common/Field';
import { UsersState } from '../store/users/types';
import LoadingPlaceholder from '../common/LoadingPlaceholder';

interface ManageProfilePageProps {
  actions: AppActions;
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
  let [name, setName] = useState(props.users.self!.name);
  let [username, setUsername] = useState(props.users.self!.username);
  let [saved, setSaved] = useState(false);

  function handleProfileUpdateSubmit(event: SyntheticEvent) {
    event.preventDefault();
    let user = {
      ...props.users.self!,
      name,
      username
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
      Your profile has been updated.
    </div>
  ) : null;

  // useEffect(() => {
  //   if (props.users.self) {
  //     setName(props.users.self.name);
  //   }
  // })

  return (
    <section>
      <h1 className="title is-size-1">Manage Profile</h1>
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
        <button className="button is-link" type="submit">
          Update profile
        </button>
      </form>
    </section>
  );
};
