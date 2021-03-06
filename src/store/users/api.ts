import { AppActions } from '..';
import {
  checkAuth,
  cfetch,
  validate,
  ItemizedResponse,
  notify,
  GET,
  PATCH
} from '../../utils';
import { User } from './types';

const serializeUser = (user: User) => ({
  name: user.name,
  username: user.username,
  use_autologin: user.use_autologin,
  uuid: user.uuid,
  avatar: user.avatar
});

export const fetchSelfUser = (actions: AppActions) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/users/me/`, GET)
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertSelfUser(data)]))
    .catch(error => {
      console.error('API Error fetchSelfUser', error, error.code);
    });

export const updateSelfUser = (user: User, actions: AppActions) => {
  let formData = new FormData();
  let packagedUser: any = serializeUser(user);
  for (let key of Object.keys(packagedUser)) {
    formData.append(key, packagedUser[key]);
  }
  return cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/users/me/`,
    PATCH(formData)
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        actions.upsertSelfUser(status.body as User);
        notify(`Successfully updated your profile.`, 'success');
      })
    );
};

export const fetchUser = (actions: AppActions, userid: number) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/users/${userid}/`, GET)
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertUser(data)]))
    .catch(error => {
      console.error('API Error fetchUser', error, error.code);
    });
