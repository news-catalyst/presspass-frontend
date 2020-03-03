import { AppActions } from '../store/';
import cookie from 'js-cookie';
import { store as notifications } from 'react-notifications-component';

export function checkAuth(actions: AppActions) {
  return (response: Response): Response => {
    if (response.status === 403) {
      actions.logout();
      notify('Please log in to continue.', 'success');
      throw new Error('Not logged in');
    }
    return response;
  };
}

function updateOptions(options: RequestInit) {
  const update = { ...options };
  console.log(cookie.get('csrftoken'));
  if (cookie.get('csrftoken') !== undefined) {
    update.headers = {
      ...update.headers,
      'X-CSRFToken': cookie.get('csrftoken') || ''
    };
  }
  return update;
}

// Drop-in replacement for `fetch(...)` that adds a CSRF token
// from the CSRF cookie
export function cfetch(url: string, options: RequestInit) {
  return fetch(url, updateOptions(options)).catch(e => {
    notify(
      'Unable to connect to the internet. Check your connection and try again.',
      'danger'
    );
    throw e;
  });
}

export type ItemizedResponse = {
  ok: boolean;
  body: any;
};

export async function validate(
  response: Response,
  ok?: Function
): Promise<ItemizedResponse> {
  let itemizedResponse: ItemizedResponse = {
    ok: response.ok,
    body: response.status === 204 ? {} : await response.json() // 204 = ok, no content
  };
  if (response.ok) {
    if (ok !== undefined) {
      ok(itemizedResponse);
    }
  } else {
    notify('Please fix the errors to continue.', 'danger');
  }
  return itemizedResponse;
}

export function notify(message: string, type: string) {
  notifications.addNotification({
    message,
    type,
    container: 'bottom-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 2500
    }
  });
}

// For cfetch
const REQ_BASE: RequestInit = {
  credentials: 'include'
};
const JSON_REQ_BASE: RequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
};
export const GET = Object.assign({}, REQ_BASE, { method: 'GET' });
export const DELETE = Object.assign({}, REQ_BASE, { method: 'DELETE' });
export const POST = (body?: any): RequestInit => ({
  ...REQ_BASE,
  method: 'POST',
  body: body
});
export const PATCH = (body?: any): RequestInit => ({
  ...REQ_BASE,
  method: 'PATCH',
  body: body
});
export const PUT = (body?: any): RequestInit => ({
  ...REQ_BASE,
  method: 'PUT',
  body: body
});
export const JSON_POST = (body?: object): RequestInit => ({
  ...JSON_REQ_BASE,
  method: 'POST',
  body: JSON.stringify(body)
});
export const JSON_PATCH = (body?: object): RequestInit => ({
  ...JSON_REQ_BASE,
  method: 'PATCH',
  body: JSON.stringify(body)
});
